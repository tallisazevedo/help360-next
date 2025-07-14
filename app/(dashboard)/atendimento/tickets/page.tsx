import type { Metadata } from "next"
import { MoreVertical, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Tickets de Atendimento | Help360",
  description: "Tickets de atendimento ao cliente Help360",
}

// Dados simulados para tickets
const tickets = [
  {
    id: "TICK-001",
    client: "Empresa ABC",
    subject: "Problema de acesso ao sistema",
    status: "open",
    priority: "high",
    assignee: "Carlos Santos",
    created: "15/05/2023 10:30",
    updated: "15/05/2023 14:45",
  },
  {
    id: "TICK-002",
    client: "Empresa XYZ",
    subject: "Dúvidas sobre faturamento",
    status: "in-progress",
    priority: "medium",
    assignee: "Ana Lima",
    created: "14/05/2023 09:15",
    updated: "15/05/2023 11:20",
  },
  {
    id: "TICK-003",
    client: "Empresa 123",
    subject: "Solicitação de novo recurso",
    status: "pending",
    priority: "low",
    assignee: "Roberto Silva",
    created: "13/05/2023 14:00",
    updated: "14/05/2023 16:30",
  },
  {
    id: "TICK-004",
    client: "Empresa DEF",
    subject: "Erro ao gerar relatório",
    status: "resolved",
    priority: "high",
    assignee: "Mariana Oliveira",
    created: "12/05/2023 11:45",
    updated: "13/05/2023 10:15",
  },
  {
    id: "TICK-005",
    client: "Empresa GHI",
    subject: "Problema de integração",
    status: "closed",
    priority: "medium",
    assignee: "João Pereira",
    created: "11/05/2023 16:20",
    updated: "12/05/2023 09:30",
  },
  {
    id: "TICK-006",
    client: "Empresa JKL",
    subject: "Lentidão no sistema",
    status: "open",
    priority: "high",
    assignee: "Carlos Santos",
    created: "15/05/2023 08:45",
    updated: "15/05/2023 13:10",
  },
  {
    id: "TICK-007",
    client: "Empresa MNO",
    subject: "Configuração de usuários",
    status: "in-progress",
    priority: "medium",
    assignee: "Ana Lima",
    created: "14/05/2023 13:30",
    updated: "15/05/2023 10:45",
  },
  {
    id: "TICK-008",
    client: "Empresa PQR",
    subject: "Atualização de sistema",
    status: "closed",
    priority: "low",
    assignee: "Roberto Silva",
    created: "10/05/2023 09:00",
    updated: "11/05/2023 14:20",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return <Badge variant="destructive">Aberto</Badge>
    case "in-progress":
      return <Badge>Em Andamento</Badge>
    case "pending":
      return <Badge variant="secondary">Pendente</Badge>
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Resolvido
        </Badge>
      )
    case "closed":
      return <Badge variant="outline">Fechado</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">Alta</Badge>
    case "medium":
      return <Badge variant="secondary">Média</Badge>
    case "low":
      return <Badge variant="outline">Baixa</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

export default function TicketsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Tickets de Atendimento</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="all-status">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Todos os status</SelectItem>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="in-progress">Em Andamento</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="resolved">Resolvido</SelectItem>
                <SelectItem value="closed">Fechado</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-priority">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-priority">Todas as prioridades</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Buscar ticket..." className="w-[250px]" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>Novo Ticket</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Atualizado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.client}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{ticket.assignee}</TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>{ticket.updated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`/atendimento/tickets/${ticket.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
