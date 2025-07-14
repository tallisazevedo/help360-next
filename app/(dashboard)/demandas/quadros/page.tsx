"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreHorizontal, Kanban, LayoutGrid, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para os quadros
const quadros = [
  {
    id: 1,
    nome: "Comercial - Leads",
    descricao: "Gerenciamento de leads e oportunidades comerciais",
    areaTrabalho: "Comercial",
    setor: "Vendas",
    demandas: 12,
    membros: 5,
    ultimaAtualizacao: "2h atrás",
    cor: "bg-blue-500",
  },
  {
    id: 2,
    nome: "Jurídico - Contratos",
    descricao: "Elaboração e revisão de contratos",
    areaTrabalho: "Jurídico",
    setor: "Legal",
    demandas: 8,
    membros: 3,
    ultimaAtualizacao: "1d atrás",
    cor: "bg-purple-500",
  },
  {
    id: 3,
    nome: "Suporte - Tickets Prioritários",
    descricao: "Acompanhamento de tickets com prioridade alta",
    areaTrabalho: "Suporte",
    setor: "Atendimento",
    demandas: 15,
    membros: 7,
    ultimaAtualizacao: "30min atrás",
    cor: "bg-green-500",
  },
  {
    id: 4,
    nome: "Desenvolvimento - Sprint Atual",
    descricao: "Tarefas da sprint em andamento",
    areaTrabalho: "Tecnologia",
    setor: "Desenvolvimento",
    demandas: 24,
    membros: 8,
    ultimaAtualizacao: "5h atrás",
    cor: "bg-amber-500",
  },
  {
    id: 5,
    nome: "Marketing - Campanhas Q2",
    descricao: "Planejamento de campanhas para o segundo trimestre",
    areaTrabalho: "Marketing",
    setor: "Digital",
    demandas: 9,
    membros: 4,
    ultimaAtualizacao: "3d atrás",
    cor: "bg-red-500",
  },
  {
    id: 6,
    nome: "RH - Recrutamento",
    descricao: "Processos seletivos em andamento",
    areaTrabalho: "Recursos Humanos",
    setor: "Recrutamento",
    demandas: 6,
    membros: 2,
    ultimaAtualizacao: "12h atrás",
    cor: "bg-indigo-500",
  },
]

export default function QuadrosPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtroArea, setFiltroArea] = useState<string>("todas")

  const quadrosFiltrados = quadros.filter(
    (quadro) =>
      (filtroArea === "todas" || quadro.areaTrabalho === filtroArea) &&
      (quadro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quadro.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quadro.areaTrabalho.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quadro.setor.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleQuadroClick = (id: number) => {
    router.push(`/demandas/quadros/${id}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Quadros de Demandas</h1>
        <Button onClick={() => {}} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Quadro
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar quadros..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Select value={filtroArea} onValueChange={setFiltroArea}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Área de Trabalho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Áreas</SelectItem>
              <SelectItem value="Comercial">Comercial</SelectItem>
              <SelectItem value="Jurídico">Jurídico</SelectItem>
              <SelectItem value="Suporte">Suporte</SelectItem>
              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <Kanban className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quadrosFiltrados.map((quadro) => (
            <motion.div
              key={quadro.id}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => handleQuadroClick(quadro.id)}
              className="cursor-pointer"
            >
              <Card className="h-full flex flex-col overflow-hidden border-t-4" style={{ borderTopColor: quadro.cor }}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{quadro.nome}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Editar quadro</DropdownMenuItem>
                        <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Arquivar quadro</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{quadro.descricao}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="bg-primary/5">
                        {quadro.areaTrabalho}
                      </Badge>
                      <Badge variant="outline" className="bg-secondary/5">
                        {quadro.setor}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Kanban className="h-4 w-4" />
                    <span>{quadro.demandas} demandas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{quadro.ultimaAtualizacao}</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium">Nome</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Área de Trabalho</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Setor</th>
                <th className="text-left p-3 font-medium">Demandas</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Última Atualização</th>
                <th className="text-right p-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {quadrosFiltrados.map((quadro) => (
                <tr
                  key={quadro.id}
                  className="border-t hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleQuadroClick(quadro.id)}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: quadro.cor }}></div>
                      <span className="font-medium">{quadro.nome}</span>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">{quadro.areaTrabalho}</td>
                  <td className="p-3 hidden md:table-cell">{quadro.setor}</td>
                  <td className="p-3">{quadro.demandas} demandas</td>
                  <td className="p-3 hidden md:table-cell">{quadro.ultimaAtualizacao}</td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Editar quadro</DropdownMenuItem>
                        <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Arquivar quadro</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
