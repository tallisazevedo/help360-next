"use client"

import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal, Calendar, ArrowUpDown, CheckCircle, LinkIcon } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados de exemplo para as demandas
const demandas = [
  {
    id: 1,
    titulo: "Empresa ABC Ltda",
    descricao: "Interessados em implementar Help360 para equipe de 50 pessoas",
    quadro: "Comercial - Leads",
    coluna: "Lead",
    etiquetas: ["Novo Cliente", "Prioridade Alta"],
    responsavel: {
      nome: "Carlos Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "CS",
    },
    dataLimite: "15/06/2023",
    comentarios: 3,
    anexos: 2,
    ticketsVinculados: 1,
    prioridade: "alta",
    corColuna: "bg-blue-500",
  },
  {
    id: 2,
    titulo: "Indústrias XYZ S.A.",
    descricao: "Solicitou demonstração da plataforma",
    quadro: "Comercial - Leads",
    coluna: "Lead",
    etiquetas: ["Demonstração"],
    responsavel: {
      nome: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "AC",
    },
    dataLimite: "18/06/2023",
    comentarios: 1,
    anexos: 0,
    ticketsVinculados: 0,
    prioridade: "media",
    corColuna: "bg-blue-500",
  },
  {
    id: 3,
    titulo: "Consultoria Estratégica",
    descricao: "Reunião inicial realizada, aguardando feedback",
    quadro: "Comercial - Leads",
    coluna: "Primeiro Contato",
    etiquetas: ["Follow-up"],
    responsavel: {
      nome: "Pedro Alves",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "PA",
    },
    dataLimite: "20/06/2023",
    comentarios: 5,
    anexos: 1,
    ticketsVinculados: 2,
    prioridade: "media",
    corColuna: "bg-purple-500",
  },
  {
    id: 4,
    titulo: "Distribuidora Nacional",
    descricao: "Reunião de apresentação da proposta agendada",
    quadro: "Comercial - Leads",
    coluna: "Reunião",
    etiquetas: ["Proposta", "Reunião"],
    responsavel: {
      nome: "Mariana Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "MS",
    },
    dataLimite: "22/06/2023",
    comentarios: 2,
    anexos: 3,
    ticketsVinculados: 0,
    prioridade: "alta",
    corColuna: "bg-amber-500",
  },
  {
    id: 5,
    titulo: "Comércio Rápido ME",
    descricao: "Cliente solicitou reunião para discutir valores",
    quadro: "Comercial - Leads",
    coluna: "Reunião",
    etiquetas: ["Negociação"],
    responsavel: {
      nome: "Carlos Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "CS",
    },
    dataLimite: "25/06/2023",
    comentarios: 4,
    anexos: 1,
    ticketsVinculados: 1,
    prioridade: "baixa",
    corColuna: "bg-amber-500",
  },
  {
    id: 6,
    titulo: "Tech Solutions Inc.",
    descricao: "Contrato assinado, encaminhado para jurídico",
    quadro: "Comercial - Leads",
    coluna: "Fechado",
    etiquetas: ["Contrato", "Novo Cliente"],
    responsavel: {
      nome: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "AC",
    },
    dataLimite: "Concluído",
    comentarios: 8,
    anexos: 5,
    ticketsVinculados: 3,
    prioridade: "concluido",
    corColuna: "bg-green-500",
  },
  {
    id: 7,
    titulo: "Revisão de Contrato - ABC Ltda",
    descricao: "Análise e revisão do contrato para novo cliente",
    quadro: "Jurídico - Contratos",
    coluna: "Em Análise",
    etiquetas: ["Contrato", "Revisão"],
    responsavel: {
      nome: "Juliana Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "JM",
    },
    dataLimite: "28/06/2023",
    comentarios: 2,
    anexos: 3,
    ticketsVinculados: 1,
    prioridade: "alta",
    corColuna: "bg-purple-500",
  },
]

export default function TodasDemandasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroQuadro, setFiltroQuadro] = useState<string>("todos")
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todas")
  const [sortColumn, setSortColumn] = useState<string>("dataLimite")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filtrar demandas
  const demandasFiltradas = demandas.filter(
    (demanda) =>
      (filtroQuadro === "todos" || demanda.quadro === filtroQuadro) &&
      (filtroPrioridade === "todas" || demanda.prioridade === filtroPrioridade) &&
      (demanda.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demanda.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demanda.etiquetas.some((etiqueta) => etiqueta.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  // Ordenar demandas
  const demandasOrdenadas = [...demandasFiltradas].sort((a, b) => {
    if (sortColumn === "titulo") {
      return sortDirection === "asc" ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)
    } else if (sortColumn === "quadro") {
      return sortDirection === "asc" ? a.quadro.localeCompare(b.quadro) : b.quadro.localeCompare(a.quadro)
    } else if (sortColumn === "coluna") {
      return sortDirection === "asc" ? a.coluna.localeCompare(b.coluna) : b.coluna.localeCompare(a.coluna)
    } else if (sortColumn === "responsavel") {
      return sortDirection === "asc"
        ? a.responsavel.nome.localeCompare(b.responsavel.nome)
        : b.responsavel.nome.localeCompare(a.responsavel.nome)
    } else if (sortColumn === "dataLimite") {
      // Tratamento especial para "Concluído"
      if (a.dataLimite === "Concluído" && b.dataLimite !== "Concluído") {
        return sortDirection === "asc" ? 1 : -1
      } else if (a.dataLimite !== "Concluído" && b.dataLimite === "Concluído") {
        return sortDirection === "asc" ? -1 : 1
      } else if (a.dataLimite === "Concluído" && b.dataLimite === "Concluído") {
        return 0
      } else {
        // Converter datas para comparação
        const dateA = new Date(a.dataLimite.split("/").reverse().join("-"))
        const dateB = new Date(b.dataLimite.split("/").reverse().join("-"))
        return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      }
    } else if (sortColumn === "prioridade") {
      const prioridadeOrdem = { alta: 3, media: 2, baixa: 1, concluido: 0 }
      // @ts-ignore
      return sortDirection === "asc"
        ? prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade]
        : prioridadeOrdem[b.prioridade] - prioridadeOrdem[a.prioridade]
    }
    return 0
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Todas as Demandas</h1>
        <Button onClick={() => {}} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Demanda
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Gerenciamento de Demandas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar demandas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Select value={filtroQuadro} onValueChange={setFiltroQuadro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Quadro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Quadros</SelectItem>
                  <SelectItem value="Comercial - Leads">Comercial - Leads</SelectItem>
                  <SelectItem value="Jurídico - Contratos">Jurídico - Contratos</SelectItem>
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
                  <SelectItem value="concluido">Concluído</SelectItem>
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
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("quadro")}>
                    <div className="flex items-center gap-1">
                      Quadro
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("coluna")}>
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
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demandasOrdenadas.map((demanda) => (
                  <TableRow key={demanda.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{demanda.titulo}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{demanda.descricao}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {demanda.etiquetas.map((etiqueta, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {etiqueta}
                            </Badge>
                          ))}
                          {demanda.ticketsVinculados > 0 && (
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <LinkIcon className="h-3 w-3" />
                              {demanda.ticketsVinculados}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{demanda.quadro}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${demanda.corColuna.replace("bg-", "bg-")}/20 text-${demanda.corColuna.replace("bg-", "")}-700 border-${demanda.corColuna.replace("bg-", "")}-200`}
                      >
                        {demanda.coluna}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={demanda.responsavel.avatar} alt={demanda.responsavel.nome} />
                          <AvatarFallback className="text-xs">{demanda.responsavel.iniciais}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{demanda.responsavel.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{demanda.dataLimite}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {demanda.prioridade === "alta" && <Badge className="bg-red-500">Alta</Badge>}
                      {demanda.prioridade === "media" && <Badge className="bg-amber-500">Média</Badge>}
                      {demanda.prioridade === "baixa" && <Badge className="bg-blue-500">Baixa</Badge>}
                      {demanda.prioridade === "concluido" && <Badge className="bg-green-500">Concluído</Badge>}
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
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar demanda</DropdownMenuItem>
                          <DropdownMenuItem>Vincular ticket</DropdownMenuItem>
                          <DropdownMenuItem>Mover para...</DropdownMenuItem>
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
