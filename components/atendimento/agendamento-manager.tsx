"use client"

import type React from "react"

import { useState } from "react"
import { format, addDays, isBefore, isAfter, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock4,
  Users,
  MessageSquare,
  CalendarDays,
  RefreshCw,
  XCircle,
  PauseCircle,
  PlayCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { RespostasRapidasSelector } from "./respostas-rapidas-selector"

// Dados simulados
const MOCK_SCHEDULED_MESSAGES = [
  {
    id: "1",
    title: "Lembrete de Pagamento",
    content:
      "Olá! Este é um lembrete amigável de que sua fatura vence amanhã. Por favor, certifique-se de que o pagamento seja efetuado para evitar qualquer interrupção no serviço.",
    scheduledDate: "2023-06-20T10:00:00",
    recipients: {
      type: "individual",
      count: 1,
      details: "João Silva",
    },
    status: "pending",
    channel: "whatsapp",
    createdBy: "Carlos Operador",
    createdAt: "2023-06-15T14:30:00",
  },
  {
    id: "2",
    title: "Pesquisa de Satisfação",
    content:
      "Olá! Gostaríamos de saber como foi sua experiência com nosso atendimento. Poderia responder a uma breve pesquisa? Sua opinião é muito importante para nós!",
    scheduledDate: "2023-06-18T15:30:00",
    recipients: {
      type: "group",
      count: 25,
      details: "Clientes Atendidos - Junho",
    },
    status: "sent",
    channel: "email",
    createdBy: "Ana Supervisora",
    createdAt: "2023-06-10T09:15:00",
  },
  {
    id: "3",
    title: "Novos Recursos Disponíveis",
    content:
      "Temos o prazer de informar que novos recursos foram adicionados à plataforma! Confira as novidades no seu painel de controle.",
    scheduledDate: "2023-06-25T09:00:00",
    recipients: {
      type: "all",
      count: 150,
      details: "Todos os clientes ativos",
    },
    status: "pending",
    channel: "sms",
    createdBy: "Roberto Marketing",
    createdAt: "2023-06-17T11:20:00",
  },
  {
    id: "4",
    title: "Manutenção Programada",
    content:
      "Informamos que haverá uma manutenção programada no sistema no dia 30/06 das 23h às 5h. Durante este período, o sistema ficará indisponível.",
    scheduledDate: "2023-06-28T08:00:00",
    recipients: {
      type: "group",
      count: 75,
      details: "Administradores de Sistema",
    },
    status: "draft",
    channel: "email",
    createdBy: "Departamento de TI",
    createdAt: "2023-06-16T16:45:00",
  },
  {
    id: "5",
    title: "Confirmação de Agendamento",
    content: "Confirmamos seu agendamento para o dia 22/06 às 14h. Por favor, chegue com 15 minutos de antecedência.",
    scheduledDate: "2023-06-21T10:00:00",
    recipients: {
      type: "individual",
      count: 1,
      details: "Maria Oliveira",
    },
    status: "canceled",
    channel: "whatsapp",
    createdBy: "Departamento de Agendamentos",
    createdAt: "2023-06-15T13:10:00",
  },
]

type StatusConfig = {
  [key: string]: {
    label: string
    color: string
    icon: React.ReactNode
  }
}

const STATUS_CONFIG: StatusConfig = {
  pending: {
    label: "Agendada",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: <Clock4 className="mr-1 h-3 w-3" />,
  },
  sent: {
    label: "Enviada",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
  },
  failed: {
    label: "Falha",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: <AlertCircle className="mr-1 h-3 w-3" />,
  },
  draft: {
    label: "Rascunho",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <Edit className="mr-1 h-3 w-3" />,
  },
  canceled: {
    label: "Cancelada",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: <XCircle className="mr-1 h-3 w-3" />,
  },
  paused: {
    label: "Pausada",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: <PauseCircle className="mr-1 h-3 w-3" />,
  },
}

const CHANNEL_CONFIG = {
  whatsapp: {
    label: "WhatsApp",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  email: {
    label: "Email",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  sms: {
    label: "SMS",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
}

export function AgendamentoManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [channelFilter, setChannelFilter] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<(typeof MOCK_SCHEDULED_MESSAGES)[0] | null>(null)
  const [messageContent, setMessageContent] = useState("")
  const [selectedTab, setSelectedTab] = useState("upcoming")

  // Filtra as mensagens com base na pesquisa e filtros
  const filteredMessages = MOCK_SCHEDULED_MESSAGES.filter((message) => {
    const matchesSearch =
      searchTerm === "" ||
      message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === null || message.status === statusFilter
    const matchesChannel = channelFilter === null || message.channel === channelFilter

    const now = new Date()
    const messageDate = parseISO(message.scheduledDate)

    if (selectedTab === "upcoming") {
      return matchesSearch && matchesStatus && matchesChannel && isAfter(messageDate, now)
    } else if (selectedTab === "past") {
      return matchesSearch && matchesStatus && matchesChannel && isBefore(messageDate, now)
    } else if (selectedTab === "draft") {
      return matchesSearch && message.status === "draft"
    }

    return matchesSearch && matchesStatus && matchesChannel
  })

  const handleAddResponse = (content: string) => {
    setMessageContent((prev) => prev + (prev ? "\n\n" : "") + content)
  }

  const handleEditMessage = (message: (typeof MOCK_SCHEDULED_MESSAGES)[0]) => {
    setSelectedMessage(message)
    setMessageContent(message.content)
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agendamento de Mensagens</h1>
        <p className="text-muted-foreground">Agende mensagens para envio automático para seus contatos e grupos.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Mensagens Agendadas</CardTitle>
            <Button
              onClick={() => {
                setSelectedMessage(null)
                setMessageContent("")
                setIsAddDialogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar agendamentos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Status
                    {statusFilter && (
                      <Badge variant="secondary" className="ml-2">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>Todos os status</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <DropdownMenuItem key={key} onClick={() => setStatusFilter(key)} className="flex items-center">
                      {config.icon}
                      <span>{config.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Canal
                    {channelFilter && (
                      <Badge variant="secondary" className="ml-2">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setChannelFilter(null)}>Todos os canais</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {Object.entries(CHANNEL_CONFIG).map(([key, config]) => (
                    <DropdownMenuItem key={key} onClick={() => setChannelFilter(key)}>
                      {config.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">
                <CalendarDays className="mr-2 h-4 w-4" />
                Próximos Envios
              </TabsTrigger>
              <TabsTrigger value="past">
                <Clock className="mr-2 h-4 w-4" />
                Histórico
              </TabsTrigger>
              <TabsTrigger value="draft">
                <Edit className="mr-2 h-4 w-4" />
                Rascunhos
              </TabsTrigger>
              <TabsTrigger value="all">
                <RefreshCw className="mr-2 h-4 w-4" />
                Todos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="m-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <Card key={message.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{message.title}</CardTitle>
                              <CardDescription>
                                Agendada para{" "}
                                {format(parseISO(message.scheduledDate), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={STATUS_CONFIG[message.status].color}>
                                <span className="flex items-center">
                                  {STATUS_CONFIG[message.status].icon}
                                  {STATUS_CONFIG[message.status].label}
                                </span>
                              </Badge>
                              <Badge className={CHANNEL_CONFIG[message.channel].color}>
                                {CHANNEL_CONFIG[message.channel].label}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditMessage(message)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicar
                                  </DropdownMenuItem>
                                  {message.status === "pending" && (
                                    <DropdownMenuItem>
                                      <PauseCircle className="mr-2 h-4 w-4" />
                                      Pausar
                                    </DropdownMenuItem>
                                  )}
                                  {message.status === "paused" && (
                                    <DropdownMenuItem>
                                      <PlayCircle className="mr-2 h-4 w-4" />
                                      Retomar
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              <span>
                                {message.recipients.type === "individual"
                                  ? "Destinatário individual"
                                  : message.recipients.type === "group"
                                    ? `Grupo: ${message.recipients.details}`
                                    : "Todos os contatos"}{" "}
                                ({message.recipients.count})
                              </span>
                            </div>
                            <div>
                              Criado por {message.createdBy} em {format(parseISO(message.createdAt), "dd/MM/yyyy")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                      <p className="text-sm text-muted-foreground">Nenhuma mensagem agendada encontrada.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedMessage(null)
                          setMessageContent("")
                          setIsAddDialogOpen(true)
                        }}
                      >
                        Criar um novo agendamento
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="past" className="m-0">
              {/* Conteúdo similar ao da aba "upcoming", mas com mensagens passadas */}
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <Card key={message.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{message.title}</CardTitle>
                              <CardDescription>
                                Enviada em{" "}
                                {format(parseISO(message.scheduledDate), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={STATUS_CONFIG[message.status].color}>
                                <span className="flex items-center">
                                  {STATUS_CONFIG[message.status].icon}
                                  {STATUS_CONFIG[message.status].label}
                                </span>
                              </Badge>
                              <Badge className={CHANNEL_CONFIG[message.channel].color}>
                                {CHANNEL_CONFIG[message.channel].label}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              <span>
                                {message.recipients.type === "individual"
                                  ? "Destinatário individual"
                                  : message.recipients.type === "group"
                                    ? `Grupo: ${message.recipients.details}`
                                    : "Todos os contatos"}{" "}
                                ({message.recipients.count})
                              </span>
                            </div>
                            <div>
                              Criado por {message.createdBy} em {format(parseISO(message.createdAt), "dd/MM/yyyy")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                      <p className="text-sm text-muted-foreground">Nenhuma mensagem enviada encontrada.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="draft" className="m-0">
              {/* Conteúdo similar ao da aba "upcoming", mas com rascunhos */}
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <Card key={message.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{message.title}</CardTitle>
                              <CardDescription>
                                Rascunho criado em{" "}
                                {format(parseISO(message.createdAt), "dd 'de' MMMM", { locale: ptBR })}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={STATUS_CONFIG[message.status].color}>
                                <span className="flex items-center">
                                  {STATUS_CONFIG[message.status].icon}
                                  {STATUS_CONFIG[message.status].label}
                                </span>
                              </Badge>
                              <Badge className={CHANNEL_CONFIG[message.channel].color}>
                                {CHANNEL_CONFIG[message.channel].label}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditMessage(message)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              <span>
                                {message.recipients.type === "individual"
                                  ? "Destinatário individual"
                                  : message.recipients.type === "group"
                                    ? `Grupo: ${message.recipients.details}`
                                    : "Todos os contatos"}{" "}
                                ({message.recipients.count})
                              </span>
                            </div>
                            <div>
                              Criado por {message.createdBy} em {format(parseISO(message.createdAt), "dd/MM/yyyy")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                      <p className="text-sm text-muted-foreground">Nenhum rascunho encontrado.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedMessage(null)
                          setMessageContent("")
                          setIsAddDialogOpen(true)
                        }}
                      >
                        Criar um novo rascunho
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="all" className="m-0">
              {/* Conteúdo similar ao da aba "upcoming", mas com todas as mensagens */}
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <Card key={message.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{message.title}</CardTitle>
                              <CardDescription>
                                {message.status === "sent"
                                  ? `Enviada em ${format(parseISO(message.scheduledDate), "dd/MM/yyyy 'às' HH:mm")}`
                                  : message.status === "draft"
                                    ? `Rascunho criado em ${format(parseISO(message.createdAt), "dd/MM/yyyy")}`
                                    : `Agendada para ${format(parseISO(message.scheduledDate), "dd/MM/yyyy 'às' HH:mm")}`}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={STATUS_CONFIG[message.status].color}>
                                <span className="flex items-center">
                                  {STATUS_CONFIG[message.status].icon}
                                  {STATUS_CONFIG[message.status].label}
                                </span>
                              </Badge>
                              <Badge className={CHANNEL_CONFIG[message.channel].color}>
                                {CHANNEL_CONFIG[message.channel].label}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {(message.status === "pending" || message.status === "draft") && (
                                    <DropdownMenuItem onClick={() => handleEditMessage(message)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicar
                                  </DropdownMenuItem>
                                  {message.status === "pending" && (
                                    <DropdownMenuItem>
                                      <PauseCircle className="mr-2 h-4 w-4" />
                                      Pausar
                                    </DropdownMenuItem>
                                  )}
                                  {message.status === "paused" && (
                                    <DropdownMenuItem>
                                      <PlayCircle className="mr-2 h-4 w-4" />
                                      Retomar
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              <span>
                                {message.recipients.type === "individual"
                                  ? "Destinatário individual"
                                  : message.recipients.type === "group"
                                    ? `Grupo: ${message.recipients.details}`
                                    : "Todos os contatos"}{" "}
                                ({message.recipients.count})
                              </span>
                            </div>
                            <div>
                              Criado por {message.createdBy} em {format(parseISO(message.createdAt), "dd/MM/yyyy")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                      <p className="text-sm text-muted-foreground">Nenhuma mensagem encontrada.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedMessage(null)
                          setMessageContent("")
                          setIsAddDialogOpen(true)
                        }}
                      >
                        Criar um novo agendamento
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog para adicionar/editar agendamento */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMessage ? "Editar Agendamento" : "Novo Agendamento"}</DialogTitle>
            <DialogDescription>
              {selectedMessage
                ? "Edite os detalhes do agendamento de mensagem."
                : "Crie um novo agendamento de mensagem para envio automático."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título do Agendamento</Label>
              <Input id="title" placeholder="Ex: Lembrete de Pagamento" defaultValue={selectedMessage?.title || ""} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Conteúdo da Mensagem</Label>
                <RespostasRapidasSelector onSelectResponse={handleAddResponse} />
              </div>
              <Textarea
                id="content"
                placeholder="Digite o conteúdo da mensagem..."
                className="min-h-[150px]"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Dica: Use {"{{"} variavel {"}}"} para incluir variáveis que serão substituídas automaticamente.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="channel">Canal</Label>
                <select
                  id="channel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedMessage?.channel || "whatsapp"}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedMessage?.status || "pending"}
                >
                  <option value="pending">Agendada</option>
                  <option value="draft">Rascunho</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scheduled-date">Data e Hora de Envio</Label>
              <div className="flex gap-2">
                <Input
                  id="scheduled-date"
                  type="date"
                  defaultValue={
                    selectedMessage
                      ? format(parseISO(selectedMessage.scheduledDate), "yyyy-MM-dd")
                      : format(addDays(new Date(), 1), "yyyy-MM-dd")
                  }
                />
                <Input
                  id="scheduled-time"
                  type="time"
                  defaultValue={selectedMessage ? format(parseISO(selectedMessage.scheduledDate), "HH:mm") : "10:00"}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Destinatários</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recipient-type-individual"
                    defaultChecked={selectedMessage?.recipients.type === "individual"}
                  />
                  <Label htmlFor="recipient-type-individual">Contato individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recipient-type-group" defaultChecked={selectedMessage?.recipients.type === "group"} />
                  <Label htmlFor="recipient-type-group">Grupo de contatos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recipient-type-all" defaultChecked={selectedMessage?.recipients.type === "all"} />
                  <Label htmlFor="recipient-type-all">Todos os contatos</Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recipients">Selecionar Destinatários</Label>
              <Input
                id="recipients"
                placeholder="Buscar contatos ou grupos..."
                defaultValue={selectedMessage?.recipients.details || ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{selectedMessage ? "Salvar Alterações" : "Agendar Mensagem"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
