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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/ui/file-uploader"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function CreateDocumentModal() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [documentType, setDocumentType] = useState<string>("")
  const [documentCategory, setDocumentCategory] = useState<string>("")
  const [documentStatus, setDocumentStatus] = useState<string>("Rascunho")
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para salvar o documento
    console.log("Documento criado")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo Documento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Documento</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para adicionar um novo documento ao sistema.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Documento</Label>
              <Input id="title" placeholder="Digite o título do documento" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-id">ID do Documento</Label>
              <Input id="document-id" placeholder="Ex: DOC-2023-001" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Tipo de Documento</Label>
              <Select value={documentType} onValueChange={setDocumentType} required>
                <SelectTrigger id="document-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="DOCX">DOCX</SelectItem>
                  <SelectItem value="XLSX">XLSX</SelectItem>
                  <SelectItem value="TXT">TXT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-category">Categoria</Label>
              <Select value={documentCategory} onValueChange={setDocumentCategory} required>
                <SelectTrigger id="document-category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Procedimento">Procedimento</SelectItem>
                  <SelectItem value="Política">Política</SelectItem>
                  <SelectItem value="Relatório">Relatório</SelectItem>
                  <SelectItem value="Formulário">Formulário</SelectItem>
                  <SelectItem value="Plano">Plano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document-date">Data do Documento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-expiry">Data de Expiração</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document-version">Versão</Label>
              <Input id="document-version" placeholder="Ex: 1.0" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-status">Status</Label>
              <Select value={documentStatus} onValueChange={setDocumentStatus} required>
                <SelectTrigger id="document-status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rascunho">Rascunho</SelectItem>
                  <SelectItem value="Em revisão">Em revisão</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Obsoleto">Obsoleto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-description">Descrição</Label>
            <Textarea id="document-description" placeholder="Descreva o documento" />
          </div>

          <div className="space-y-2">
            <Label>Arquivo</Label>
            <FileUploader
              value={files}
              onChange={setFiles}
              maxFiles={1}
              maxSize={10 * 1024 * 1024} // 10MB
              accept={{
                "application/pdf": [".pdf"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                "text/plain": [".txt"],
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible-sector">Setor Responsável</Label>
            <Select>
              <SelectTrigger id="responsible-sector">
                <SelectValue placeholder="Selecione o setor responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qualidade">Qualidade</SelectItem>
                <SelectItem value="producao">Produção</SelectItem>
                <SelectItem value="rh">Recursos Humanos</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="ti">TI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Documento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
