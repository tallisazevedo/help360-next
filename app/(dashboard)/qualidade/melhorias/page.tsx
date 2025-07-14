"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Lightbulb,
  Clock,
  ArrowUpDown,
  CheckCircle,
  ThumbsUp,
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

// Dados de exemplo para melhorias
const melhorias = [
  {
    id: 1,
    titulo: "Automatização do processo de atendimento",
    descricao: "Implementar chatbot para primeiro atendimento",
    categoria: "Processo",
    origem: "Colaborador",
    status: "Proposta",
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
    votos: 12,
    progresso: 30,
    beneficios: "Redução de tempo de atendimento, melhor experiência do cliente",
  },
  {
    id: 2,
    titulo: "Melhoria no sistema de feedback de clientes",
    descricao: "Implementar pesquisa de satisfação após cada atendimento",
    categoria: "Sistema",
    origem: "Análise de Dados",
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
    votos: 8,
    progresso: 50,
    beneficios: "Melhor compreensão da satisfação do cliente, identificação de pontos de melhoria",
  },
  {
    id: 3,
    titulo: "Programa de reconhecimento de colaboradores",
    descricao: "Sistema de pontos e recompensas para reconhecimento de desempenho",
    categoria: "Pessoas",
    origem: "RH",
    status: "Em implementação",
    prioridade: "media",
    responsavel: {
      nome: "Pedro Alves",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "PA",
    },
    departamento: "Recursos Humanos",
    dataRegistro: "20/05/2023",
    dataLimite: "20/07/2023",
    comentarios: 7,
    anexos: 3,
    votos: 25,
    progresso: 70,
    beneficios: "Aumento da motivação, redução de turnover, melhoria de clima organizacional",
  },
  {
    id: 4,
    titulo: "Otimização do fluxo de documentação",
    descricao: "Implementar assinatura digital e workflow automatizado",
    categoria: "Documentação",
    origem: "Auditoria Interna",
    status: "Em implementação",
    prioridade: "alta",
    responsavel: {
      nome: "Mariana Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "MS",
    },
    departamento: "Administrativo",
    dataRegistro: "25/05/2023",
    dataLimite: "25/06/2023",
    comentarios: 4,
    anexos: 1,
    votos: 15,
    progresso: 60,
    beneficios: "Redução de tempo de processamento, economia de papel, rastreabilidade",
  },
  {
    id: 5,
    titulo: "Implementação de metodologia ágil",
    descricao: "Adoção de Scrum para equipes de desenvolvimento",
    categoria: "Metodologia",
    origem: "Colaborador",
    status: "Concluída",
    prioridade: "concluido",
    responsavel: {
      nome: "Juliana Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "JM",
    },
    departamento: "Tecnologia",
    dataRegistro: "05/04/2023",
    dataLimite: "05/05/2023",
    comentarios: 8,
    anexos: 5,
    votos: 18,
    progresso: 100,
    beneficios: "Aumento de produtividade, melhor gestão de projetos, entregas mais rápidas",
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

export default function MelhoriasPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas")
  const [sortColumn, setSortColumn] = useState<string>("votos")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("todas")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filtrar melhorias
  const melhoriasFiltradas = melhorias.filter(
    (melhoria) =>
      (filtroStatus === "todos" || melhoria.status === filtroStatus) &&
      (filtroCategoria === "todas" || melhoria.categoria === filtroCategoria) &&
      (activeTab === "todas" ||
        (activeTab === "minhas" && melhoria.responsavel.nome === "Carlos Silva") ||
        (activeTab === "departamento" && melhoria.departamento === "Atendimento")) &&
      (melhoria.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        melhoria.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        melhoria.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        melhoria.origem.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Ordenar melhorias
  const melhoriasOrdenadas = [...melhoriasFiltradas].sort((a, b) => {
    if (sortColumn === "titulo") {
      return sortDirection === "asc" ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)
    } else if (sortColumn === "categoria") {
      return sortDirection === "asc" ? a.categoria.localeCompare(b.categoria) : b.categoria.localeCompare(a.categoria)
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
    } else if (sortColumn === "votos") {
      return sortDirection === "asc" ? a.votos - b.votos : b.votos - a.votos
    }
    return 0
  })

  // Estatísticas
  const stats = {
    total: melhorias.length,
    propostas: melhorias.filter((m) => m.status === "Proposta").length,
    emImplementacao: melhorias.filter((m) => m.status === "Em implementação").length,
    concluidas: melhorias.filter((m) => m.status === "Concluída").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Melhorias</h1>
        <Button onClick={() => router.push("/qualidade/melhorias/nova")} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Melhoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Melhorias"
          value={stats.total.toString()}
          icon={<Lightbulb className="h-5 w-5 text-primary" />}
          description="Todos os registros"
        />
        <StatsCard
          title="Propostas"
          value={stats.propostas.toString()}
          icon={<ThumbsUp className="h-5 w-5 text-blue-500" />}
          description="Em fase de avaliação"
          color="bg-blue-100"
        />
        <StatsCard
          title="Em Implementação"
          value={stats.emImplementacao.toString()}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          description="Melhorias em andamento"
          color="bg-amber-100"
        />
        <StatsCard
          title="Concluídas"
          value={stats.concluidas.toString()}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          description="Implementadas com sucesso"
          color="bg-green-100"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Gestão de Melhorias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="minhas">Minhas Melhorias</TabsTrigger>
              <TabsTrigger value="departamento">Meu Departamento</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar melhorias..."
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
                  <SelectItem value="Proposta">Proposta</SelectItem>
                  <SelectItem value="Em análise">Em análise</SelectItem>
                  <SelectItem value="Em implementação">Em implementação</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Categorias</SelectItem>
                  <SelectItem value="Processo">Processo</SelectItem>
                  <SelectItem value="Sistema">Sistema</SelectItem>
                  <SelectItem value="Pessoas">Pessoas</SelectItem>
                  <SelectItem value="Documentação">Documentação</SelectItem>
                  <SelectItem value="Metodologia">Metodologia</SelectItem>
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
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("categoria")}>
                    <div className="flex items-center gap-1">
                      Categoria
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
                  <TableHead className="cursor-pointer" onClick={() => handleSort("votos")}>
                    <div className="flex items-center gap-1">
                      Votos
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {melhoriasOrdenadas.map((melhoria) => (
                  <TableRow key={melhoria.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{melhoria.titulo}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{melhoria.descricao}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {melhoria.origem}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="bg-primary/5">
                        {melhoria.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {melhoria.status === "Proposta" && <Badge className="bg-blue-500">Proposta</Badge>}
                      {melhoria.status === "Em análise" && <Badge className="bg-purple-500">Em análise</Badge>}
                      {melhoria.status === "Em implementação" && (
                        <Badge className="bg-amber-500">Em implementação</Badge>
                      )}
                      {melhoria.status === "Concluída" && <Badge className="bg-green-500">Concluída</Badge>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={melhoria.responsavel.avatar} alt={melhoria.responsavel.nome} />
                          <AvatarFallback className="text-xs">{melhoria.responsavel.iniciais}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{melhoria.responsavel.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5 text-primary" />
                        <span className="font-medium">{melhoria.votos}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={melhoria.progresso} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{melhoria.progresso}%</span>
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
                          <DropdownMenuItem onClick={() => router.push(`/qualidade/melhorias/${melhoria.id}`)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Votar</DropdownMenuItem>
                          <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
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
