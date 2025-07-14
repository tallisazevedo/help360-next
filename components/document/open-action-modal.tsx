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
import { AlertTriangle } from "lucide-react"

interface OpenActionModalProps {
  documentId: string
  documentTitle: string
  isOpen: boolean
  onClose: () => void
}

export function OpenActionModal({ documentId, documentTitle, isOpen, onClose }: OpenActionModalProps) {
  const [actionType, setActionType] = useState<string>("")
  const [priority, setPriority] = useState<string>("Média")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para abrir uma ação
    console.log(`Ação aberta para o documento ${documentId}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Abrir Ação para Documento em Atraso
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para abrir uma ação para o documento em atraso.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Documento</Label>
            <Input value={`${documentId} - ${documentTitle}`} disabled />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="action-type">Tipo de Ação</Label>
              <Select value={actionType} onValueChange={setActionType} required>
                <SelectTrigger id="action-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corretiva">Ação Corretiva</SelectItem>
                  <SelectItem value="preventiva">Ação Preventiva</SelectItem>
                  <SelectItem value="melhoria">Melhoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={priority} onValueChange={setPriority} required>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Crítica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible">Responsável</Label>
            <Select required>
              <SelectTrigger id="responsible">
                <SelectValue placeholder="Selecione o responsável" />
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
            <Label htmlFor="sector">Setor Responsável</Label>
            <Select required>
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
            <Label htmlFor="description">Descrição da Ação</Label>
            <Textarea id="description" placeholder="Descreva a ação a ser tomada" required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Abrir Ação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
