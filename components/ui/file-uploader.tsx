"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { File, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  className?: string
  maxFiles?: number
  maxSize?: number // em MB
  accept?: string
}

export function FileUploader({ className, maxFiles = 5, maxSize = 10, accept = "*" }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    if (files.length + fileList.length > maxFiles) {
      alert(`Você pode enviar no máximo ${maxFiles} arquivos.`)
      return
    }

    const newFiles: File[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]

      // Verificar tamanho do arquivo
      if (file.size > maxSize * 1024 * 1024) {
        alert(`O arquivo ${file.name} excede o tamanho máximo de ${maxSize}MB.`)
        continue
      }

      newFiles.push(file)
    }

    setFiles([...files, ...newFiles])
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
          isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/20",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input id="file-upload" type="file" multiple accept={accept} className="hidden" onChange={handleFileChange} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">Arraste e solte arquivos aqui ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground">
            Máximo de {maxFiles} arquivos, {maxSize}MB por arquivo
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
