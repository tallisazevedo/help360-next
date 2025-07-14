"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, FileText, MessageSquare, PaperclipIcon, Send, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Exemplo de mensagens
const messagesExample = [
  {
    id: "msg-1",
    sender: "Cliente",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Olá, estou com uma dúvida sobre o procedimento de não conformidades.",
    timestamp: "10:30",
    isUser: false,
  },
  {
    id: "msg-2",
    sender: "Atendente",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Olá! Claro, em que posso ajudar com relação ao procedimento de não conformidades?",
    timestamp: "10:32",
    isUser: true,
  },
  {
    id: "msg-3",
    sender: "Cliente",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Gostaria de saber como registrar uma não conformidade no sistema.",
    timestamp: "10:33",
    isUser: false,
  },
  {
    id: "msg-4",
    sender: "Atendente",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Para registrar uma não conformidade, você precisa acessar o módulo 'Não Conformidades' no menu principal, depois clicar em 'Novo Registro'. Vou te enviar o link do procedimento completo para consulta.",
    timestamp: "10:35",
    isUser: true,
    attachments: [
      {
        id: "att-1",
        name: "Procedimento de Não Conformidades",
        type: "document",
        link: "/documentacao/visualizar/doc-2",
      },
    ],
  },
  {
    id: "msg-5",
    sender: "Cliente",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Obrigado! Vou verificar o procedimento.",
    timestamp: "10:36",
    isUser: false,
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState(messagesExample)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: `msg-${messages.length + 1}`,
      sender: "Atendente",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <Tabs defaultValue="chat" className="flex h-full flex-col">
        <div className="border-b px-4">
          <TabsList className="h-14">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="gap-2">
              <User className="h-4 w-4" />
              <span>Informações</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Documentos</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="chat"
          className="flex-1 overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] gap-3 rounded-lg p-3 ${
                      message.isUser ? "flex-row-reverse bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.senderAvatar} alt={message.sender} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`text-xs font-medium ${
                            message.isUser ? "text-primary-foreground" : "text-foreground"
                          }`}
                        >
                          {message.sender}
                        </div>
                        <div
                          className={`text-xs ${
                            message.isUser ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </div>
                      </div>
                      <div className={`mt-1 text-sm ${message.isUser ? "text-primary-foreground" : "text-foreground"}`}>
                        {message.content}
                      </div>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs ${
                                message.isUser
                                  ? "bg-primary-foreground/20 text-primary-foreground"
                                  : "bg-background text-foreground"
                              }`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>{attachment.name}</span>
                              <Button variant="ghost" size="icon" className="ml-auto h-5 w-5 rounded-full p-0" asChild>
                                <Link href={attachment.link}>
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info" className="p-4 data-[state=active]:block">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Dados Básicos</h3>
                <div className="mt-2 rounded-md border p-3">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-xs text-muted-foreground">Nome:</div>
                      <div className="col-span-2 text-sm">João Silva</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-xs text-muted-foreground">Email:</div>
                      <div className="col-span-2 text-sm">joao.silva@empresa.com</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-xs text-muted-foreground">Telefone:</div>
                      <div className="col-span-2 text-sm">(11) 98765-4321</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-xs text-muted-foreground">Empresa:</div>
                      <div className="col-span-2 text-sm">Empresa ABC Ltda.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Histórico de Interações</h3>
                <div className="mt-2 space-y-2">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Chamado #12345</div>
                      <div className="text-xs text-muted-foreground">15/04/2023</div>
                    </div>
                    <div className="mt-1 text-xs">Dúvida sobre procedimento de auditoria</div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                      <Link href="/chamados/12345">
                        <span className="flex items-center gap-1">
                          Ver detalhes <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Chamado #12346</div>
                      <div className="text-xs text-muted-foreground">20/04/2023</div>
                    </div>
                    <div className="mt-1 text-xs">Solicitação de acesso ao módulo de documentos</div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                      <Link href="/chamados/12346">
                        <span className="flex items-center gap-1">
                          Ver detalhes <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="p-4 data-[state=active]:block">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Relacionados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Documentos Compartilhados</h3>
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div className="text-sm">Procedimento de Não Conformidades</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                        <Link href="/documentacao/visualizar/doc-2">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Documentos Recomendados</h3>
                <div className="space-y-2">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div className="text-sm">Manual do SGI</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href="/documentacao/visualizar/doc-1">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div className="text-sm">Instrução de Trabalho - Análise de Causa</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href="/documentacao/visualizar/doc-3">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div className="text-sm">Formulário de Registro de Não Conformidade</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href="/documentacao/visualizar/doc-4">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
