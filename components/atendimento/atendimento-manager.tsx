"use client"

import { useState } from "react"
import { Search, Filter, Plus, MoreVertical, MessageCircle, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados de exemplo
const MOCK_TICKETS = [
  {
    id: "1",
    customer: {
      name: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "WA-20230615-001",
    channel: "whatsapp",
    queue: "suporte",
    status: "active",
    agent: {
      name: "Carlos Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastUpdate: "10 minutos atrás",
    waitingTime: "5 minutos",
  },
  {
    id: "2",
    customer: {
      name: "Maria Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "FB-20230615-002",
    channel: "facebook",
    queue: "financeiro",
    status: "waiting",
    agent: null,
    lastUpdate: "15 minutos atrás",
    waitingTime: "15 minutos",
  },
  {
    id: "3",
    customer: {
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "IG-20230614-003",
    channel: "instagram",
    queue: "vendas",
    status: "analysis",
    agent: {
      name: "Ana Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastUpdate: "1 hora atrás",
    waitingTime: "30 minutos",
  },
  {
    id: "4",
    customer: {
      name: "Ana Beatriz",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "EM-20230614-004",
    channel: "email",
    queue: "suporte",
    status: "closed",
    agent: {
      name: "Pedro Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastUpdate: "3 horas atrás",
    waitingTime: "10 minutos",
  },
  {
    id: "5",
    customer: {
      name: "Roberto Alves",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "WA-20230612-005",
    channel: "whatsapp",
    queue: "cancelamento",
    status: "waiting",
    agent: null,
    lastUpdate: "20 minutos atrás",
    waitingTime: "20 minutos",
  },
  {
    id: "6",
    customer: {
      name: "Fernanda Lima",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "WA-20230612-006",
    channel: "whatsapp",
    queue: "suporte",
    status: "active",
    agent: {
      name: "Carlos Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastUpdate: "5 minutos atrás",
    waitingTime: "2 minutos",
  },
]

export function AtendimentoManager() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTickets = MOCK_TICKETS.filter((ticket) => {
    if (activeTab !== "all") {
      if (activeTab === "active" && ticket.status !== "active") return false
      if (activeTab === "waiting" && ticket.status !== "waiting") return false
      if (activeTab === "analysis" && ticket.status !== "analysis") return false
      if (activeTab === "closed" && ticket.status !== "closed") return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return ticket.customer.name.toLowerCase().includes(query) || ticket.protocol.toLowerCase().includes(query)
    }

    return true
  })

  // Função para determinar a cor da fila
  const getQueueColor = (queue: string) => {
    switch (queue) {
      case "suporte":
        return "bg-blue-500"
      case "financeiro":
        return "bg-green-500"
      case "vendas":
        return "bg-purple-500"
      case "cancelamento":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Função para determinar o ícone e cor do status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "active":
        return { icon: <MessageCircle className="h-4 w-4" />, label: "Atendendo", color: "text-green-500" }
      case "waiting":
        return { icon: <Clock className="h-4 w-4" />, label: "Aguardando", color: "text-yellow-500" }
      case "analysis":
        return { icon: <AlertCircle className="h-4 w-4" />, label: "Em Análise", color: "text-blue-500" }
      case "closed":
        return { icon: <CheckCircle className="h-4 w-4" />, label: "Fechado", color: "text-gray-500" }
      default:
        return { icon: <MessageCircle className="h-4 w-4" />, label: "Desconhecido", color: "text-gray-500" }
    }
  }

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gerenciador de Atendimentos</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Atendimento
          </Button>
          <Button variant="outline">Exportar Relatório</Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atendimentos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active" className="relative">
              Atendendo
              <Badge className="ml-1 h-5 rounded-full px-1.5 py-0 text-[10px]">
                {MOCK_TICKETS.filter((t) => t.status === "active").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="waiting" className="relative">
              Aguardando
              <Badge className="ml-1 h-5 rounded-full px-1.5 py-0 text-[10px]">
                {MOCK_TICKETS.filter((t) => t.status === "waiting").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="analysis">Em Análise</TabsTrigger>
            <TabsTrigger value="closed">Fechados</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-auto md:grid-cols-2 xl:grid-cols-3">
        {filteredTickets.map((ticket) => {
          const statusInfo = getStatusInfo(ticket.status)

          return (
            <Card key={ticket.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getQueueColor(ticket.queue)}`} />
                    <CardTitle className="text-base">{ticket.customer.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Assumir atendimento</DropdownMenuItem>
                      <DropdownMenuItem>Transferir</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Encerrar atendimento</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <span>{ticket.protocol}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 text-sm ${statusInfo.color}`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {ticket.queue}
                  </Badge>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span>Tempo de espera:</span>
                    <span className="ml-1 font-medium">{ticket.waitingTime}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>Última atualização:</span>
                    <span className="ml-1 font-medium">{ticket.lastUpdate}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                {ticket.agent ? (
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm text-muted-foreground">Atendente:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{ticket.agent.name}</span>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.agent.avatar} alt={ticket.agent.name} />
                        <AvatarFallback>{ticket.agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full">
                    Assumir atendimento
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
