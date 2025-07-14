"use client"

import { useState } from "react"
import { AlertTriangle, Calendar, CheckCircle, FileText, MessageSquare, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Exemplo de atividades para o caso descrito
const activitiesExample = [
  {
    id: "act-1",
    type: "message",
    title: "Contato inicial via WhatsApp",
    description: "Lucas Moraes iniciou uma conversa para relatar uma não conformidade no processo de produção",
    time: "15/05/2023 10:30",
    user: {
      name: "Lucas Moraes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Cliente",
      company: "Empresa ABC",
    },
    module: "Comunicação",
    icon: MessageSquare,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: "act-2",
    type: "message",
    title: "Atendimento inicial",
    description: "Douglas Lopes respondeu ao contato e coletou informações sobre a não conformidade",
    time: "15/05/2023 10:35",
    user: {
      name: "Douglas Lopes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Atendente",
      company: "Help360",
    },
    module: "Comunicação",
    icon: MessageSquare,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: "act-3",
    type: "document",
    title: "Recebimento de evidências",
    description: "Lucas Moraes enviou fotos e documentos relacionados à não conformidade",
    time: "15/05/2023 10:42",
    user: {
      name: "Lucas Moraes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Cliente",
      company: "Empresa ABC",
    },
    module: "Comunicação",
    icon: FileText,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: "act-4",
    type: "system",
    title: "Registro de não conformidade",
    description: "Douglas Lopes registrou a não conformidade NC-2023-042 no sistema",
    time: "15/05/2023 11:15",
    user: {
      name: "Douglas Lopes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Atendente",
      company: "Help360",
    },
    module: "Não Conformidades",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
  },
  {
    id: "act-5",
    type: "system",
    title: "Início de ação corretiva",
    description: "Janaina Pereira iniciou o processo de ação corretiva AC-2023-038",
    time: "15/05/2023 14:20",
    user: {
      name: "Janaina Pereira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Analista de Qualidade",
      company: "Help360",
    },
    module: "Ações Corretivas",
    icon: CheckCircle,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: "act-6",
    type: "document",
    title: "Geração de documento",
    description: "Janaina Pereira gerou um documento para análise de causa raiz",
    time: "15/05/2023 14:35",
    user: {
      name: "Janaina Pereira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Analista de Qualidade",
      company: "Help360",
    },
    module: "Documentação",
    icon: FileText,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: "act-7",
    type: "message",
    title: "Comunicação com cliente",
    description: "Janaina Pereira informou o cliente sobre as ações iniciais tomadas",
    time: "15/05/2023 15:10",
    user: {
      name: "Janaina Pereira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Analista de Qualidade",
      company: "Help360",
    },
    module: "Comunicação",
    icon: MessageSquare,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: "act-8",
    type: "system",
    title: "Criação de demanda de melhoria",
    description: "Tiago Mendes criou a demanda de melhoria DM-2023-015",
    time: "16/05/2023 09:45",
    user: {
      name: "Tiago Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Gerente de Qualidade",
      company: "Help360",
    },
    module: "Melhorias",
    icon: Calendar,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
]

export function SGIActivityTimeline() {
  const [activities, setActivities] = useState(activitiesExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleFilter, setModuleFilter] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesModule = moduleFilter === "all" || activity.module === moduleFilter

    return matchesSearch && matchesModule
  })

  const modules = ["Comunicação", "Não Conformidades", "Ações Corretivas", "Documentação", "Melhorias"]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atividades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por módulo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os módulos</SelectItem>
            {modules.map((module) => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <Card>
            <CardContent className="flex h-24 items-center justify-center p-6 text-center text-muted-foreground">
              Nenhuma atividade encontrada com os filtros atuais
            </CardContent>
          </Card>
        ) : (
          filteredActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start gap-4 p-4">
                  <div
                    className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", activity.iconBg)}
                  >
                    <activity.icon className={cn("h-5 w-5", activity.iconColor)} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm">{activity.description}</div>
                      </div>
                      <Badge variant="outline" className="ml-2 shrink-0">
                        {activity.module}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t bg-muted/50 px-4 py-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>
                      {activity.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{activity.user.role}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{activity.user.company}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Carregar mais atividades</Button>
      </div>
    </div>
  )
}
