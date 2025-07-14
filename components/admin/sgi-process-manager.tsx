"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown, ChevronRight, Edit, Plus, Search, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Exemplo de processos do SGI
const processesExample = [
  {
    id: "proc-1",
    name: "Gestão de Não Conformidades",
    type: "Principal",
    status: "Ativo",
    owner: "Departamento de Qualidade",
    description: "Processo para identificação, registro, análise e tratamento de não conformidades",
    subprocesses: [
      {
        id: "sub-1",
        name: "Identificação e Registro",
        status: "Ativo",
        owner: "Atendentes",
      },
      {
        id: "sub-2",
        name: "Análise de Causa",
        status: "Ativo",
        owner: "Analistas de Qualidade",
      },
      {
        id: "sub-3",
        name: "Ação Corretiva",
        status: "Ativo",
        owner: "Analistas de Qualidade",
      },
      {
        id: "sub-4",
        name: "Verificação de Eficácia",
        status: "Ativo",
        owner: "Gerentes de Qualidade",
      },
    ],
    expanded: true,
  },
  {
    id: "proc-2",
    name: "Gestão de Melhorias",
    type: "Principal",
    status: "Ativo",
    owner: "Departamento de Qualidade",
    description: "Processo para identificação, planejamento e implementação de melhorias",
    subprocesses: [
      {
        id: "sub-5",
        name: "Identificação de Oportunidades",
        status: "Ativo",
        owner: "Todos os Departamentos",
      },
      {
        id: "sub-6",
        name: "Análise de Viabilidade",
        status: "Ativo",
        owner: "Gerentes de Qualidade",
      },
      {
        id: "sub-7",
        name: "Implementação",
        status: "Ativo",
        owner: "Equipes Designadas",
      },
      {
        id: "sub-8",
        name: "Monitoramento de Resultados",
        status: "Ativo",
        owner: "Gerentes de Qualidade",
      },
    ],
    expanded: false,
  },
  {
    id: "proc-3",
    name: "Gestão de Documentos",
    type: "Suporte",
    status: "Ativo",
    owner: "Departamento de Qualidade",
    description: "Processo para criação, revisão, aprovação e controle de documentos",
    subprocesses: [
      {
        id: "sub-9",
        name: "Elaboração de Documentos",
        status: "Ativo",
        owner: "Todos os Departamentos",
      },
      {
        id: "sub-10",
        name: "Revisão e Aprovação",
        status: "Ativo",
        owner: "Gerentes de Qualidade",
      },
      {
        id: "sub-11",
        name: "Distribuição e Controle",
        status: "Ativo",
        owner: "Analistas de Qualidade",
      },
    ],
    expanded: false,
  },
  {
    id: "proc-4",
    name: "Gestão de Auditorias",
    type: "Avaliação",
    status: "Ativo",
    owner: "Departamento de Qualidade",
    description: "Processo para planejamento, execução e acompanhamento de auditorias",
    subprocesses: [
      {
        id: "sub-12",
        name: "Planejamento de Auditorias",
        status: "Ativo",
        owner: "Gerentes de Qualidade",
      },
      {
        id: "sub-13",
        name: "Execução de Auditorias",
        status: "Ativo",
        owner: "Auditores",
      },
      {
        id: "sub-14",
        name: "Registro de Constatações",
        status: "Ativo",
        owner: "Auditores",
      },
      {
        id: "sub-15",
        name: "Acompanhamento de Ações",
        status: "Ativo",
        owner: "Gerentes de Qualidade",
      },
    ],
    expanded: false,
  },
]

export function SGIProcessManager() {
  const [processes, setProcesses] = useState(processesExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const toggleProcessExpand = (processId: string) => {
    setProcesses(
      processes.map((process) => (process.id === processId ? { ...process, expanded: !process.expanded } : process)),
    )
  }

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || process.type === typeFilter
    return matchesSearch && matchesType
  })

  const getProcessTypeBadge = (type: string) => {
    switch (type) {
      case "Principal":
        return <Badge className="bg-blue-100 text-blue-800">Principal</Badge>
      case "Suporte":
        return <Badge className="bg-purple-100 text-purple-800">Suporte</Badge>
      case "Avaliação":
        return <Badge className="bg-amber-100 text-amber-800">Avaliação</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar processos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de processo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="Principal">Principal</SelectItem>
            <SelectItem value="Suporte">Suporte</SelectItem>
            <SelectItem value="Avaliação">Avaliação</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Processo</span>
        </Button>
      </div>

      <div className="space-y-4">
        {filteredProcesses.length === 0 ? (
          <Card>
            <CardContent className="flex h-24 items-center justify-center p-6 text-center text-muted-foreground">
              Nenhum processo encontrado com os filtros atuais
            </CardContent>
          </Card>
        ) : (
          filteredProcesses.map((process) => (
            <Card key={process.id} className="overflow-hidden">
              <div
                className="flex cursor-pointer items-center gap-3 border-b p-4"
                onClick={() => toggleProcessExpand(process.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{process.name}</div>
                    {getProcessTypeBadge(process.type)}
                    <Badge
                      variant="outline"
                      className={
                        process.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {process.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Responsável: {process.owner}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {process.expanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              {process.expanded && (
                <CardContent className="p-4">
                  <div className="mb-4 text-sm">{process.description}</div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Subprocessos</div>
                    <div className="space-y-2">
                      {process.subprocesses.map((subprocess) => (
                        <div key={subprocess.id} className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center gap-3">
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{subprocess.name}</div>
                              <div className="text-sm text-muted-foreground">Responsável: {subprocess.owner}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                subprocess.status === "Ativo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {subprocess.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Subprocesso
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
