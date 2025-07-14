"use client"

import { useState } from "react"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Calendar,
  Tag,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Dados de exemplo
const MOCK_TICKET = {
  id: "1",
  customer: {
    name: "João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+55 11 98765-4321",
    email: "joao.silva@email.com",
  },
  protocol: "WA-20230615-001",
  channel: "whatsapp",
  queue: "suporte",
  status: "approved",
  agent: {
    name: "Carlos Atendente",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  createdAt: "15/06/2023 10:25",
  closedAt: "15/06/2023 10:45",
  resolution:
    "Cliente estava com problema no pedido #12345 que não havia sido entregue após 15 dias. Verifiquei o sistema e identifiquei um atraso na transportadora. Informei ao cliente a nova previsão de entrega e ofereci um cupom de desconto como cortesia pelo inconveniente.",
  supervisor: {
    name: "Maria Supervisora",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "Ótimo atendimento. Problema resolvido de forma eficiente e cliente satisfeito com a solução oferecida.",
  },
  messages: [
    {
      id: "m1",
      sender: "contact",
      content: "Olá, estou com um problema no meu pedido #12345. Não recebi ainda e já se passaram 15 dias.",
      timestamp: "10:25",
    },
    {
      id: "m2",
      sender: "agent",
      content:
        "Olá João, tudo bem? Vou verificar o status do seu pedido. Pode me informar o seu CPF para confirmar os dados?",
      timestamp: "10:28",
      agent: {
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m3",
      sender: "contact",
      content: "Claro, meu CPF é 123.456.789-00",
      timestamp: "10:30",
    },
    {
      id: "m4",
      sender: "agent",
      content: "Obrigado! Estou consultando o sistema...",
      timestamp: "10:32",
      agent: {
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m5",
      sender: "agent",
      content:
        "João, identifiquei que seu pedido está em trânsito. Houve um atraso na transportadora, mas a previsão atualizada é para entrega em 2 dias úteis. Vou monitorar e te manter informado.",
      timestamp: "10:35",
      agent: {
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m6",
      sender: "contact",
      content: "Entendi. Obrigado pela informação. Vou aguardar então.",
      timestamp: "10:37",
    },
    {
      id: "m7",
      sender: "agent",
      content:
        "Disponibilizei um cupom de desconto de 10% para sua próxima compra como cortesia pelo inconveniente. O código é DESCULPE10.",
      timestamp: "10:40",
      agent: {
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m8",
      sender: "contact",
      content: "Muito obrigado! Isso ajuda bastante.",
      timestamp: "10:42",
    },
  ],
  metadata: {
    satisfaction: "satisfied",
    category: "Problema com entrega",
    tags: ["atraso", "entrega", "cupom"],
    relatedTickets: ["WA-20230610-045"],
  },
}

type TicketDetailsProps = {
  id: string
}

export function TicketDetails({ id }: TicketDetailsProps) {
  const [activeTab, setActiveTab] = useState("conversation")
  const [feedbackComment, setFeedbackComment] = useState("")

  // Simular a busca do ticket com base no ID
  const ticket = MOCK_TICKET

  // Função para determinar o ícone e cor do status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "approved":
        return { icon: <CheckCircle className="h-4 w-4" />, label: "Aprovado", color: "text-green-500" }
      case "pending":
        return { icon: <Clock className="h-4 w-4" />, label: "Pendente", color: "text-yellow-500" }
      case "rejected":
        return { icon: <XCircle className="h-4 w-4" />, label: "Rejeitado", color: "text-red-500" }
      default:
        return { icon: <AlertCircle className="h-4 w-4" />, label: "Desconhecido", color: "text-gray-500" }
    }
  }

  const statusInfo = getStatusInfo(ticket.status)

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/atendimento/tickets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Detalhes do Ticket</h1>
        <Badge variant="outline" className="ml-2">
          {ticket.protocol}
        </Badge>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="conversation">Conversa</TabsTrigger>
                  <TabsTrigger value="resolution">Resolução</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <TabsContent value="conversation" className="m-0">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-4 p-4">
                    {ticket.messages.map((msg) => {
                      const isAgent = msg.sender === "agent"

                      return (
                        <div key={msg.id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
                          <div className={`flex max-w-[70%] gap-2 ${isAgent ? "flex-row-reverse" : "flex-row"}`}>
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={isAgent ? msg.agent?.avatar : ticket.customer.avatar}
                                alt={isAgent ? msg.agent?.name : ticket.customer.name}
                              />
                              <AvatarFallback>
                                {isAgent ? msg.agent?.name.charAt(0) : ticket.customer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  isAgent
                                    ? "rounded-br-none bg-primary text-primary-foreground"
                                    : "rounded-bl-none bg-muted"
                                }`}
                              >
                                {msg.content}
                              </div>
                              <div
                                className={`mt-1 flex text-xs text-muted-foreground ${
                                  isAgent ? "justify-end" : "justify-start"
                                }`}
                              >
                                {isAgent && msg.agent?.name && (
                                  <>
                                    <span>{msg.agent.name}</span>
                                    <span className="mx-1">•</span>
                                  </>
                                )}
                                <span>{msg.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="resolution" className="m-0">
                <div className="p-4">
                  <div className="mb-4 rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Resolução do Atendente</h3>
                    <p className="text-sm text-muted-foreground">{ticket.resolution}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.agent.avatar} alt={ticket.agent.name} />
                        <AvatarFallback>{ticket.agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.agent.name}</span>
                      <span>•</span>
                      <span>{ticket.closedAt}</span>
                    </div>
                  </div>

                  {ticket.supervisor && (
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Feedback do Supervisor</h3>
                      <p className="text-sm text-muted-foreground">{ticket.supervisor.comment}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.supervisor.avatar} alt={ticket.supervisor.name} />
                          <AvatarFallback>{ticket.supervisor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{ticket.supervisor.name}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Badge variant="outline" className={statusInfo.color}>
                          <div className="flex items-center gap-1">
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                  )}

                  {ticket.status === "pending" && (
                    <div className="mt-4">
                      <Label htmlFor="feedback">Seu feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Adicione seu comentário sobre a resolução..."
                        className="mt-2"
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                      />
                      <div className="mt-4 flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Rejeitar
                        </Button>
                        <Button className="flex-1">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Aprovar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Informações do Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-medium">
                  <User className="h-4 w-4" />
                  Cliente
                </h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                    <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{ticket.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{ticket.customer.phone}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4" />
                  Datas
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Criado em:</span>
                    <span>{ticket.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fechado em:</span>
                    <span>{ticket.closedAt}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-medium">
                  <MessageSquare className="h-4 w-4" />
                  Canal
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{ticket.channel}</Badge>
                  <Badge variant="secondary">{ticket.queue}</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-medium">
                  <Tag className="h-4 w-4" />
                  Categorização
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoria:</span>
                    <span>{ticket.metadata.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ticket.metadata.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-medium">
                  <FileText className="h-4 w-4" />
                  Tickets relacionados
                </h3>
                <div className="space-y-1">
                  {ticket.metadata.relatedTickets.map((relatedTicket, index) => (
                    <Button key={index} variant="link" className="h-auto p-0 text-sm">
                      {relatedTicket}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
