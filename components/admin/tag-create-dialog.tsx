"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TagCreateDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova etiqueta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar nova etiqueta</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para criar uma nova etiqueta.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-tag-name" className="text-right">
              Nome
            </Label>
            <Input id="new-tag-name" placeholder="Nome da etiqueta" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-tag-color" className="text-right">
              Cor
            </Label>
            <div className="col-span-3 flex gap-2 items-center">
              <Input id="new-tag-color" type="color" defaultValue="#0074D9" className="w-12 h-8 p-1" />
              <Input defaultValue="#0074D9" className="flex-1" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-tag-category" className="text-right">
              Categoria
            </Label>
            <Select defaultValue="tickets">
              <SelectTrigger id="new-tag-category" className="col-span-3">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tickets">Tickets</SelectItem>
                <SelectItem value="documentos">Documentos</SelectItem>
                <SelectItem value="clientes">Clientes</SelectItem>
                <SelectItem value="produtos">Produtos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-tag-status" className="text-right">
              Status
            </Label>
            <Select defaultValue="active">
              <SelectTrigger id="new-tag-status" className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="inactive">Inativa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            Criar etiqueta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
