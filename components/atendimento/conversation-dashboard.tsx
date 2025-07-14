"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Calendar,
  User,
  MessageSquare,
  Shield,
  LineChart,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ConversationListFilters } from "@/components/atendimento/conversation-list-filters"
import { ConversationQualityMetrics } from "@/components/atendimento/conversation-quality-metrics"
import { ConversationComplianceSettings } from "@/components/atendimento/conversation-compliance-settings"
import { ConversationChatPanel } from "@/components/atendimento/conversation-chat-panel"
import { TicketsPanel } from "@/components/atendimento/tickets-panel"

// Modificar a definição de MOCK_CONVERSATIONS para incluir a fila (queue)
const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    customer: "João Silva",
    channel: "whatsapp",
    lastMessage: "Obrigado pelo atendimento, resolveu meu problema!",
    date: "2023-06-15",
    time: "15:30",
    agent: "Carlos Oliveira",
    sentiment: "positive",
    status: "closed",
    hasConsent: true,
    retentionDays: 90,
    qualityScore: 4.8,
    tags: ["dúvida", "resolvido"],
    protocol: "HELP-2023-001",
    queue: "suporte",
  },
  {
    id: "c2",
    customer: "Maria Santos",
    channel: "teams",
    lastMessage: "Estou aguardando a solução do meu problema há 3 dias",
    date: "2023-06-14",
    time: "09:15",
    agent: "Ana Pereira",
    sentiment: "negative",
    status: "open",
    hasConsent: true,
    retentionDays: 90,
    qualityScore: 2.1,
    tags: ["reclamação", "atraso"],
    protocol: "HELP-2023-002",
    queue: "financeiro",
  },
  {
    id: "c3",
    customer: "Roberto Ferreira",
    channel: "telegram",
    lastMessage: "Acabei de comprar o produto. Como faço para configurar?",
    date: "2023-06-13",
    time: "14:22",
    agent: "Fernanda Lima",
    sentiment: "neutral",
    status: "open",
    hasConsent: false,
    retentionDays: 0,
    qualityScore: 3.5,
    tags: ["novo cliente", "dúvida técnica"],
    protocol: "HELP-2023-003",
    queue: "suporte",
  },
  {
    id: "c4",
    customer: "Amanda Souza",
    channel: "facebook",
    lastMessage: "A entrega atrasou, preciso de um posicionamento urgente",
    date: "2023-06-12",
    time: "16:40",
    agent: "Marcos Silva",
    sentiment: "negative",
    status: "pending",
    hasConsent: true,
    retentionDays: 90,
    qualityScore: 2.8,
    tags: ["reclamação", "entrega"],
    protocol: "HELP-2023-004",
    queue: "logistica",
  },
  {
    id: "c5",
    customer: "Carlos Eduardo",
    channel: "instagram",
    lastMessage: "Adorei o produto! Vocês têm em outras cores?",
    date: "2023-06-11",
    time: "11:05",
    agent: "Juliana Costa",
    sentiment: "positive",
    status: "closed",
    hasConsent: true,
    retentionDays: 90,
    qualityScore: 4.9,
    tags: ["elogio", "interesse"],
    protocol: "HELP-2023-005",
    queue: "vendas",
  },
  {
    id: "c6",
    customer: "Patrícia Mendes",
    channel: "whatsapp",
    lastMessage: "Preciso cancelar meu pedido #54321",
    date: "2023-06-10",
    time: "10:18",
    agent: "Ricardo Santos",
    sentiment: "neutral",
    status: "pending",
    hasConsent: true,
    retentionDays: 90,
    qualityScore: 3.7,
    tags: ["cancelamento", "pedido"],
    protocol: "HELP-2023-006",
    queue: "cancelamento",
  },
]

// Adicionar configuração de filas
const queueConfig = {
  suporte: { color: "bg-blue-500", label: "Suporte" },
  financeiro: { color: "bg-green-500", label: "Financeiro" },
  vendas: { color: "bg-purple-500", label: "Vendas" },
  cancelamento: { color: "bg-red-500", label: "Cancelamento" },
  logistica: { color: "bg-orange-500", label: "Logística" },
  geral: { color: "bg-gray-500", label: "Geral" },
}

const channelConfig = {
  whatsapp: { color: "bg-green-500", label: "WhatsApp" },
  teams: { color: "bg-blue-500", label: "Teams" },
  telegram: { color: "bg-blue-400", label: "Telegram" },
  facebook: { color: "bg-blue-600", label: "Facebook" },
  instagram: { color: "bg-pink-500", label: "Instagram" },
}

const statusConfig = {
  open: { label: "Aberto", variant: "default", icon: MessageSquare },
  pending: { label: "Pendente", variant: "warning", icon: Clock },
  closed: { label: "Fechado", variant: "success", icon: CheckCircle },
}

const sentimentConfig = {
  positive: { label: "Positivo", color: "text-green-500" },
  negative: { label: "Negativo", color: "text-red-500" },
  neutral: { label: "Neutro", color: "text-gray-500" },
}

// Adicionar estado para controlar a conversa selecionada
export function ConversationDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [showComplianceSettings, setShowComplianceSettings] = useState(false)
  const [showQualityMetrics, setShowQualityMetrics] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [activeView, setActiveView] = useState("conversations") // 'conversations' ou 'tickets'
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  // Filtrar conversas com base na busca e aba selecionada
  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      conv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "consent" && conv.hasConsent) ||
      (selectedTab === "no-consent" && !conv.hasConsent) ||
      (selectedTab === "positive" && conv.sentiment === "positive") ||
      (selectedTab === "negative" && conv.sentiment === "negative")

    return matchesSearch && matchesTab
  })

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Central de Conversas</h1>
        <div className="flex gap-2">
          <Dialog open={showComplianceSettings} onOpenChange={setShowComplianceSettings}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Configurações LGPD
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Configurações de Conformidade LGPD</DialogTitle>
                <DialogDescription>
                  Defina políticas de retenção de dados e gerenciamento de consentimento para conformidade com a LGPD.
                </DialogDescription>
              </DialogHeader>
              <ConversationComplianceSettings />
            </DialogContent>
          </Dialog>

          <Dialog open={showQualityMetrics} onOpenChange={setShowQualityMetrics}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <LineChart className="mr-2 h-4 w-4" />
                Métricas de Qualidade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Métricas de Qualidade de Atendimento</DialogTitle>
                <DialogDescription>
                  Visualize e analise métricas de qualidade dos atendimentos realizados.
                </DialogDescription>
              </DialogHeader>
              <ConversationQualityMetrics />
            </DialogContent>
          </Dialog>

          <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exportar Conversas</DialogTitle>
                <DialogDescription>Selecione o formato e período para exportação dos dados.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="format" className="text-right">
                    Formato:
                  </label>
                  <Select defaultValue="csv">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="period" className="text-right">
                    Período:
                  </label>
                  <Select defaultValue="last30">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7">Últimos 7 dias</SelectItem>
                      <SelectItem value="last30">Últimos 30 dias</SelectItem>
                      <SelectItem value="last90">Últimos 90 dias</SelectItem>
                      <SelectItem value="custom">Período personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="content" className="text-right">
                    Conteúdo:
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o conteúdo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as informações</SelectItem>
                      <SelectItem value="summary">Resumo (sem conteúdo das mensagens)</SelectItem>
                      <SelectItem value="stats">Apenas estatísticas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-pii" className="h-4 w-4" />
                  <label htmlFor="include-pii">Incluir dados pessoais (requer justificativa)</label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Exportar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Conversas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Índice de Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5.0</div>
            <p className="text-xs text-muted-foreground">+0.3 em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground">-18s em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conformidade LGPD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente, protocolo ou conteúdo..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ConversationListFilters />
      </div>

      <Tabs defaultValue="conversations" className="mb-6" value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeView === "conversations" && (
        <>
          <Tabs defaultValue="all" className="mb-6" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="consent" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Com Consentimento
              </TabsTrigger>
              <TabsTrigger value="no-consent" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Sem Consentimento
              </TabsTrigger>
              <TabsTrigger value="positive" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Avaliação Positiva
              </TabsTrigger>
              <TabsTrigger value="negative" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Avaliação Negativa
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {selectedConversation ? (
            <div className="mb-4 flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedConversation(null)}>
                  Voltar
                </Button>
                <h2 className="text-lg font-medium">
                  Conversa com {MOCK_CONVERSATIONS.find((c) => c.id === selectedConversation)?.customer || "Cliente"}
                </h2>
              </div>
              <Badge variant="outline">
                {MOCK_CONVERSATIONS.find((c) => c.id === selectedConversation)?.protocol || ""}
              </Badge>
            </div>
          ) : null}

          {selectedConversation ? (
            <div className="rounded-lg border shadow-sm">
              <ConversationChatPanel conversationId={selectedConversation} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredConversations.map((conversation) => {
                const channel = channelConfig[conversation.channel as keyof typeof channelConfig]
                const status = statusConfig[conversation.status as keyof typeof statusConfig]
                const sentiment = sentimentConfig[conversation.sentiment as keyof typeof sentimentConfig]
                const queue = queueConfig[conversation.queue as keyof typeof queueConfig] || queueConfig.geral
                const StatusIcon = status.icon

                return (
                  <Card key={conversation.id} className="overflow-hidden">
                    <div className={`h-1 w-full ${queue.color}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{conversation.customer}</h3>
                            {conversation.hasConsent ? (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 border-green-500 text-xs text-green-500"
                              >
                                <Shield className="h-3 w-3" />
                                LGPD
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 border-red-500 text-xs text-red-500"
                              >
                                <AlertCircle className="h-3 w-3" />
                                Sem LGPD
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <div className={`h-2 w-2 rounded-full ${channel.color}`}></div>
                              {channel.label}
                            </span>
                            <span>•</span>
                            <span>{conversation.protocol}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            variant={
                              status.variant as
                                | "default"
                                | "secondary"
                                | "destructive"
                                | "outline"
                                | "warning"
                                | "success"
                            }
                            className="flex items-center gap-1"
                          >
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${queue.color.replace("bg-", "text-")}`}>
                            {queue.label}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">{conversation.lastMessage}</p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {conversation.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {conversation.time}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {conversation.agent}
                        </span>
                        <span>•</span>
                        <span className={`${sentiment.color}`}>Sentimento: {sentiment.label}</span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {conversation.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {conversation.hasConsent && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Retenção: {conversation.retentionDays} dias
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 p-2">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold">Qualidade:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${
                                  star <= Math.round(conversation.qualityScore) ? "text-yellow-500" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm">({conversation.qualityScore.toFixed(1)})</span>
                        </div>
                        <Button size="sm" onClick={() => setSelectedConversation(conversation.id)}>
                          Visualizar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}

          {filteredConversations.length === 0 && !selectedConversation && (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-lg font-medium">Nenhuma conversa encontrada</p>
              <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou a busca</p>
            </div>
          )}
        </>
      )}

      {activeView === "tickets" && <TicketsPanel />}
    </div>
  )
}
