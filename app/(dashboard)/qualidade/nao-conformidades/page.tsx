"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  FileText,
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

// Dados de exemplo para não conformidades
const naoConformidades = [
  {
    id: 1,
    titulo: "Falha no processo de atendimento ao cliente",
    descricao: "Tempo de resposta acima do SLA estabelecido",
    tipo: "Processo",
    origem: "Auditoria Interna",
    status: "Aberta",
    prioridade: "alta",
    responsavel: {
      nome: "Carlos Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "CS",
    },
    departamento: "Atendimento",
    dataRegistro: "10/05/2023",
    dataLimite: "25/06/2023",
    comentarios: 3,
    anexos: 2,
    planosAcao: 2,
    progresso: 30,
  },
  {
    id: 2,
    titulo: "Documentação de procedimento desatualizada",
    descricao: "Manual de operação não reflete o processo atual",
    tipo: "Documentação",
    origem: "Auditoria Externa",
    status: "Em análise",
    prioridade: "media",
    responsavel: {
      nome: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "AC",
    },
    departamento: "Qualidade",
    dataRegistro: "15/05/2023",
    dataLimite: "15/06/2023",
    comentarios: 5,
    anexos: 1,
    planosAcao: 1,
    progresso: 50,
  },
  {
    id: 3,
    titulo: "Não conformidade em equipamento de medição",
    descricao: "Calibração fora do prazo estabelecido",
    tipo: "Equipamento",
    origem: "Inspeção Interna",
    status: "Em tratamento",
    prioridade: "alta",
    responsavel: {
      nome: "Pedro Alves",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "PA",
    },
    departamento: "Operações",
    dataRegistro: "20/05/2023",
    dataLimite: "20/06/2023",
    comentarios: 2,
    anexos: 3,
    planosAcao: 3,
    progresso: 70,
  },
  {
    id: 4,
    titulo: "Falha na comunicação com cliente",
    descricao: "Informações incorretas fornecidas ao cliente",
    tipo: "Comunicação",
    origem: "Reclamação de Cliente",
    status: "Em tratamento",
    prioridade: "media",
    responsavel: {
      nome: "Mariana Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "MS",
    },
    departamento: "Comercial",
    dataRegistro: "25/05/2023",
    dataLimite: "25/06/2023",
    comentarios: 4,
    anexos: 1,
    planosAcao: 2,
    progresso: 60,
  },
  {
    id: 5,
    titulo: "Não conformidade em requisito ISO 9001",
    descricao: "Item 8.5.1 não atendido completamente",
    tipo: "Normativo",
    origem: "Auditoria Externa",
    status: "Concluída",
    prioridade: "concluido",
    responsavel: {
      nome: "Juliana Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "JM",
    },
    departamento: "Qualidade",
    dataRegistro: "05/04/2023",
    dataLimite: "05/05/2023",
    comentarios: 8,
    anexos: 5,
    planosAcao: 4,
    progresso: 100,
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

export default function NaoConformidadesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todas")
  const [sortColumn, setSortColumn] = useState<string>("dataLimite")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [activeTab, setActiveTab] = useState("todas")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filtrar não conformidades
  const ncFiltradas = naoConformidades.filter(
    (nc) =>
      (filtroStatus === "todos" || nc.status === filtroStatus) &&
      (filtroPrioridade === "todas" || nc.prioridade === filtroPrioridade) &&
      (activeTab === "todas" ||
        (activeTab === "minhas" && nc.responsavel.nome === "Carlos Silva") ||
        (activeTab === "departamento" && nc.departamento === "Atendimento")) &&
      (nc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nc.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nc.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nc.origem.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Ordenar não conformidades
  const ncOrdenadas = [...ncFiltradas].sort((a, b) => {
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
    } else if (sortColumn === "prioridade") {
      const prioridadeOrdem = { alta: 3, media: 2, baixa: 1, concluido: 0 }
      // @ts-ignore
      return sortDirection === "asc"
        ? prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade]
        : prioridadeOrdem[b.prioridade] - prioridadeOrdem[a.prioridade]
    }
    return 0
  })

  // Estatísticas
  const stats = {
    total: naoConformidades.length,
    abertas: naoConformidades.filter((nc) => nc.status === "Aberta").length,
    emTratamento: naoConformidades.filter((nc) => nc.status === "Em tratamento").length,
    concluidas: naoConformidades.filter((nc) => nc.status === "Concluída").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Não Conformidades</h1>
        <Button onClick={() => router.push("/qualidade/nao-conformidades/nova")} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Não Conformidade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Não Conformidades"
          value={stats.total.toString()}
          icon={<AlertTriangle className="h-5 w-5 text-primary" />}
          description="Todos os registros"
        />
        <StatsCard
          title="Não Conformidades Abertas"
          value={stats.abertas.toString()}
          icon={<AlertCircle className="h-5 w-5 text-red-500" />}
          description="Aguardando análise"
          color="bg-red-100"
        />
        <StatsCard
          title="Em Tratamento"
          value={stats.emTratamento.toString()}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          description="Com planos de ação em andamento"
          color="bg-amber-100"
        />
        <StatsCard
          title="Concluídas"
          value={stats.concluidas.toString()}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          description="Verificadas e encerradas"
          color="bg-green-100"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Gestão de Não Conformidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="minhas">Minhas NC's</TabsTrigger>
              <TabsTrigger value="departamento">Meu Departamento</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar não conformidades..."
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
                  <SelectItem value="Aberta">Aberta</SelectItem>
                  <SelectItem value="Em análise">Em análise</SelectItem>
                  <SelectItem value="Em tratamento">Em tratamento</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Prioridades</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
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
                      Data Limite
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("prioridade")}>
                    <div className="flex items-center gap-1">
                      Prioridade
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ncOrdenadas.map((nc) => (
                  <TableRow key={nc.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{nc.titulo}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{nc.descricao}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {nc.origem}
                          </Badge>
                          {nc.planosAcao > 0 && (
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {nc.planosAcao} plano(s)
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="bg-primary/5">
                        {nc.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {nc.status === "Aberta" && <Badge className="bg-red-500">Aberta</Badge>}
                      {nc.status === "Em análise" && <Badge className="bg-blue-500">Em análise</Badge>}
                      {nc.status === "Em tratamento" && <Badge className="bg-amber-500">Em tratamento</Badge>}
                      {nc.status === "Concluída" && <Badge className="bg-green-500">Concluída</Badge>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={nc.responsavel.avatar} alt={nc.responsavel.nome} />
                          <AvatarFallback className="text-xs">{nc.responsavel.iniciais}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{nc.responsavel.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{nc.dataLimite}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {nc.prioridade === "alta" && <Badge className="bg-red-500">Alta</Badge>}
                      {nc.prioridade === "media" && <Badge className="bg-amber-500">Média</Badge>}
                      {nc.prioridade === "baixa" && <Badge className="bg-blue-500">Baixa</Badge>}
                      {nc.prioridade === "concluido" && <Badge className="bg-green-500">Concluída</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={nc.progresso} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{nc.progresso}%</span>
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
                          <DropdownMenuItem onClick={() => router.push(`/qualidade/nao-conformidades/${nc.id}`)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Adicionar plano de ação</DropdownMenuItem>
                          <DropdownMenuItem>Atribuir responsável</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Encerrar</DropdownMenuItem>
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
