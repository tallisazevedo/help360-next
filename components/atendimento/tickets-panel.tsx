"use client"

import { useState } from "react"
import { Search, Filter, CheckCircle, XCircle, AlertCircle, Clock, MoreVertical, Download, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Dados de exemplo
const MOCK_TICKETS = [
  {
    id: "1",
    customer: {
      name: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
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
    resolution: "Problema resolvido com sucesso",
    hasLgpdConsent: true,
    qualityScore: 4.8,
  },
  {
    id: "2",
    customer: {
      name: "Maria Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "FB-20230615-002",
    channel: "facebook",
    queue: "financeiro",
    status: "pending",
    agent: {
      name: "Ana Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "15/06/2023 09:45",
    closedAt: "15/06/2023 10:15",
    resolution: "Cliente orientado sobre procedimentos de pagamento",
    hasLgpdConsent: true,
    qualityScore: 3.5,
  },
  {
    id: "3",
    customer: {
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "IG-20230614-003",
    channel: "instagram",
    queue: "vendas",
    status: "rejected",
    agent: {
      name: "Pedro Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "14/06/2023 14:30",
    closedAt: "14/06/2023 15:00",
    resolution: "Cliente não aceitou a proposta oferecida",
    hasLgpdConsent: false,
    qualityScore: 2.2,
  },
  {
    id: "4",
    customer: {
      name: "Ana Beatriz",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "EM-20230614-004",
    channel: "email",
    queue: "suporte",
    status: "approved",
    agent: {
      name: "Mariana Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "14/06/2023 11:20",
    closedAt: "14/06/2023 11:45",
    resolution: "Problema técnico resolvido remotamente",
    hasLgpdConsent: true,
    qualityScore: 4.9,
  },
  {
    id: "5",
    customer: {
      name: "Roberto Alves",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "WA-20230612-005",
    channel: "whatsapp",
    queue: "cancelamento",
    status: "pending",
    agent: {
      name: "Juliana Atendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "12/06/2023 16:10",
    closedAt: "12/06/2023 16:40",
    resolution: "Cliente solicitou mais tempo para decidir",
    hasLgpdConsent: true,
    qualityScore: 3.7,
  },
  {
    id: "6",
    customer: {
      name: "Fernanda Costa",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    protocol: "TG-20230611-006",
    channel: "telegram",
    queue: "logistica",
    status: "approved",
    agent: {
      name: "Ricardo Santos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "11/06/2023 13:05",
    closedAt: "11/06/2023 13:30",
    resolution: "Informações de rastreamento fornecidas ao cliente",
    hasLgpdConsent: false,
    qualityScore: 4.2,
  },
]

export function TicketsPanel() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)

  const filteredTickets = MOCK_TICKETS.filter((ticket) => {
    if (activeTab !== "all") {
      if (activeTab === "approved" && ticket.status !== "approved") return false
      if (activeTab === "pending" && ticket.status !== "pending") return false
      if (activeTab === "rejected" && ticket.status !== "rejected") return false
      if (activeTab === "lgpd" && !ticket.hasLgpdConsent) return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        ticket.customer.name.toLowerCase().includes(query) ||
        ticket.protocol.toLowerCase().includes(query) ||
        ticket.resolution.toLowerCase().includes(query) ||
        ticket.agent.name.toLowerCase().includes(query) ||
        ticket.queue.toLowerCase().includes(query)
      )
    }

    return true
  })

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
      case "logistica":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

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

  // Estatísticas de tickets
  const ticketStats = {
    total: MOCK_TICKETS.length,
    approved: MOCK_TICKETS.filter((t) => t.status === "approved").length,
    pending: MOCK_TICKETS.filter((t) => t.status === "pending").length,
    rejected: MOCK_TICKETS.filter((t) => t.status === "rejected").length,
    withConsent: MOCK_TICKETS.filter((t) => t.hasLgpdConsent).length,
    avgQuality: MOCK_TICKETS.reduce((acc, t) => acc + t.qualityScore, 0) / MOCK_TICKETS.length,
  }

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tickets de Atendimento</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowExportDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ticketStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{ticketStats.approved}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((ticketStats.approved / ticketStats.total) * 100)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{ticketStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((ticketStats.pending / ticketStats.total) * 100)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Qualidade Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ticketStats.avgQuality.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= Math.round(ticketStats.avgQuality) ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="approved" className="relative">
              Aprovados
              <Badge className="ml-1 h-5 rounded-full px-1.5 py-0 text-[10px]">
                {MOCK_TICKETS.filter((t) => t.status === "approved").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pendentes
              <Badge className="ml-1 h-5 rounded-full px-1.5 py-0 text-[10px]">
                {MOCK_TICKETS.filter((t) => t.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
            <TabsTrigger value="lgpd" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              LGPD
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Cliente</TableHead>
              <TableHead>Protocolo</TableHead>
              <TableHead>Fila</TableHead>
              <TableHead>Atendente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>LGPD</TableHead>
              <TableHead>Qualidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => {
              const statusInfo = getStatusInfo(ticket.status)

              return (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                        <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.protocol}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getQueueColor(ticket.queue)}`} />
                      <span className="capitalize">{ticket.queue}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={ticket.agent.avatar} alt={ticket.agent.name} />
                        <AvatarFallback>{ticket.agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.agent.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.closedAt}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${statusInfo.color}`}>
                      {statusInfo.icon}
                      <span>{statusInfo.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.hasLgpdConsent ? (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        <Shield className="mr-1 h-3 w-3" />
                        Consentimento
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Sem consentimento
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{ticket.qualityScore.toFixed(1)}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-xs ${
                              star <= Math.round(ticket.qualityScore) ? "text-yellow-500" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Ver conversa</DropdownMenuItem>
                        <DropdownMenuItem>Aprovar resolução</DropdownMenuItem>
                        <DropdownMenuItem>Rejeitar resolução</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Solicitar revisão</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Dialog para exportar relatório */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Relatório de Tickets</DialogTitle>
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
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit">Exportar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
