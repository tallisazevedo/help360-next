"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ClipboardList,
  Calendar,
  Clock,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  Link2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Dados de exemplo para planos de ação
const planosAcao = [
  {
    id: 1,
    titulo: "Revisão do processo de atendimento",
    descricao: "Mapear e otimizar fluxo de atendimento ao cliente",
    tipo: "Corretiva",
    origem: {
      tipo: "Não Conformidade",
      id: 1,
      titulo: "Falha no processo de atendimento ao cliente",
    },
    status: "Em andamento",
    prioridade: "alta",
    responsavel: {
      nome: "Carlos Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "CS",
    },
    departamento: "Atendimento",
    dataInicio: "15/05/2023",
    dataLimite: "25/06/2023",
    comentarios: 3,
    anexos: 2,
    tarefas: {
      total: 5,
      concluidas: 2,
    },
    progresso: 40,
    eficacia: "Pendente",
  },
  {
    id: 2,
    titulo: "Atualização de documentação de procedimentos",
    descricao: "Revisar e atualizar manual de operação",
    tipo: "Corretiva",
    origem: {
      tipo: "Não Conformidade",
      id: 2,
      titulo: "Documentação de procedimento desatualizada",
    },
    status: "Em andamento",
    prioridade: "media",
    responsavel: {
      nome: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "AC",
    },
    departamento: "Qualidade",
    dataInicio: "20/05/2023",
    dataLimite: "15/06/2023",
    comentarios: 5,
    anexos: 1,
    tarefas: {
      total: 3,
      concluidas: 2,
    },
    progresso: 65,
    eficacia: "Pendente",
  },
  {
    id: 3,
    titulo: "Implementação de chatbot para atendimento",
    descricao: "Desenvolver e implementar chatbot para primeiro atendimento",
    tipo: "Melhoria",
    origem: {
      tipo: "Melhoria",
      id: 1,
      titulo: "Automatização do processo de atendimento",
    },
    status: "Em andamento",
    prioridade: "alta",
    responsavel: {
      nome: "Pedro Alves",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "PA",
    },
    departamento: "Tecnologia",
    dataInicio: "25/05/2023",
    dataLimite: "25/07/2023",
    comentarios: 7,
    anexos: 3,
    tarefas: {
      total: 8,
      concluidas: 5,
    },
    progresso: 60,
    eficacia: "Pendente",
  },
  {
    id: 4,
    titulo: "Treinamento em comunicação com cliente",
    descricao: "Capacitar equipe em técnicas de comunicação eficaz",
    tipo: "Corretiva",
    origem: {
      tipo: "Não Conformidade",
      id: 4,
      titulo: "Falha na comunicação com cliente",
    },
    status: "Não iniciado",
    prioridade: "media",
    responsavel: {
      nome: "Mariana Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "MS",
    },
    departamento: "Treinamento",
    dataInicio: "10/06/2023",
    dataLimite: "10/07/2023",
    comentarios: 2,
    anexos: 1,
    tarefas: {
      total: 4,
      concluidas: 0,
    },
    progresso: 0,
    eficacia: "Pendente",
  },
  {
    id: 5,
    titulo: "Implementação de requisitos ISO 9001",
    descricao: "Adequação ao item 8.5.1 da norma",
    tipo: "Corretiva",
    origem: {
      tipo: "Não Conformidade",
      id: 5,
      titulo: "Não conformidade em requisito ISO 9001",
    },
    status: "Concluído",
    prioridade: "concluido",
    responsavel: {
      nome: "Juliana Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "JM",
    },
    departamento: "Qualidade",
    dataInicio: "10/04/2023",
    dataLimite: "10/05/2023",
    comentarios: 8,
    anexos: 5,
    tarefas: {
      total: 6,
      concluidas: 6,
    },
    progresso: 100,
    eficacia: "Eficaz",
  },
]

// Componente para estatísticas
const StatsCard = ({
  title,
  value,
  icon,
  description,
  color,
}: { title: string; value: string; icon: React.ReactNode; description?: string; color?: string }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className={`p-3 rounded-full ${color || "bg-primary/10"}`}>{icon}</div>
      </div>
    </CardContent>
  </Card>
)

export default function PlanosAcaoPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [sortColumn, setSortColumn] = useState<string>("dataLimite")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [activeTab, setActiveTab] = useState("todos")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filtrar planos de ação
  const planosFiltrados = planosAcao.filter(
    (plano) =>
      (filtroStatus === "todos" || plano.status === filtroStatus) &&
      (filtroTipo === "todos" || plano.tipo === filtroTipo) &&
      (activeTab === "todos" ||
        (activeTab === "meus" && plano.responsavel.nome === "Carlos Silva") ||
        (activeTab === "departamento" && plano.departamento === "Atendimento")) &&
      (plano.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plano.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plano.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plano.origem.titulo.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Ordenar planos de ação
  const planosOrdenados = [...planosFiltrados].sort((a, b) => {
    if (sortColumn === "titulo") {
      return sortDirection === "asc" ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)
    } else if (sortColumn === "tipo") {
      return sortDirection === "asc" ? a.tipo.localeCompare(b.tipo) : b.tipo.localeCompare(a.tipo)
    } else if (sortColumn === "status") {
      return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    } else if (sortColumn === "responsavel") {
      return sortDirection === "asc"
        ? a.responsavel.nome.localeCompare(b.responsavel.nome)
        : b.responsavel.nome.localeCompare(a.responsavel.nome)
    } else if (sortColumn === "dataLimite") {
      // Converter datas para comparação
      const dateA = new Date(a.dataLimite.split("/").reverse().join("-"))
      const dateB = new Date(b.dataLimite.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    } else if (sortColumn === "progresso") {
      return sortDirection === "asc" ? a.progresso - b.progresso : b.progresso - a.progresso
    }
    return 0
  })

  // Estatísticas
  const stats = {
    total: planosAcao.length,
    naoIniciados: planosAcao.filter((p) => p.status === "Não iniciado").length,
    emAndamento: planosAcao.filter((p) => p.status === "Em andamento").length,
    concluidos: planosAcao.filter((p) => p.status === "Concluído").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Planos de Ação</h1>
        <Button onClick={() => router.push("/qualidade/planos-acao/novo")} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Plano de Ação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Planos"
          value={stats.total.toString()}
          icon={<ClipboardList className="h-5 w-5 text-primary" />}
          description="Todos os registros"
        />
        <StatsCard
          title="Não Iniciados"
          value={stats.naoIniciados.toString()}
          icon={<Clock className="h-5 w-5 text-blue-500" />}
          description="Aguardando início"
          color="bg-blue-100"
        />
        <StatsCard
          title="Em Andamento"
          value={stats.emAndamento.toString()}
          icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
          description="Planos em execução"
          color="bg-amber-100"
        />
        <StatsCard
          title="Concluídos"
          value={stats.concluidos.toString()}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          description="Finalizados e verificados"
          color="bg-green-100"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Gestão de Planos de Ação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="meus">Meus Planos</TabsTrigger>
              <TabsTrigger value="departamento">Meu Departamento</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar planos de ação..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Não iniciado">Não iniciado</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="Corretiva">Corretiva</SelectItem>
                  <SelectItem value="Preventiva">Preventiva</SelectItem>
                  <SelectItem value="Melhoria">Melhoria</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Mais Filtros
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("titulo")}>
                    <div className="flex items-center gap-1">
                      Título
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("tipo")}>
                    <div className="flex items-center gap-1">
                      Tipo
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("responsavel")}>
                    <div className="flex items-center gap-1">
                      Responsável
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("dataLimite")}>
                    <div className="flex items-center gap-1">
                      Prazo
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("progresso")}>
                    <div className="flex items-center gap-1">
                      Progresso
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planosOrdenados.map((plano) => (
                  <TableRow key={plano.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{plano.titulo}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{plano.descricao}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <Link2 className="h-3 w-3" />
                            {plano.origem.tipo === "Não Conformidade" ? (
                              <span className="flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" /> NC #{plano.origem.id}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Lightbulb className="h-3 w-3" /> Melhoria #{plano.origem.id}
                              </span>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="bg-primary/5">
                        {plano.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {plano.status === "Não iniciado" && <Badge className="bg-blue-500">Não iniciado</Badge>}
                      {plano.status === "Em andamento" && <Badge className="bg-amber-500">Em andamento</Badge>}
                      {plano.status === "Concluído" && <Badge className="bg-green-500">Concluído</Badge>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={plano.responsavel.avatar} alt={plano.responsavel.nome} />
                          <AvatarFallback className="text-xs">{plano.responsavel.iniciais}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{plano.responsavel.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{plano.dataLimite}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={plano.progresso} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{plano.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/qualidade/planos-acao/${plano.id}`)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Atualizar progresso</DropdownMenuItem>
                          <DropdownMenuItem>Adicionar tarefa</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancelar plano</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
