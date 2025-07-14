import type { Metadata } from "next"
import { ArrowLeft, Clock, Download, MessageCircle, Paperclip, Send, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Detalhes do Ticket | Help360",
  description: "Detalhes do ticket de atendimento Help360",
}

// Dados simulados para o ticket
const ticket = {
  id: "TICK-001",
  client: "Empresa ABC",
  contact: "João Silva",
  email: "joao.silva@empresaabc.com",
  phone: "(11) 98765-4321",
  subject: "Problema de acesso ao sistema",
  description:
    "Não consigo acessar o módulo de relatórios. Aparece uma mensagem de erro 'Acesso negado. Contate o administrador.'",
  status: "open",
  priority: "high",
  assignee: "Carlos Santos",
  created: "15/05/2023 10:30",
  updated: "15/05/2023 14:45",
  category: "Suporte Técnico",
  protocol: "PROT-001",
}

// Dados simulados para mensagens
const messages = [
  {
    id: "1",
    sender: "João Silva",
    role: "client",
    content: "Olá, estou com um problema no sistema. Não consigo acessar o módulo de relatórios.",
    time: "15/05/2023 10:30",
  },
  {
    id: "2",
    sender: "Carlos Santos",
    role: "support",
    content: "Olá João, tudo bem? Vou te ajudar com isso. Você está tentando acessar qual relatório específico?",
    time: "15/05/2023 10:35",
  },
  {
    id: "3",
    sender: "João Silva",
    role: "client",
    content: "Estou tentando acessar o relatório mensal de vendas, mas aparece uma mensagem de erro.",
    time: "15/05/2023 10:40",
  },
  {
    id: "4",
    sender: "João Silva",
    role: "client",
    content: "A mensagem diz 'Acesso negado. Contate o administrador.'",
    time: "15/05/2023 10:40",
  },
  {
    id: "5",
    sender: "Carlos Santos",
    role: "support",
    content: "Entendi. Vou verificar as permissões da sua conta. Você consegue me informar seu ID de usuário?",
    time: "15/05/2023 10:45",
  },
  {
    id: "6",
    sender: "João Silva",
    role: "client",
    content: "Meu ID de usuário é JS123.",
    time: "15/05/2023 10:50",
  },
  {
    id: "7",
    sender: "Carlos Santos",
    role: "support",
    content: "Obrigado. Estou verificando aqui no sistema. Um momento, por favor.",
    time: "15/05/2023 10:55",
  },
  {
    id: "8",
    sender: "Carlos Santos",
    role: "support",
    content:
      "Identifiquei o problema. Seu usuário não tinha permissão para acessar esse módulo específico. Acabei de adicionar a permissão necessária. Você pode tentar acessar novamente e me informar se funcionou?",
    time: "15/05/2023 11:05",
  },
  {
    id: "9",
    sender: "João Silva",
    role: "client",
    content: "Vou verificar agora.",
    time: "15/05/2023 11:10",
  },
  {
    id: "10",
    sender: "João Silva",
    role: "client",
    content: "Funcionou! Agora consigo acessar o relatório. Muito obrigado pela ajuda!",
    time: "15/05/2023 11:15",
  },
  {
    id: "11",
    sender: "Carlos Santos",
    role: "support",
    content: "Ótimo! Fico feliz em ajudar. Se precisar de mais alguma coisa, é só entrar em contato. Tenha um bom dia!",
    time: "15/05/2023 11:20",
  },
]

// Dados simulados para atividades
const activities = [
  {
    id: "1",
    user: "Sistema",
    action: "Ticket criado",
    time: "15/05/2023 10:30",
  },
  {
    id: "2",
    user: "Sistema",
    action: "Atribuído a Carlos Santos",
    time: "15/05/2023 10:32",
  },
  {
    id: "3",
    user: "Carlos Santos",
    action: "Alterou o status para 'Em Andamento'",
    time: "15/05/2023 10:35",
  },
  {
    id: "4",
    user: "Carlos Santos",
    action: "Adicionou nota interna: 'Verificando permissões do usuário'",
    time: "15/05/2023 10:55",
  },
  {
    id: "5",
    user: "Carlos Santos",
    action: "Alterou o status para 'Resolvido'",
    time: "15/05/2023 11:25",
  },
  {
    id: "6",
    user: "Sistema",
    action: "Enviado email de confirmação de resolução",
    time: "15/05/2023 11:26",
  },
]

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 border-b p-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/atendimento/tickets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Ticket {params.id}</h1>
          <p className="text-sm text-muted-foreground">{ticket.subject}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select defaultValue={ticket.status}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Aberto</SelectItem>
              <SelectItem value="in-progress">Em Andamento</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="resolved">Resolvido</SelectItem>
              <SelectItem value="closed">Fechado</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={ticket.priority}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={ticket.assignee}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Carlos Santos">Carlos Santos</SelectItem>
              <SelectItem value="Ana Lima">Ana Lima</SelectItem>
              <SelectItem value="Roberto Silva">Roberto Silva</SelectItem>
              <SelectItem value="Mariana Oliveira">Mariana Oliveira</SelectItem>
            </SelectContent>
          </Select>
          <Button>Salvar Alterações</Button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 border-r">
          <Tabs defaultValue="conversation" className="h-full">
            <div className="border-b">
              <TabsList className="mx-4 my-2">
                <TabsTrigger value="conversation" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Conversa
                </TabsTrigger>
                <TabsTrigger value="activities" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Atividades
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="conversation" className="h-[calc(100%-48px)] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "client" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.role === "client" ? "bg-muted" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">{message.sender}</span>
                          <span
                            className={`text-xs ${
                              message.role === "client" ? "text-muted-foreground" : "text-primary-foreground/70"
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Digite sua mensagem..." className="flex-1" />
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="p-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Histórico de Atividades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                          <p className="text-sm">{activity.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-80">
          <div className="p-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Detalhes do Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">ID:</span> {ticket.id}
                </div>
                <div>
                  <span className="font-medium">Protocolo:</span> {ticket.protocol}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {ticket.status === "open" ? "Aberto" : ticket.status}
                </div>
                <div>
                  <span className="font-medium">Prioridade:</span>{" "}
                  {ticket.priority === "high" ? "Alta" : ticket.priority}
                </div>
                <div>
                  <span className="font-medium">Categoria:</span> {ticket.category}
                </div>
                <div>
                  <span className="font-medium">Criado em:</span> {ticket.created}
                </div>
                <div>
                  <span className="font-medium">Atualizado em:</span> {ticket.updated}
                </div>
                <div>
                  <span className="font-medium">Responsável:</span> {ticket.assignee}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Cliente:</span> {ticket.client}
                </div>
                <div>
                  <span className="font-medium">Contato:</span> {ticket.contact}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {ticket.email}
                </div>
                <div>
                  <span className="font-medium">Telefone:</span> {ticket.phone}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{ticket.description}</p>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Transferir Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Ticket
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Encerrar Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
