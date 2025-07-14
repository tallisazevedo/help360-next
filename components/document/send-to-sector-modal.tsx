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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"

interface SendToSectorModalProps {
  documentId: string
  documentTitle: string
  isOpen: boolean
  onClose: () => void
}

export function SendToSectorModal({ documentId, documentTitle, isOpen, onClose }: SendToSectorModalProps) {
  const [sector, setSector] = useState<string>("")
  const [urgency, setUrgency] = useState<string>("Normal")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para enviar para o setor
    console.log(`Documento ${documentId} enviado para o setor ${sector}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Enviar Documento para Setor Responsável
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para enviar o documento para o setor responsável.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Documento</Label>
            <Input value={`${documentId} - ${documentTitle}`} disabled />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">Setor Responsável</Label>
              <Select value={sector} onValueChange={setSector} required>
                <SelectTrigger id="sector">
                  <SelectValue placeholder="Selecione o setor" />
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
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgência</Label>
              <Select value={urgency} onValueChange={setUrgency} required>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Selecione a urgência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contato no Setor</Label>
            <Select required>
              <SelectTrigger id="contact">
                <SelectValue placeholder="Selecione o contato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joao.silva">João Silva</SelectItem>
                <SelectItem value="maria.oliveira">Maria Oliveira</SelectItem>
                <SelectItem value="carlos.santos">Carlos Santos</SelectItem>
                <SelectItem value="ana.pereira">Ana Pereira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" placeholder="Adicione uma mensagem para o setor responsável" required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
