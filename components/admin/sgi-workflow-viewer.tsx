"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, ChevronDown, ChevronRight, FileText, MessageSquare, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Exemplo de fluxo de trabalho para o caso descrito
const workflowExample = {
  id: "WF-2023-001",
  title: "Não conformidade - Empresa ABC",
  status: "Em andamento",
  startDate: "15/05/2023",
  stages: [
    {
      id: "stage-1",
      title: "Contato Inicial",
      status: "Concluído",
      responsible: "Douglas Lopes",
      date: "15/05/2023 10:30",
      description: "Lucas Moraes iniciou uma conversa via WhatsApp para relatar uma não conformidade",
      channel: "WhatsApp",
      icon: MessageSquare,
      iconColor: "text-green-500",
      expanded: true,
      activities: [
        {
          id: "act-1",
          type: "message",
          description: "Recebimento da mensagem inicial",
          time: "10:30",
          user: "Lucas Moraes",
        },
        {
          id: "act-2",
          type: "message",
          description: "Resposta inicial e coleta de informações",
          time: "10:35",
          user: "Douglas Lopes",
        },
        {
          id: "act-3",
          type: "document",
          description: "Recebimento de evidências da não conformidade",
          time: "10:42",
          user: "Lucas Moraes",
        },
      ],
    },
    {
      id: "stage-2",
      title: "Registro da Não Conformidade",
      status: "Concluído",
      responsible: "Douglas Lopes",
      date: "15/05/2023 11:15",
      description: "Registro formal da não conformidade no sistema",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      expanded: false,
      activities: [
        {
          id: "act-4",
          type: "system",
          description: "Criação do registro NC-2023-042",
          time: "11:15",
          user: "Douglas Lopes",
        },
        {
          id: "act-5",
          type: "document",
          description: "Anexo de evidências ao registro",
          time: "11:20",
          user: "Douglas Lopes",
        },
      ],
    },
    {
      id: "stage-3",
      title: "Início da Ação Corretiva",
      status: "Concluído",
      responsible: "Janaina Pereira",
      date: "15/05/2023 14:20",
      description: "Análise e início do processo de ação corretiva",
      icon: CheckCircle,
      iconColor: "text-blue-500",
      expanded: false,
      activities: [
        {
          id: "act-6",
          type: "system",
          description: "Criação da ação corretiva AC-2023-038",
          time: "14:20",
          user: "Janaina Pereira",
        },
        {
          id: "act-7",
          type: "document",
          description: "Geração de documento para análise de causa raiz",
          time: "14:35",
          user: "Janaina Pereira",
        },
        {
          id: "act-8",
          type: "message",
          description: "Comunicação com o cliente sobre as ações iniciais",
          time: "15:10",
          user: "Janaina Pereira",
        },
      ],
    },
    {
      id: "stage-4",
      title: "Processo de Melhoria",
      status: "Em andamento",
      responsible: "Tiago Mendes",
      date: "16/05/2023 09:45",
      description: "Implementação de melhorias para prevenir recorrência",
      icon: FileText,
      iconColor: "text-purple-500",
      expanded: false,
      activities: [
        {
          id: "act-9",
          type: "system",
          description: "Criação da demanda de melhoria DM-2023-015",
          time: "09:45",
          user: "Tiago Mendes",
        },
        {
          id: "act-10",
          type: "document",
          description: "Elaboração do plano de implementação",
          time: "10:30",
          user: "Tiago Mendes",
        },
      ],
    },
  ],
}

export function SGIWorkflowViewer() {
  const [workflow, setWorkflow] = useState(workflowExample)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleStageExpand = (stageId: string) => {
    setWorkflow({
      ...workflow,
      stages: workflow.stages.map((stage) => (stage.id === stageId ? { ...stage, expanded: !stage.expanded } : stage)),
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "document":
        return <FileText className="h-4 w-4 text-amber-500" />
      case "system":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium">Fluxo de Trabalho</div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold">{workflow.title}</div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {workflow.status}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Iniciado em {workflow.startDate} • ID: {workflow.id}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:w-1/3">
          <div className="text-sm font-medium">Filtrar</div>
          <div className="flex gap-2">
            <Input
              placeholder="Buscar no fluxo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Em andamento</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {workflow.stages.map((stage, index) => (
          <Card key={stage.id} className="overflow-hidden">
            <div
              className={cn(
                "flex cursor-pointer items-center gap-3 border-b p-4",
                stage.status === "Concluído" ? "bg-muted/50" : "bg-card",
              )}
              onClick={() => toggleStageExpand(stage.id)}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  stage.status === "Concluído" ? "bg-green-100" : "bg-blue-100",
                )}
              >
                <stage.icon className={cn("h-5 w-5", stage.iconColor)} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{stage.title}</div>
                  <Badge
                    variant="outline"
                    className={
                      stage.status === "Concluído" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {stage.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{stage.responsible}</span>
                  <span>•</span>
                  <span>{stage.date}</span>
                </div>
              </div>
              {stage.expanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            {stage.expanded && (
              <CardContent className="p-4">
                <div className="mb-3 text-sm">{stage.description}</div>
                <div className="space-y-3">
                  {stage.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{activity.description}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{activity.time}</span>
                          <span>•</span>
                          <span>{activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="outline">Exportar Relatório</Button>
      </div>
    </div>
  )
}
