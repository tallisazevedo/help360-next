"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ClipboardCheck, Edit, ExternalLink, Eye, Plus, Search, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Exemplo de auditorias
const auditsExample = [
  {
    id: "audit-1",
    name: "Auditoria Interna - Gestão de Não Conformidades",
    type: "Interna",
    status: "Planejada",
    startDate: "15/06/2023",
    endDate: "20/06/2023",
    leadAuditor: "Tiago Mendes",
    scope: "Processo de Gestão de Não Conformidades",
    description: "Auditoria para verificar a conformidade do processo de gestão de não conformidades",
    findings: [],
  },
  {
    id: "audit-2",
    name: "Auditoria Interna - Gestão de Melhorias",
    type: "Interna",
    status: "Em Andamento",
    startDate: "01/05/2023",
    endDate: "10/05/2023",
    leadAuditor: "Tiago Mendes",
    scope: "Processo de Gestão de Melhorias",
    description: "Auditoria para verificar a conformidade do processo de gestão de melhorias",
    findings: [
      {
        id: "finding-1",
        type: "Não Conformidade",
        description: "Falta de evidências de análise de viabilidade das melhorias",
        process: "Gestão de Melhorias",
        responsible: "Janaina Pereira",
        status: "Em Tratamento",
      },
      {
        id: "finding-2",
        type: "Observação",
        description: "Oportunidade de melhoria na documentação do processo",
        process: "Gestão de Melhorias",
        responsible: "Janaina Pereira",
        status: "Em Análise",
      },
    ],
  },
  {
    id: "audit-3",
    name: "Auditoria Interna - Gestão de Documentos",
    type: "Interna",
    status: "Concluída",
    startDate: "10/04/2023",
    endDate: "15/04/2023",
    leadAuditor: "Tiago Mendes",
    scope: "Processo de Gestão de Documentos",
    description: "Auditoria para verificar a conformidade do processo de gestão de documentos",
    findings: [
      {
        id: "finding-3",
        type: "Não Conformidade",
        description: "Documentos sem controle de versão adequado",
        process: "Gestão de Documentos",
        responsible: "Douglas Lopes",
        status: "Concluído",
      },
    ],
  },
  {
    id: "audit-4",
    name: "Auditoria Externa - ISO 9001:2015",
    type: "Externa",
    status: "Planejada",
    startDate: "10/07/2023",
    endDate: "12/07/2023",
    leadAuditor: "Auditor Externo",
    scope: "Todos os processos do SGI",
    description: "Auditoria externa para certificação ISO 9001:2015",
    findings: [],
  },
]

export function SGIAuditManager() {
  const [audits, setAudits] = useState(auditsExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAudits = audits.filter((audit) => {
    const matchesSearch =
      audit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.scope.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || audit.type === typeFilter
    const matchesStatus = statusFilter === "all" || audit.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Planejada":
        return <Badge className="bg-blue-100 text-blue-800">Planejada</Badge>
      case "Em Andamento":
        return <Badge className="bg-amber-100 text-amber-800">Em Andamento</Badge>
      case "Concluída":
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getFindingStatusBadge = (status: string) => {
    switch (status) {
      case "Em Análise":
        return <Badge className="bg-blue-100 text-blue-800">Em Análise</Badge>
      case "Em Tratamento":
        return <Badge className="bg-amber-100 text-amber-800">Em Tratamento</Badge>
      case "Concluído":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Tabs defaultValue="audits" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="audits">Auditorias</TabsTrigger>
        <TabsTrigger value="findings">Constatações</TabsTrigger>
        <TabsTrigger value="planning">Planejamento</TabsTrigger>
      </TabsList>

      <TabsContent value="audits" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar auditorias..."
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
              <SelectItem value="Interna">Interna</SelectItem>
              <SelectItem value="Externa">Externa</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Planejada">Planejada</SelectItem>
              <SelectItem value="Em Andamento">Em Andamento</SelectItem>
              <SelectItem value="Concluída">Concluída</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Nova Auditoria</span>
          </Button>
        </div>

        <div className="space-y-4">
          {filteredAudits.length === 0 ? (
            <Card>
              <CardContent className="flex h-24 items-center justify-center p-6 text-center text-muted-foreground">
                Nenhuma auditoria encontrada com os filtros atuais
              </CardContent>
            </Card>
          ) : (
            filteredAudits.map((audit) => (
              <Card key={audit.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{audit.name}</div>
                          <div className="text-sm text-muted-foreground">Auditor Líder: {audit.leadAuditor}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(audit.status)}
                          <Badge variant="outline">{audit.type}</Badge>
                        </div>
                      </div>
                      <div className="text-sm">{audit.description}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {audit.startDate} a {audit.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <span className="text-muted-foreground">Escopo:</span>
                          <span>{audit.scope}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                          <span className="text-muted-foreground">Constatações:</span>
                          <span>{audit.findings.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end border-t bg-muted/50 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                        <Link href={`/auditorias/detalhes/${audit.id}`}>
                          <Eye className="h-4 w-4" />
                          <span>Visualizar</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Edit className="h-4 w-4" />
                        <span>Editar</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Trash className="h-4 w-4" />
                        <span>Excluir</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs" asChild>
                        <Link href={`/relatorios/auditorias/${audit.id}`}>
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Visualizar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="findings" className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Constatações de Auditoria</h3>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Nova Constatação</span>
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {audits
                .flatMap((audit) => audit.findings)
                .map((finding) => (
                  <div key={finding.id} className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{finding.description}</div>
                          <Badge variant="outline">{finding.type}</Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Processo: {finding.process} • Responsável: {finding.responsible}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getFindingStatusBadge(finding.status)}
                        <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                          <Link href={`/auditorias/constatacoes/${finding.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="planning" className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Planejamento de Auditorias</h3>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Plano</span>
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Plano Anual de Auditorias 2023</div>
                    <div className="text-sm text-muted-foreground">
                      Planejamento de todas as auditorias internas para o ano de 2023
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/auditorias/planos/anual-2023">
                        <Eye className="mr-1 h-4 w-4" />
                        <span>Ver Detalhes</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Preparação para Auditoria Externa ISO 9001</div>
                    <div className="text-sm text-muted-foreground">
                      Plano de preparação para a auditoria externa de certificação
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/auditorias/planos/iso9001-2023">
                        <Eye className="mr-1 h-4 w-4" />
                        <span>Ver Detalhes</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
