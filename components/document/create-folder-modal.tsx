"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Folder, Plus } from "lucide-react"

interface CreateFolderModalProps {
  currentPath?: string[]
}

export function CreateFolderModal({ currentPath = [] }: CreateFolderModalProps) {
  const [open, setOpen] = useState(false)
  const [folderName, setFolderName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para criar a pasta
    console.log("Pasta criada:", folderName, "em", currentPath)
    setOpen(false)
    setFolderName("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Pasta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Pasta</DialogTitle>
          <DialogDescription>
            Crie uma nova pasta em {currentPath.length > 0 ? currentPath.join(" / ") : "Todos os Documentos"}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Nome da Pasta</Label>
            <div className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-amber-500" />
              <Input
                id="folder-name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Digite o nome da pasta"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Pasta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
