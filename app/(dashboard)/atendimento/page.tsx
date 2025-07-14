import type { Metadata } from "next"
import {
  MessageCircle,
  User,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Send,
  Mic,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Central de Atendimento | Help360",
  description: "Central de atendimento ao cliente Help360",
}

// Dados simulados para conversas
const conversations = [
  {
    id: "1",
    name: "João Silva",
    company: "Empresa ABC",
    lastMessage: "Preciso de ajuda com o sistema",
    time: "10:30",
    unread: 3,
    channel: "whatsapp",
    protocol: "PROT-001",
    status: "waiting",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    company: "Empresa XYZ",
    lastMessage: "Quando será resolvido o problema?",
    time: "09:45",
    unread: 0,
    channel: "email",
    protocol: "PROT-002",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Carlos Santos",
    company: "Empresa 123",
    lastMessage: "Obrigado pela ajuda!",
    time: "Ontem",
    unread: 0,
    channel: "chat",
    protocol: "PROT-003",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Ana Pereira",
    company: "Empresa DEF",
    lastMessage: "Preciso de um orçamento",
    time: "Ontem",
    unread: 1,
    channel: "whatsapp",
    protocol: "PROT-004",
    status: "waiting",
  },
  {
    id: "5",
    name: "Roberto Almeida",
    company: "Empresa GHI",
    lastMessage: "Quando vocês podem fazer a instalação?",
    time: "Segunda",
    unread: 0,
    channel: "email",
    protocol: "PROT-005",
    status: "waiting",
  },
]

// Dados simulados para mensagens
const messages = [
  {
    id: "1",
    sender: "user",
    content: "Olá, estou com um problema no sistema. Não consigo acessar o módulo de relatórios.",
    time: "10:25",
  },
  {
    id: "2",
    sender: "operator",
    content: "Olá João, tudo bem? Vou te ajudar com isso. Você está tentando acessar qual relatório específico?",
    time: "10:27",
  },
  {
    id: "3",
    sender: "user",
    content: "Estou tentando acessar o relatório mensal de vendas, mas aparece uma mensagem de erro.",
    time: "10:28",
  },
  {
    id: "4",
    sender: "user",
    content: "A mensagem diz 'Acesso negado. Contate o administrador.'",
    time: "10:28",
  },
  {
    id: "5",
    sender: "operator",
    content: "Entendi. Vou verificar as permissões da sua conta. Você consegue me informar seu ID de usuário?",
    time: "10:30",
  },
]

export default function AtendimentoPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full">
        {/* Sidebar de conversas */}
        <div className="flex w-80 flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Conversas</h2>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="px-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                Todos
              </TabsTrigger>
              <TabsTrigger value="waiting" className="flex-1">
                Aguardando
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1">
                Em Atendimento
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex cursor-pointer flex-col rounded-lg p-3 transition-colors hover:bg-muted/50 ${conversation.id === "1" ? "bg-muted" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{conversation.name}</span>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{conversation.company}</p>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {conversation.channel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {conversation.protocol}
                    </Badge>
                    <Badge variant={conversation.status === "waiting" ? "destructive" : "default"} className="text-xs">
                      {conversation.status === "waiting" ? "Aguardando" : "Em Atendimento"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Área principal de chat */}
        <div className="flex flex-1 flex-col">
          {/* Cabeçalho do chat */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">João Silva</span>
                  <Badge variant="outline" className="text-xs">
                    whatsapp
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Empresa ABC • PROT-001</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Área de mensagens */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-muted" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div
                      className={`mt-1 text-right text-xs ${
                        message.sender === "user" ? "text-muted-foreground" : "text-primary-foreground/70"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Área de input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Digite sua mensagem..." className="flex-1" />
              <Button variant="ghost" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Painel lateral de informações */}
        <div className="w-80 border-l">
          <Tabs defaultValue="info">
            <TabsList className="w-full">
              <TabsTrigger value="info" className="flex-1">
                Informações
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                Anotações
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                Histórico
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="p-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Detalhes do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Nome:</span> João Silva
                  </div>
                  <div>
                    <span className="font-medium">Empresa:</span> Empresa ABC
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> joao.silva@empresaabc.com
                  </div>
                  <div>
                    <span className="font-medium">Telefone:</span> (11) 98765-4321
                  </div>
                  <div>
                    <span className="font-medium">Protocolo:</span> PROT-001
                  </div>
                  <div>
                    <span className="font-medium">Canal:</span> WhatsApp
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> Em Atendimento
                  </div>
                  <div>
                    <span className="font-medium">Início:</span> 10:25
                  </div>
                  <div>
                    <span className="font-medium">Duração:</span> 00:15:32
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Transferir Atendimento
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Chamar Supervisor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Pausar Atendimento
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Encerrar Atendimento
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="p-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Anotações Internas</CardTitle>
                  <CardDescription>Visíveis apenas para a equipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Operador: Maria</span>
                        <span className="text-xs text-muted-foreground">10:27</span>
                      </div>
                      <p className="mt-1 text-sm">
                        Cliente relatou problemas de acesso ao módulo de relatórios. Verificando permissões.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center gap-2">
                    <Input placeholder="Adicionar anotação..." />
                    <Button size="sm">Adicionar</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="p-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Histórico de Atendimentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Protocolo: PROT-001</span>
                        <Badge>Resolvido</Badge>
                      </div>
                      <p className="mt-1 text-sm">Problema com acesso ao sistema</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Atendente: Carlos</span>
                        <span className="text-xs text-muted-foreground">15/05/2023</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Protocolo: PROT-002</span>
                        <Badge>Resolvido</Badge>
                      </div>
                      <p className="mt-1 text-sm">Dúvidas sobre faturamento</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Atendente: Ana</span>
                        <span className="text-xs text-muted-foreground">10/04/2023</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
