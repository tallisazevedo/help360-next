"use client"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Facebook, Instagram, Mail, Phone, MessageCircle } from "lucide-react"

type Conversation = {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  status: "active" | "waiting" | "analysis" | "closed"
  channel: "whatsapp" | "facebook" | "instagram" | "email" | "phone"
  protocol: string
  queue: string
}

type ConversationItemProps = {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const { name, lastMessage, time, unread, status, channel, protocol, queue } = conversation

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

  // Função para determinar o ícone do canal
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-500" />
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "email":
        return <Mail className="h-4 w-4 text-orange-500" />
      case "phone":
        return <Phone className="h-4 w-4 text-gray-500" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  // Função para determinar o status da conversa
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Atendendo
          </Badge>
        )
      case "waiting":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Aguardando
          </Badge>
        )
      case "analysis":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Em Análise
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            Fechado
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`mb-1 cursor-pointer rounded-md p-2 transition-colors ${
        isSelected ? "bg-accent" : "hover:bg-accent/50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${getQueueColor(queue)}`} />
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 font-medium">
              {name}
              {getChannelIcon(channel)}
            </div>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <p className="truncate text-xs text-muted-foreground">{lastMessage}</p>
            {unread > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 text-[10px]">
                {unread}
              </Badge>
            )}
          </div>

          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{protocol}</span>
            {getStatusBadge(status)}
          </div>
        </div>
      </div>
    </div>
  )
}
