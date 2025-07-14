"use client"

import { useState } from "react"
import { BarChart, Download, Edit, LineChart, PieChart, Plus, Search, Settings, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Exemplo de indicadores de desempenho
const indicatorsExample = [
  {
    id: "ind-1",
    name: "Índice de Não Conformidades",
    code: "INC-001",
    type: "Qualidade",
    frequency: "Mensal",
    target: "< 5",
    unit: "unidades",
    responsible: "Gerente de Qualidade",
    process: "Gestão de Não Conformidades",
    description: "Número total de não conformidades registradas no período",
    status: "Dentro da Meta",
    trend: "Estável",
    lastValue: "3",
    lastUpdate: "30/04/2023",
  },
  {
    id: "ind-2",
    name: "Tempo Médio de Tratamento de NC",
    code: "INC-002",
    type: "Qualidade",
    frequency: "Mensal",
    target: "< 15",
    unit: "dias",
    responsible: "Gerente de Qualidade",
    process: "Gestão de Não Conformidades",
    description: "Tempo médio para tratamento completo de não conformidades",
    status: "Dentro da Meta",
    trend: "Melhorando",
    lastValue: "12",
    lastUpdate: "30/04/2023",
  },
  {
    id: "ind-3",
    name: "Eficácia das Ações Corretivas",
    code: "IAC-001",
    type: "Qualidade",
    frequency: "Trimestral",
    target: "> 90",
    unit: "%",
    responsible: "Gerente de Qualidade",
    process: "Gestão de Não Conformidades",
    description: "Percentual de ações corretivas que foram eficazes",
    status: "Dentro da Meta",
    trend: "Estável",
    lastValue: "92",
    lastUpdate: "31/03/2023",
  },
  {
    id: "ind-4",
    name: "Número de Melhorias Implementadas",
    code: "IME-001",
    type: "Melhoria",
    frequency: "Trimestral",
    target: "> 10",
    unit: "unidades",
    responsible: "Gerente de Qualidade",
    process: "Gestão de Melhorias",
    description: "Número de melhorias implementadas no período",
    status: "Abaixo da Meta",
    trend: "Piorando",
    lastValue: "7",
    lastUpdate: "31/03/2023",
  },
  {
    id: "ind-5",
    name: "Satisfação do Cliente",
    code: "ISC-001",
    type: "Cliente",
    frequency: "Trimestral",
    target: "> 85",
    unit: "%",
    responsible: "Gerente de Atendimento",
    process: "Gestão de Clientes",
    description: "Índice de satisfação dos clientes com os serviços",
    status: "Dentro da Meta",
    trend: "Melhorando",
    lastValue: "88",
    lastUpdate: "31/03/2023",
  },
]

export function SGIPerformanceIndicators() {
  const [indicators, setIndicators] = useState(indicatorsExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredIndicators = indicators.filter((ind) => {
    const matchesSearch =
      ind.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || ind.type === typeFilter
    const matchesStatus = statusFilter === "all" || ind.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Dentro da Meta":
        return <Badge className="bg-green-100 text-green-800">Dentro da Meta</Badge>
      case "Abaixo da Meta":
        return <Badge className="bg-red-100 text-red-800">Abaixo da Meta</Badge>
      case "Acima da Meta":
        return <Badge className="bg-amber-100 text-amber-800">Acima da Meta</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "Melhorando":
        return <Badge className="bg-green-100 text-green-800">Melhorando</Badge>
      case "Piorando":
        return <Badge className="bg-red-100 text-red-800">Piorando</Badge>
      case "Estável":
        return <Badge className="bg-blue-100 text-blue-800">Estável</Badge>
      default:
        return <Badge variant="outline">{trend}</Badge>
    }
  }

  return (
    <Tabs defaultValue="indicators" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="indicators">Indicadores</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="reports">Relatórios</TabsTrigger>
      </TabsList>

      <TabsContent value="indicators" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar indicadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="Qualidade">Qualidade</SelectItem>
              <SelectItem value="Melhoria">Melhoria</SelectItem>
              <SelectItem value="Cliente">Cliente</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Dentro da Meta">Dentro da Meta</SelectItem>
              <SelectItem value="Abaixo da Meta">Abaixo da Meta</SelectItem>
              <SelectItem value="Acima da Meta">Acima da Meta</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Indicador</span>
          </Button>
        </div>

        <div className="space-y-4">
          {filteredIndicators.length === 0 ? (
            <Card>
              <CardContent className="flex h-24 items-center justify-center p-6 text-center text-muted-foreground">
                Nenhum indicador encontrado com os filtros atuais
              </CardContent>
            </Card>
          ) : (
            filteredIndicators.map((indicator) => (
              <Card key={indicator.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{indicator.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {indicator.code} • {indicator.process}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(indicator.status)}
                          {getTrendBadge(indicator.trend)}
                        </div>
                      </div>
                      <div className="text-sm">{indicator.description}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <span className="text-muted-foreground">Meta:</span>
                          <span className="font-medium">
                            {indicator.target} {indicator.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <span className="text-muted-foreground">Atual:</span>
                          <span className="font-medium">
                            {indicator.lastValue} {indicator.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <span className="text-muted-foreground">Frequência:</span>
                          <span className="font-medium">{indicator.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <span className="text-muted-foreground">Última atualização:</span>
                          <span className="font-medium">{indicator.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end border-t bg-muted/50 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <LineChart className="h-4 w-4" />
                        <span>Histórico</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Edit className="h-4 w-4" />
                        <span>Editar</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Trash className="h-4 w-4" />
                        <span>Excluir</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="dashboard" className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Dashboard de Indicadores</h3>
          <div className="flex items-center gap-2">
            <Select defaultValue="last-quarter">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Mês Atual</SelectItem>
                <SelectItem value="last-month">Mês Anterior</SelectItem>
                <SelectItem value="last-quarter">Último Trimestre</SelectItem>
                <SelectItem value="last-year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Não Conformidades</CardTitle>
              <CardDescription>Total por período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                <BarChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tempo de Tratamento</CardTitle>
              <CardDescription>Média em dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                <LineChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Eficácia das Ações</CardTitle>
              <CardDescription>Percentual de eficácia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                <PieChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visão Geral dos Indicadores</CardTitle>
            <CardDescription>Comparativo de desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <BarChart className="h-24 w-24 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports" className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Relatórios de Desempenho</h3>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Relatório</span>
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Relatório Mensal de Indicadores</div>
                    <div className="text-sm text-muted-foreground">Resumo mensal de todos os indicadores do SGI</div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Relatório Trimestral de Não Conformidades</div>
                    <div className="text-sm text-muted-foreground">
                      Análise detalhada das não conformidades do trimestre
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Relatório de Melhorias Implementadas</div>
                    <div className="text-sm text-muted-foreground">Resumo das melhorias implementadas no período</div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Relatório Anual de Desempenho do SGI</div>
                    <div className="text-sm text-muted-foreground">Análise completa do desempenho anual do SGI</div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
