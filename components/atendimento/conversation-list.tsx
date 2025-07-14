"use client"

import { useState } from "react"
import { Search, Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConversationItem } from "@/components/atendimento/conversation-item"

// Dados de exemplo
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    name: "João Silva",
    lastMessage: "Olá, estou com um problema no meu pedido",
    time: "10:30",
    unread: 3,
    status: "waiting",
    channel: "whatsapp",
    protocol: "WA-20230615-001",
    queue: "suporte",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    lastMessage: "Preciso de ajuda com o pagamento",
    time: "09:45",
    unread: 0,
    status: "active",
    channel: "facebook",
    protocol: "FB-20230615-002",
    queue: "financeiro",
  },
  {
    id: "3",
    name: "Carlos Mendes",
    lastMessage: "Quando meu produto será entregue?",
    time: "Ontem",
    unread: 1,
    status: "waiting",
    channel: "instagram",
    protocol: "IG-20230614-003",
    queue: "vendas",
  },
  {
    id: "4",
    name: "Ana Beatriz",
    lastMessage: "Obrigado pelo atendimento!",
    time: "Ontem",
    unread: 0,
    status: "closed",
    channel: "email",
    protocol: "EM-20230614-004",
    queue: "suporte",
  },
  {
    id: "5",
    name: "Roberto Alves",
    lastMessage: "Preciso cancelar minha assinatura",
    time: "12/06",
    unread: 0,
    status: "analysis",
    channel: "whatsapp",
    protocol: "WA-20230612-005",
    queue: "cancelamento",
  },
]

type ConversationListProps = {
  onSelectConversation: (id: string) => void
  selectedConversationId: string | null
}

export function ConversationList({ onSelectConversation, selectedConversationId }: ConversationListProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) => {
    if (activeTab !== "all" && activeTab === "active" && conv.status !== "active") return false
    if (activeTab !== "all" && activeTab === "waiting" && conv.status !== "waiting") return false
    if (activeTab !== "all" && activeTab === "analysis" && conv.status !== "analysis") return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return conv.name.toLowerCase().includes(query) || conv.protocol.toLowerCase().includes(query)
    }

    return true
  })

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border-b p-2">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active" className="relative">
              Atendendo
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="waiting" className="relative">
              Aguardando
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]">4</Badge>
            </TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
              />
            ))
          ) : (
            <div className="flex h-32 items-center justify-center text-center text-sm text-muted-foreground">
              Nenhuma conversa encontrada
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
