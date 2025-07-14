"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter, MoreHorizontal, Users, Clock, MessageSquare, BarChart3, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NovaFilaForm } from "./nova-fila-form"

// Dados de exemplo para filas
const filas = [
  {
    id: 1,
    nome: "Suporte Técnico",
    descricao: "Atendimento para problemas técnicos",
    canal: "WhatsApp",
    status: "ativo",
    agentes: 8,
    tempoMedioAtendimento: "5m 23s",
    atendimentosHoje: 42,
    filaEspera: 3,
    sla: 92,
  },
  {
    id: 2,
    nome: "Vendas",
    descricao: "Atendimento para novos clientes",
    canal: "Chat",
    status: "ativo",
    agentes: 5,
    tempoMedioAtendimento: "8m 12s",
    atendimentosHoje: 27,
    filaEspera: 1,
    sla: 88,
  },
  {
    id: 3,
    nome: "SAC",
    descricao: "Serviço de atendimento ao consumidor",
    canal: "Instagram",
    status: "ativo",
    agentes: 6,
    tempoMedioAtendimento: "4m 45s",
    atendimentosHoje: 35,
    filaEspera: 2,
    sla: 95,
  },
  {
    id: 4,
    nome: "Financeiro",
    descricao: "Atendimento para questões financeiras",
    canal: "Email",
    status: "inativo",
    agentes: 3,
    tempoMedioAtendimento: "12m 08s",
    atendimentosHoje: 18,
    filaEspera: 0,
    sla: 78,
  },
  {
    id: 5,
    nome: "Suporte Premium",
    descricao: "Atendimento prioritário para clientes premium",
    canal: "WhatsApp",
    status: "ativo",
    agentes: 4,
    tempoMedioAtendimento: "3m 17s",
    atendimentosHoje: 15,
    filaEspera: 0,
    sla: 98,
  },
]

// Dados de exemplo para estatísticas
const estatisticas = {
  totalAtendimentos: 137,
  tempoMedioGeral: "6m 42s",
  slaGeral: 90,
  atendimentosPorCanal: {
    WhatsApp: 57,
    Chat: 27,
    Instagram: 35,
    Email: 18,
  },
}

export default function FilasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNovaFilaDialog, setShowNovaFilaDialog] = useState(false)
  const [filteredFilas, setFilteredFilas] = useState(filas)
  const [activeTab, setActiveTab] = useState("todas")

  // Filtrar filas com base no termo de busca e na aba ativa
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    let filtered = filas

    if (term) {
      filtered = filas.filter(
        (fila) =>
          fila.nome.toLowerCase().includes(term.toLowerCase()) ||
          fila.descricao.toLowerCase().includes(term.toLowerCase()) ||
          fila.canal.toLowerCase().includes(term.toLowerCase()),
      )
    }

    if (activeTab !== "todas") {
      filtered = filtered.filter((fila) =>
        activeTab === "ativas" ? fila.status === "ativo" : fila.status === "inativo",
      )
    }

    setFilteredFilas(filtered)
  }

  // Alternar entre abas
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    let filtered = filas

    if (searchTerm) {
      filtered = filas.filter(
        (fila) =>
          fila.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fila.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fila.canal.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (value !== "todas") {
      filtered = filtered.filter((fila) => (value === "ativas" ? fila.status === "ativo" : fila.status === "inativo"))
    }

    setFilteredFilas(filtered)
  }

  // Renderizar ícone do canal
  const renderCanalIcon = (canal: string) => {
    switch (canal) {
      case "WhatsApp":
        return (
          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
            <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        )
      case "Chat":
        return (
          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        )
      case "Instagram":
        return (
          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
            <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
        )
      case "Email":
        return (
          <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full">
            <svg
              className="h-4 w-4 text-amber-600 dark:text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
        )
      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
            <MessageSquare className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Filas de Atendimento</h1>
          <p className="text-muted-foreground">Gerencie suas filas de atendimento e monitore o desempenho</p>
        </div>
        <Button onClick={() => setShowNovaFilaDialog(true)} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nova Fila
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Atendimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.totalAtendimentos}</div>
              <p className="text-xs text-muted-foreground">Hoje</p>
              <div className="mt-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">+12% em relação a ontem</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio de Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.tempoMedioGeral}</div>
              <p className="text-xs text-muted-foreground">Média geral</p>
              <div className="mt-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">-8% em relação a ontem</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">SLA Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.slaGeral}%</div>
              <p className="text-xs text-muted-foreground">Nível de serviço</p>
              <div className="mt-3">
                <Progress value={estatisticas.slaGeral} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(estatisticas.atendimentosPorCanal).map(([canal, quantidade], index) => (
                  <div key={canal} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {renderCanalIcon(canal)}
                      <span className="text-sm">{canal}</span>
                    </div>
                    <span className="text-sm font-medium">{quantidade}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Tabs defaultValue="todas" className="w-full" onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="todas">Todas as Filas</TabsTrigger>
              <TabsTrigger value="ativas">Ativas</TabsTrigger>
              <TabsTrigger value="inativas">Inativas</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar filas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Nome
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Canal</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Agentes
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Tempo Médio
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Atendimentos
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Em Espera
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        SLA
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredFilas.map((fila, index) => (
                    <motion.tr
                      key={fila.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <div>
                          <div className="font-medium">{fila.nome}</div>
                          <div className="text-xs text-muted-foreground">{fila.descricao}</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          {renderCanalIcon(fila.canal)}
                          <span>{fila.canal}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{fila.agentes}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{fila.tempoMedioAtendimento}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span>{fila.atendimentosHoje}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={fila.filaEspera > 0 ? "secondary" : "outline"}>{fila.filaEspera}</Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-full max-w-24">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs">{fila.sla}%</span>
                                </div>
                                <Progress
                                  value={fila.sla}
                                  className="h-1.5"
                                  indicatorClassName={
                                    fila.sla >= 90 ? "bg-green-500" : fila.sla >= 80 ? "bg-amber-500" : "bg-red-500"
                                  }
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Nível de serviço: {fila.sla}%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant={fila.status === "ativo" ? "default" : "secondary"}
                          className={fila.status === "ativo" ? "bg-green-500" : "bg-gray-500"}
                        >
                          {fila.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Editar fila</DropdownMenuItem>
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Gerenciar agentes</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className={fila.status === "ativo" ? "text-red-600" : "text-green-600"}>
                              {fila.status === "ativo" ? "Desativar fila" : "Ativar fila"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {filteredFilas.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Nenhuma fila encontrada</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Não encontramos nenhuma fila com os critérios de busca atuais. Tente ajustar os filtros ou criar uma
                    nova fila.
                  </p>
                  <Button className="mt-4" onClick={() => setShowNovaFilaDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Fila
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showNovaFilaDialog} onOpenChange={setShowNovaFilaDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Fila de Atendimento</DialogTitle>
            <DialogDescription>
              Crie uma nova fila de atendimento para gerenciar seus canais de comunicação.
            </DialogDescription>
          </DialogHeader>
          <NovaFilaForm onSuccess={() => setShowNovaFilaDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
