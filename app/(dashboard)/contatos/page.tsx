"use client"

import { useState } from "react"
import { PlusCircle, Search, Filter, MoreHorizontal, User, Building2, ArrowUpDown } from "lucide-react"
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
import { ContatoForm } from "./contato-form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Dados de exemplo
const contatos = [
  {
    id: 1,
    nome: "João Silva",
    cargo: "Diretor de TI",
    email: "joao.silva@empresaabc.com",
    telefone: "(11) 98765-4321",
    empresas: [{ id: 1, nome: "Empresa ABC Ltda" }],
    ultimoContato: "2023-03-15",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    cargo: "Gerente de Compras",
    email: "maria.oliveira@industriasxyz.com",
    telefone: "(21) 97654-3210",
    empresas: [{ id: 2, nome: "Indústrias XYZ S.A." }],
    ultimoContato: "2023-03-20",
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    cargo: "CEO",
    email: "carlos.pereira@comerciorapido.com",
    telefone: "(31) 96543-2109",
    empresas: [{ id: 3, nome: "Comércio Rápido ME" }],
    ultimoContato: "2023-03-10",
  },
  {
    id: 4,
    nome: "Ana Santos",
    cargo: "Diretora Financeira",
    email: "ana.santos@consultoria.com",
    telefone: "(61) 95432-1098",
    empresas: [
      { id: 4, nome: "Consultoria Estratégica" },
      { id: 1, nome: "Empresa ABC Ltda" },
    ],
    ultimoContato: "2023-03-25",
  },
  {
    id: 5,
    nome: "Roberto Lima",
    cargo: "Gerente de Logística",
    email: "roberto.lima@distribuidora.com",
    telefone: "(41) 94321-0987",
    empresas: [
      { id: 5, nome: "Distribuidora Nacional" },
      { id: 2, nome: "Indústrias XYZ S.A." },
      { id: 3, nome: "Comércio Rápido ME" },
    ],
    ultimoContato: "2023-03-18",
  },
]

export default function ContatosPage() {
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

  const filteredContatos = contatos.filter(
    (contato) =>
      contato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contato.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contato.empresas.some((empresa) => empresa.nome.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedContatos = [...filteredContatos].sort((a, b) => {
    if (sortColumn === "empresas") {
      return sortDirection === "asc" ? a.empresas.length - b.empresas.length : b.empresas.length - a.empresas.length
    }

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

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contatos</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Contato
        </Button>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos os Contatos</TabsTrigger>
          <TabsTrigger value="recentes">Contatos Recentes</TabsTrigger>
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Gerenciamento de Contatos
                </div>
                <Badge variant="outline" className="ml-2">
                  {contatos.length} contatos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contatos..."
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
                      <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("nome")}>
                        <div className="flex items-center gap-1">
                          Nome
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("cargo")}>
                        <div className="flex items-center gap-1">
                          Cargo
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("empresas")}>
                        <div className="flex items-center gap-1">
                          Empresas
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("ultimoContato")}>
                        <div className="flex items-center gap-1">
                          Último Contato
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedContatos.map((contato) => (
                      <TableRow key={contato.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(contato.nome)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{contato.nome}</div>
                          </div>
                        </TableCell>
                        <TableCell>{contato.cargo}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{contato.email}</div>
                            <div className="text-sm text-muted-foreground">{contato.telefone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contato.empresas.map((empresa) => (
                              <Badge key={empresa.id} variant="outline" className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {empresa.nome}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(contato.ultimoContato).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem>Editar contato</DropdownMenuItem>
                              <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Remover contato</DropdownMenuItem>
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

        <TabsContent value="recentes">
          <Card>
            <CardContent className="pt-6">
              <p>Exibindo apenas contatos recentes.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favoritos">
          <Card>
            <CardContent className="pt-6">
              <p>Exibindo apenas contatos favoritos.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showForm && <ContatoForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
