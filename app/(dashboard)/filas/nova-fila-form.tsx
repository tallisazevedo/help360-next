"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Dados de exemplo para agentes
const agentes = [
  { value: "1", label: "Ana Silva" },
  { value: "2", label: "Bruno Costa" },
  { value: "3", label: "Carla Oliveira" },
  { value: "4", label: "Daniel Santos" },
  { value: "5", label: "Eduarda Lima" },
  { value: "6", label: "Fernando Gomes" },
  { value: "7", label: "Gabriela Martins" },
  { value: "8", label: "Henrique Alves" },
]

interface NovaFilaFormProps {
  onSuccess: () => void
}

export function NovaFilaForm({ onSuccess }: NovaFilaFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAgentes, setSelectedAgentes] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    canal: "",
    ativo: true,
    tempoMaximoEspera: "10",
    tempoMaximoAtendimento: "30",
    mensagemBoasVindas: "Olá! Bem-vindo ao nosso atendimento. Como podemos ajudar?",
    mensagemEncerramento: "Obrigado por entrar em contato. Tenha um ótimo dia!",
    notificarAgentes: true,
    permitirTransferencia: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Fila criada com sucesso",
        description: `A fila "${formData.nome}" foi criada com sucesso.`,
      })
      onSuccess()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da fila</Label>
            <Input
              id="nome"
              name="nome"
              placeholder="Ex: Suporte Técnico"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="canal">Canal de atendimento</Label>
            <Select value={formData.canal} onValueChange={(value) => handleSelectChange("canal", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Chat">Chat no Site</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Telefone">Telefone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            name="descricao"
            placeholder="Descreva o propósito desta fila de atendimento"
            value={formData.descricao}
            onChange={handleChange}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Agentes designados</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {selectedAgentes.length > 0 ? `${selectedAgentes.length} agentes selecionados` : "Selecione os agentes"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Buscar agente..." />
                <CommandList>
                  <CommandEmpty>Nenhum agente encontrado.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {agentes.map((agente) => (
                      <CommandItem
                        key={agente.value}
                        value={agente.value}
                        onSelect={(currentValue) => {
                          setSelectedAgentes((prev) => {
                            if (prev.includes(currentValue)) {
                              return prev.filter((value) => value !== currentValue)
                            } else {
                              return [...prev, currentValue]
                            }
                          })
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedAgentes.includes(agente.value) ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {agente.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tempoMaximoEspera">Tempo máximo de espera (min)</Label>
            <Input
              id="tempoMaximoEspera"
              name="tempoMaximoEspera"
              type="number"
              min="1"
              value={formData.tempoMaximoEspera}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tempoMaximoAtendimento">Tempo máximo de atendimento (min)</Label>
            <Input
              id="tempoMaximoAtendimento"
              name="tempoMaximoAtendimento"
              type="number"
              min="1"
              value={formData.tempoMaximoAtendimento}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mensagemBoasVindas">Mensagem de boas-vindas</Label>
          <Textarea
            id="mensagemBoasVindas"
            name="mensagemBoasVindas"
            value={formData.mensagemBoasVindas}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mensagemEncerramento">Mensagem de encerramento</Label>
          <Textarea
            id="mensagemEncerramento"
            name="mensagemEncerramento"
            value={formData.mensagemEncerramento}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ativo">Ativar fila imediatamente</Label>
              <p className="text-sm text-muted-foreground">A fila estará disponível para receber atendimentos</p>
            </div>
            <Switch
              id="ativo"
              checked={formData.ativo}
              onCheckedChange={(checked) => handleSwitchChange("ativo", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notificarAgentes">Notificar agentes</Label>
              <p className="text-sm text-muted-foreground">
                Enviar notificação aos agentes quando houver novos atendimentos
              </p>
            </div>
            <Switch
              id="notificarAgentes"
              checked={formData.notificarAgentes}
              onCheckedChange={(checked) => handleSwitchChange("notificarAgentes", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="permitirTransferencia">Permitir transferência</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que agentes transfiram atendimentos para outras filas
              </p>
            </div>
            <Switch
              id="permitirTransferencia"
              checked={formData.permitirTransferencia}
              onCheckedChange={(checked) => handleSwitchChange("permitirTransferencia", checked)}
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            "Criar fila"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
