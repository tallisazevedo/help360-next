"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Clock, MessageSquare, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const ticketCategories = [
  {
    id: "analysis",
    label: "Em Análise",
    icon: AlertCircle,
    color: "text-blue-500",
    count: 5,
  },
  {
    id: "return",
    label: "Retornar Hoje",
    icon: RotateCcw,
    color: "text-amber-500",
    count: 3,
  },
  {
    id: "expiring",
    label: "Para Vencer",
    icon: Clock,
    color: "text-red-500",
    count: 2,
  },
]

const tickets = {
  analysis: [
    {
      id: "T-2023-001",
      client: "Empresa ABC",
      contact: "Lucas Moraes",
      subject: "Não conformidade no processo de produção",
      time: "2h atrás",
      priority: "Alta",
    },
    {
      id: "T-2023-002",
      client: "Empresa XYZ",
      contact: "Ana Silva",
      subject: "Dúvida sobre certificação ISO 9001",
      time: "3h atrás",
      priority: "Média",
    },
    {
      id: "T-2023-003",
      client: "Empresa DEF",
      contact: "Carlos Oliveira",
      subject: "Problema com relatório de qualidade",
      time: "5h atrás",
      priority: "Baixa",
    },
  ],
  return: [
    {
      id: "T-2023-004",
      client: "Empresa GHI",
      contact: "Mariana Santos",
      subject: "Acompanhamento de ação corretiva",
      time: "Ontem, 15:30",
      priority: "Alta",
    },
    {
      id: "T-2023-005",
      client: "Empresa JKL",
      contact: "Roberto Alves",
      subject: "Verificação de implementação de melhoria",
      time: "Ontem, 16:45",
      priority: "Média",
    },
  ],
  expiring: [
    {
      id: "T-2023-006",
      client: "Empresa MNO",
      contact: "Juliana Costa",
      subject: "Prazo para correção de não conformidade",
      time: "Vence em 3h",
      priority: "Alta",
    },
    {
      id: "T-2023-007",
      client: "Empresa PQR",
      contact: "Fernando Lima",
      subject: "Atualização de documentação obrigatória",
      time: "Vence em 5h",
      priority: "Alta",
    },
  ],
}

export function TicketStatus() {
  const [activeTab, setActiveTab] = useState("analysis")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "Média":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Baixa":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="analysis" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {ticketCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <div className="flex items-center gap-1">
                <category.icon className={cn("h-4 w-4", category.color)} />
                <span className="hidden sm:inline">{category.label}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {ticketCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-3 pt-3">
            {tickets[category.id as keyof typeof tickets].map((ticket) => (
              <div key={ticket.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="font-medium">{ticket.id}</span>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="text-sm">{ticket.subject}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{ticket.client}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{ticket.contact}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{ticket.time}</div>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <Button variant="outline" className="w-full">
        <MessageSquare className="mr-2 h-4 w-4" />
        Ver todos os tickets
      </Button>
    </div>
  )
}
