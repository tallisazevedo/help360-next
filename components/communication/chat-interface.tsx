"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Paperclip,
  Send,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Eye,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "contact"
  timestamp: string
  status?: "sent" | "delivered" | "read"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá, como posso ajudar?",
      sender: "user",
      timestamp: "10:30",
      status: "read",
    },
    {
      id: "2",
      content: "Estou com uma dúvida sobre o registro de não conformidades.",
      sender: "contact",
      timestamp: "10:31",
    },
    {
      id: "3",
      content: "Claro, qual é a sua dúvida específica?",
      sender: "user",
      timestamp: "10:32",
      status: "read",
    },
    {
      id: "4",
      content: "Como faço para anexar múltiplas evidências em um único registro?",
      sender: "contact",
      timestamp: "10:33",
    },
    {
      id: "5",
      content:
        "Você pode adicionar múltiplos arquivos na seção de evidências. Basta clicar no botão 'Adicionar arquivo' para cada evidência que deseja anexar. O sistema suporta até 10 arquivos por registro, com tamanho máximo de 10MB cada.",
      sender: "user",
      timestamp: "10:35",
      status: "delivered",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("chat")

  // Exemplo de documentos relacionados - substitua por dados reais da sua aplicação
  const documentosRelacionados = [
    { id: "1", titulo: "Manual de Qualidade" },
    { id: "2", titulo: "Procedimento de Atendimento" },
    { id: "3", titulo: "Instrução de Trabalho IT-001" },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simular resposta
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Obrigado pela informação! Vou tentar fazer isso agora.",
        sender: "contact",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sent":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCircle className="h-3 w-3 text-blue-500" />
      case "read":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Carlos Santos</CardTitle>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100/80 text-xs">
                Online
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Ticket: T-2023-001 • Prioridade: Média</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Ver perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Histórico de atendimentos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Marcar como resolvido
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XCircle className="mr-2 h-4 w-4" />
                Encerrar atendimento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="chat" onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList className="h-10">
                <TabsTrigger value="chat" className="text-xs">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversa
                </TabsTrigger>
                <TabsTrigger value="info" className="text-xs">
                  <User className="h-4 w-4 mr-2" />
                  Informações do Cliente
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs">
                  <FileText className="h-4 w-4 mr-2" />
                  Notas
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "contact" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            message.sender === "user"
                              ? "text-primary-foreground/70 justify-end"
                              : "text-muted-foreground"
                          }`}
                        >
                          <span className="text-xs">{message.timestamp}</span>
                          {message.sender === "user" && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Adicione esta seção em um local apropriado na interface de chat */}
                  <div className="mt-4 border-t pt-3">
                    <h4 className="text-sm font-medium mb-2">Documentos Relacionados</h4>
                    <div className="space-y-2">
                      {documentosRelacionados.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{doc.titulo}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                            <Link href={`/documentacao/${doc.id}`}>
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <Separator />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="info" className="p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Nome completo</p>
                    <p className="text-sm text-muted-foreground">Carlos Eduardo Santos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-sm text-muted-foreground">carlos.santos@empresa.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">(11) 98765-4321</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Empresa</p>
                    <p className="text-sm text-muted-foreground">Empresa ABC Ltda.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cargo</p>
                    <p className="text-sm text-muted-foreground">Gerente de Qualidade</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Histórico de atendimentos</p>
                    <p className="text-sm text-muted-foreground">5 atendimentos anteriores</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notas do Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea placeholder="Adicione notas sobre este atendimento..." className="min-h-[200px]" />
                  <Button className="w-full">Salvar Notas</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {activeTab === "chat" && (
          <div className="w-80 border-l p-4 hidden lg:block">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Informações do Ticket</h3>
                <Card>
                  <CardContent className="p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span>T-2023-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Atendendo
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prioridade:</span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        Média
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Canal:</span>
                      <span>Chat</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criado em:</span>
                      <span>15/03/2023 10:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atendente:</span>
                      <span>Maria Silva</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Respostas Rápidas</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setNewMessage("Olá! Como posso ajudar?")}
                  >
                    <span className="truncate">Olá! Como posso ajudar?</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setNewMessage("Poderia fornecer mais detalhes sobre o problema?")}
                  >
                    <span className="truncate">Poderia fornecer mais detalhes sobre o problema?</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setNewMessage("Vou verificar isso para você e retorno em breve.")}
                  >
                    <span className="truncate">Vou verificar isso para você e retorno em breve.</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setNewMessage("Agradecemos pelo contato. Há mais alguma coisa em que posso ajudar?")}
                  >
                    <span className="truncate">
                      Agradecemos pelo contato. Há mais alguma coisa em que posso ajudar?
                    </span>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Ações</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Marcar como resolvido</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <User className="h-4 w-4 mr-2" />
                    <span>Transferir atendimento</span>
                  </Button>
                  <Button variant="destructive" className="w-full justify-start text-left">
                    <XCircle className="h-4 w-4 mr-2" />
                    <span>Encerrar atendimento</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
