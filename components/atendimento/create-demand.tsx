"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Check, Loader2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type CreateDemandProps = {
  conversationId: string
  onSuccess: () => void
  onCancel: () => void
}

export function CreateDemand({ conversationId, onSuccess, onCancel }: CreateDemandProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [category, setCategory] = useState("")
  const [assignee, setAssignee] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dados de exemplo
  const categories = [
    { id: "1", name: "Suporte Técnico" },
    { id: "2", name: "Financeiro" },
    { id: "3", name: "Comercial" },
    { id: "4", name: "Logística" },
    { id: "5", name: "Qualidade" },
  ]

  const users = [
    { id: "1", name: "Carlos Silva", avatar: "/placeholder.svg?height=40&width=40", department: "Suporte" },
    { id: "2", name: "Ana Oliveira", avatar: "/placeholder.svg?height=40&width=40", department: "Financeiro" },
    { id: "3", name: "Pedro Santos", avatar: "/placeholder.svg?height=40&width=40", department: "Comercial" },
    { id: "4", name: "Mariana Costa", avatar: "/placeholder.svg?height=40&width=40", department: "Logística" },
    { id: "5", name: "João Pereira", avatar: "/placeholder.svg?height=40&width=40", department: "Qualidade" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess()
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Criar Demanda</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Digite um título para a demanda"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva detalhadamente a demanda"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <RadioGroup value={priority} onValueChange={setPriority} className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-sm font-normal">
                    Baixa
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="text-sm font-normal">
                    Média
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-sm font-normal">
                    Alta
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus locale={ptBR} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Responsável</Label>
            <Select value={assignee} onValueChange={setAssignee} required>
              <SelectTrigger id="assignee" className="w-full">
                <SelectValue placeholder="Atribuir a um responsável" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span>{user.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{user.department}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="notify" className="h-4 w-4" />
            <Label htmlFor="notify" className="text-sm font-normal">
              Notificar responsável por e-mail
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="link-conversation" className="h-4 w-4" defaultChecked />
            <Label htmlFor="link-conversation" className="text-sm font-normal">
              Vincular à conversa atual
            </Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || !title || !description || !category || !assignee}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Criar Demanda
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
