"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Ticket {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  status: "atendendo" | "aguardando" | "analise" | "fechado"
  priority: "alta" | "media" | "baixa"
  channel: "chat" | "whatsapp" | "email"
}

const tickets: Ticket[] = [
  {
    id: "T-2023-001",
    name: "Carlos Santos",
    lastMessage: "Como faço para anexar múltiplas evidências em um único registro?",
    time: "10:33",
    unread: 1,
    status: "atendendo",
    priority: "media",
    channel: "chat",
  },
  {
    id: "T-2023-002",
    name: "Maria Oliveira",
    lastMessage: "Obrigado pela informação!",
    time: "09:45",
    unread: 0,
    status: "atendendo",
    priority: "baixa",
    channel: "chat",
  },
  {
    id: "T-2023-003",
    name: "João Silva",
    lastMessage: "Vou verificar e te retorno em breve.",
    time: "Ontem",
    unread: 0,
    status: "aguardando",
    priority: "alta",
    channel: "whatsapp",
  },
  {
    id: "T-2023-004",
    name: "Ana Pereira",
    lastMessage: "Precisamos agendar uma reunião para discutir o plano de ação.",
    time: "Ontem",
    unread: 2,
    status: "analise",
    priority: "alta",
    channel: "email",
  },
  {
    id: "T-2023-005",
    name: "Roberto Alves",
    lastMessage: "A não conformidade foi registrada com sucesso.",
    time: "Seg",
    unread: 0,
    status: "fechado",
    priority: "media",
    channel: "chat",
  },
  {
    id: "T-2023-006",
    name: "Juliana Costa",
    lastMessage: "Preciso de ajuda com o sistema de documentação.",
    time: "Hoje",
    unread: 3,
    status: "aguardando",
    priority: "media",
    channel: "whatsapp",
  },
  {
    id: "T-2023-007",
    name: "Pedro Mendes",
    lastMessage: "Quando será lançada a nova versão do sistema?",
    time: "Ontem",
    unread: 0,
    status: "fechado",
    priority: "baixa",
    channel: "email",
  },
  {
    id: "T-2023-008",
    name: "Fernanda Lima",
    lastMessage: "Estou com problemas para acessar o módulo de relatórios.",
    time: "Hoje",
    unread: 1,
    status: "analise",
    priority: "alta",
    channel: "chat",
  },
]

export function TicketList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("atendendo")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "todos" || ticket.status === activeTab

    return matchesSearch && matchesTab
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return "bg-green-500"
      case "email":
        return "bg-blue-500"
      default:
        return "bg-primary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-500"
      case "media":
        return "bg-amber-500"
      case "baixa":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar ticket..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="atendendo" onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList className="w-full h-10 grid grid-cols-5">
            <TabsTrigger value="todos" className="text-xs">
              Todos
            </TabsTrigger>
            <TabsTrigger value="atendendo" className="text-xs">
              Atendendo
            </TabsTrigger>
            <TabsTrigger value="aguardando" className="text-xs">
              Aguardando
            </TabsTrigger>
            <TabsTrigger value="analise" className="text-xs">
              Análise
            </TabsTrigger>
            <TabsTrigger value="fechado" className="text-xs">
              Fechados
            </TabsTrigger>
          </TabsList>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={ticket.avatar || `/placeholder.svg?height=40&width=40`} alt={ticket.name} />
                      <AvatarFallback>
                        {ticket.name.charAt(0)}
                        {ticket.name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getChannelIcon(ticket.channel)} border-2 border-background`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <p className="font-medium truncate">{ticket.name}</p>
                        <div className={`h-2 w-2 rounded-full ${getPriorityColor(ticket.priority)}`}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{ticket.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{ticket.id}</p>
                    <p className="text-xs text-muted-foreground truncate">{ticket.lastMessage}</p>
                  </div>
                  {ticket.unread > 0 && <Badge className="ml-auto">{ticket.unread}</Badge>}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <p>Nenhum ticket encontrado</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
