"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
  CheckCircle,
  FileText,
  Download,
  Eye,
  BarChart,
  PieChart,
  LineChart,
  FileCheck,
  Settings,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Dados de exemplo para documentos do SGI
const documentosSGI = [
  {
    id: 1,
    titulo: "Manual da Qualidade",
    codigo: "MQ-001",
    tipo: "Manual",
    versao: "2.3",
    dataRevisao: "10/01/2023",
    proximaRevisao: "10/01/2024",
    responsavel: {
      nome: "Juliana Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "JM",
    },
    status: "Vigente",
    acessos: 45,
    downloads: 12,
  },
  {
    id: 2,
    titulo: "Procedimento de Tratamento de Não Conformidades",
    codigo: "PO-QUA-001",
    tipo: "Procedimento",
    versao: "1.5",
    dataRevisao: "15/03/2023",
    proximaRevisao: "15/03/2024",
    responsavel: {
      nome: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "AC",
    },
    status: "Vigente",
    acessos: 78,
    downloads: 23,
  },
  {
    id: 3,
    titulo: "Instrução de Trabalho - Atendimento ao Cliente",
    codigo: "IT-ATE-002",
    tipo: "Instrução de Trabalho",
    versao: "3.1",
    dataRevisao: "05/05/2023",
    proximaRevisao: "05/05/2024",
    responsavel: {
      nome: "Carlos Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "CS",
    },
    status: "Vigente",
    acessos: 120,
    downloads: 45,
  },
  {
    id: 4,
    titulo: "Política de Segurança da Informação",
    codigo: "POL-SI-001",
    tipo: "Política",
    versao: "2.0",
    dataRevisao: "20/02/2023",
    proximaRevisao: "20/02/2024",
    responsavel: {
      nome: "Pedro Alves",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "PA",
    },
    status: "Em revisão",
    acessos: 56,
    downloads: 18,
  },
  {
    id: 5,
    titulo: "Formulário de Auditoria Interna",
    codigo: "FOR-AUD-003",
    tipo: "Formulário",
    versao: "1.2",
    dataRevisao: "12/04/2023",
    proximaRevisao: "12/04/2024",
    responsavel: {
      nome: "Mariana Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "MS",
    },
    status: "Vigente",
    acessos: 89,
    downloads: 34,
  },
]

// Dados de exemplo para indicadores
const indicadoresSGI = [
  {
    id: 1,
    nome: "Índice de Satisfação do Cliente",
    valor: 92,
    meta: 90,
    unidade: "%",
    tendencia: "crescente",
    periodo: "Maio/2023",
    responsavel: "Carlos Silva",
    categoria: "Clientes",
  },
  {
    id: 2,
    nome: "Tempo Médio de Atendimento",
    valor: 4.2,
    meta: 5,
    unidade: "minutos",
    tendencia: "decrescente",
    periodo: "Maio/2023",
    responsavel: "Ana Costa",
    categoria: "Processos",
  },
  {
    id: 3,
    nome: "Não Conformidades Abertas",
    valor: 8,
    meta: 5,
    unidade: "quantidade",
    tendencia: "decrescente",
    periodo: "Maio/2023",
    responsavel: "Juliana Mendes",
    categoria: "Qualidade",
  },
  {
    id: 4,
    nome: "Eficácia de Treinamentos",
    valor: 87,
    meta: 85,
    unidade: "%",
    tendencia: "crescente",
    periodo: "Maio/2023",
    responsavel: "Pedro Alves",
    categoria: "Pessoas",
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

// Componente para indicador
const IndicadorCard = ({ indicador }: { indicador: any }) => {
  const isPositive =
    (indicador.tendencia === "crescente" && indicador.valor >= indicador.meta) ||
    (indicador.tendencia === "decrescente" && indicador.valor <= indicador.meta)

  const percentageOfTarget =
    indicador.tendencia === "crescente"
      ? (indicador.valor / indicador.meta) * 100
      : (2 - indicador.valor / indicador.meta) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{indicador.nome}</CardTitle>
            <CardDescription>
              {indicador.categoria} • {indicador.periodo}
            </CardDescription>
          </div>
          {isPositive ? (
            <Badge className="bg-green-500">Meta atingida</Badge>
          ) : (
            <Badge className="bg-amber-500">Abaixo da meta</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-3xl font-bold">{indicador.valor}</span>
            <span className="text-sm ml-1">{indicador.unidade}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Meta: {indicador.meta} {indicador.unidade}
          </div>
        </div>
        <Progress value={Math.min(percentageOfTarget, 100)} className="h-2" />
      </CardContent>
      <CardFooter className="pt-2 text-sm text-muted-foreground">Responsável: {indicador.responsavel}</CardFooter>
    </Card>
  )
}

export default function SGIPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [sortColumn, setSortColumn] = useState<string>("dataRevisao")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("documentos")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filtrar documentos
  const documentosFiltrados = documentosSGI.filter(
    (doc) =>
      (filtroTipo === "todos" || doc.tipo === filtroTipo) &&
      (filtroStatus === "todos" || doc.status === filtroStatus) &&
      (doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tipo.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Ordenar documentos
  const documentosOrdenados = [...documentosFiltrados].sort((a, b) => {
    if (sortColumn === "titulo") {
      return sortDirection === "asc" ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)
    } else if (sortColumn === "codigo") {
      return sortDirection === "asc" ? a.codigo.localeCompare(b.codigo) : b.codigo.localeCompare(a.codigo)
    } else if (sortColumn === "tipo") {
      return sortDirection === "asc" ? a.tipo.localeCompare(b.tipo) : b.tipo.localeCompare(a.tipo)
    } else if (sortColumn === "versao") {
      return sortDirection === "asc" ? a.versao.localeCompare(b.versao) : b.versao.localeCompare(a.versao)
    } else if (sortColumn === "dataRevisao") {
      // Converter datas para comparação
      const dateA = new Date(a.dataRevisao.split("/").reverse().join("-"))
      const dateB = new Date(b.dataRevisao.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    } else if (sortColumn === "acessos") {
      return sortDirection === "asc" ? a.acessos - b.acessos : b.acessos - a.acessos
    }
    return 0
  })

  // Estatísticas
  const stats = {
    totalDocumentos: documentosSGI.length,
    documentosVigentes: documentosSGI.filter((d) => d.status === "Vigente").length,
    indicadoresMonitorados: indicadoresSGI.length,
    indicadoresAtingidos: indicadoresSGI.filter(
      (i) => (i.tendencia === "crescente" && i.valor >= i.meta) || (i.tendencia === "decrescente" && i.valor <= i.meta),
    ).length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sistema de Gestão Integrada (SGI)</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <BarChart className="h-4 w-4" />
            Relatórios
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Documento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Documentos"
          value={stats.totalDocumentos.toString()}
          icon={<FileText className="h-5 w-5 text-primary" />}
          description="Documentos do SGI"
        />
        <StatsCard
          title="Documentos Vigentes"
          value={stats.documentosVigentes.toString()}
          icon={<FileCheck className="h-5 w-5 text-green-500" />}
          description="Documentos ativos"
          color="bg-green-100"
        />
        <StatsCard
          title="Indicadores Monitorados"
          value={stats.indicadoresMonitorados.toString()}
          icon={<LineChart className="h-5 w-5 text-blue-500" />}
          description="Métricas de desempenho"
          color="bg-blue-100"
        />
        <StatsCard
          title="Metas Atingidas"
          value={stats.indicadoresAtingidos.toString()}
          icon={<CheckCircle className="h-5 w-5 text-amber-500" />}
          description="Indicadores com meta alcançada"
          color="bg-amber-100"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Sistema de Gestão Integrada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documentos" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
              <TabsTrigger value="auditorias">Auditorias</TabsTrigger>
              <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="documentos">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar documentos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Tipos</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Procedimento">Procedimento</SelectItem>
                      <SelectItem value="Instrução de Trabalho">Instrução de Trabalho</SelectItem>
                      <SelectItem value="Política">Política</SelectItem>
                      <SelectItem value="Formulário">Formulário</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="Vigente">Vigente</SelectItem>
                      <SelectItem value="Em revisão">Em revisão</SelectItem>
                      <SelectItem value="Obsoleto">Obsoleto</SelectItem>
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
                      <TableHead className="cursor-pointer" onClick={() => handleSort("codigo")}>
                        <div className="flex items-center gap-1">
                          Código
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("tipo")}>
                        <div className="flex items-center gap-1">
                          Tipo
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("versao")}>
                        <div className="flex items-center gap-1">
                          Versão
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hidden md:table-cell"
                        onClick={() => handleSort("dataRevisao")}
                      >
                        <div className="flex items-center gap-1">
                          Revisão
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("acessos")}>
                        <div className="flex items-center gap-1">
                          Acessos
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosOrdenados.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="font-medium">{doc.titulo}</div>
                        </TableCell>
                        <TableCell>{doc.codigo}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="bg-primary/5">
                            {doc.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.versao}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{doc.dataRevisao}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{doc.acessos}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Nova revisão</DropdownMenuItem>
                                <DropdownMenuItem>Histórico de versões</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Tornar obsoleto</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="indicadores">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar indicadores..." className="pl-8" />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <Select defaultValue="todas">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as Categorias</SelectItem>
                      <SelectItem value="Clientes">Clientes</SelectItem>
                      <SelectItem value="Processos">Processos</SelectItem>
                      <SelectItem value="Qualidade">Qualidade</SelectItem>
                      <SelectItem value="Pessoas">Pessoas</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="gap-2">
                    <PieChart className="h-4 w-4" />
                    Gráficos
                  </Button>

                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Indicador
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {indicadoresSGI.map((indicador) => (
                  <IndicadorCard key={indicador.id} indicador={indicador} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="auditorias">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Módulo de Auditorias</h3>
                  <p className="text-muted-foreground mt-2">
                    Este módulo está em desenvolvimento e estará disponível em breve.
                  </p>
                  <Button className="mt-4">Solicitar acesso antecipado</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuracoes">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Configurações do SGI</h3>
                  <p className="text-muted-foreground mt-2">
                    Este módulo está em desenvolvimento e estará disponível em breve.
                  </p>
                  <Button className="mt-4">Solicitar acesso antecipado</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
