"use client"

import { useState } from "react"
import { PlusCircle, Search, Filter, MoreHorizontal, Building2, Users, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClienteForm } from "./cliente-form"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Dados de exemplo
const clientes = [
  {
    id: 1,
    nome: "Empresa ABC Ltda",
    segmento: "Tecnologia",
    cidade: "São Paulo",
    estado: "SP",
    contatos: 12,
    status: "Ativo",
    pontuacao: 85,
  },
  {
    id: 2,
    nome: "Indústrias XYZ S.A.",
    segmento: "Manufatura",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    contatos: 8,
    status: "Ativo",
    pontuacao: 72,
  },
  {
    id: 3,
    nome: "Comércio Rápido ME",
    segmento: "Varejo",
    cidade: "Belo Horizonte",
    estado: "MG",
    contatos: 5,
    status: "Inativo",
    pontuacao: 45,
  },
  {
    id: 4,
    nome: "Consultoria Estratégica",
    segmento: "Serviços",
    cidade: "Brasília",
    estado: "DF",
    contatos: 15,
    status: "Ativo",
    pontuacao: 93,
  },
  {
    id: 5,
    nome: "Distribuidora Nacional",
    segmento: "Logística",
    cidade: "Curitiba",
    estado: "PR",
    contatos: 7,
    status: "Ativo",
    pontuacao: 68,
  },
]

export default function ClientesPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("nome")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.segmento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedClientes = [...filteredClientes].sort((a, b) => {
    // @ts-ignore
    const aValue = a[sortColumn]
    // @ts-ignore
    const bValue = b[sortColumn]

    if (typeof aValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    } else {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos os Clientes</TabsTrigger>
          <TabsTrigger value="ativos">Ativos</TabsTrigger>
          <TabsTrigger value="inativos">Inativos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Gerenciamento de Clientes
                </div>
                <Badge variant="outline" className="ml-2">
                  {clientes.length} clientes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar clientes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px] cursor-pointer" onClick={() => handleSort("nome")}>
                        <div className="flex items-center gap-1">
                          Nome
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("segmento")}>
                        <div className="flex items-center gap-1">
                          Segmento
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("contatos")}>
                        <div className="flex items-center gap-1">
                          Contatos
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                        <div className="flex items-center gap-1">
                          Status
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("pontuacao")}>
                        <div className="flex items-center gap-1">
                          Pontuação
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedClientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell className="font-medium">{cliente.nome}</TableCell>
                        <TableCell>{cliente.segmento}</TableCell>
                        <TableCell>
                          {cliente.cidade}, {cliente.estado}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {cliente.contatos}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={cliente.status === "Ativo" ? "default" : "secondary"}>{cliente.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="w-24">
                                  <Progress value={cliente.pontuacao} className="h-2" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Pontuação: {cliente.pontuacao}/100</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                              <DropdownMenuItem>Gerenciar contatos</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Desativar cliente</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="ativos">
          <Card>
            <CardContent className="pt-6">
              <p>Exibindo apenas clientes ativos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inativos">
          <Card>
            <CardContent className="pt-6">
              <p>Exibindo apenas clientes inativos.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showForm && <ClienteForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
