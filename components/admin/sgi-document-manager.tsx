"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Edit, Eye, FileText, Plus, Search, Trash, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Exemplo de documentos do SGI
const documentsExample = [
  {
    id: "doc-1",
    name: "Manual do SGI",
    type: "Manual",
    code: "SGI-MAN-001",
    version: "2.1",
    status: "Aprovado",
    createdBy: "Janaina Pereira",
    createdAt: "10/01/2023",
    approvedBy: "Tiago Mendes",
    approvedAt: "15/01/2023",
    nextReview: "15/01/2024",
    process: "Gestão do SGI",
    description: "Manual principal do Sistema de Gestão Integrado",
  },
  {
    id: "doc-2",
    name: "Procedimento de Não Conformidades",
    type: "Procedimento",
    code: "SGI-PRO-001",
    version: "1.3",
    status: "Aprovado",
    createdBy: "Douglas Lopes",
    createdAt: "05/02/2023",
    approvedBy: "Tiago Mendes",
    approvedAt: "10/02/2023",
    nextReview: "10/02/2024",
    process: "Gestão de Não Conformidades",
    description: "Procedimento para tratamento de não conformidades",
  },
  {
    id: "doc-3",
    name: "Instrução de Trabalho - Análise de Causa",
    type: "Instrução de Trabalho",
    code: "SGI-IT-001",
    version: "1.1",
    status: "Aprovado",
    createdBy: "Janaina Pereira",
    createdAt: "15/02/2023",
    approvedBy: "Tiago Mendes",
    approvedAt: "20/02/2023",
    nextReview: "20/02/2024",
    process: "Gestão de Não Conformidades",
    description: "Instrução para análise de causa raiz de não conformidades",
  },
  {
    id: "doc-4",
    name: "Formulário de Registro de Não Conformidade",
    type: "Formulário",
    code: "SGI-FOR-001",
    version: "2.0",
    status: "Aprovado",
    createdBy: "Douglas Lopes",
    createdAt: "25/02/2023",
    approvedBy: "Tiago Mendes",
    approvedAt: "28/02/2023",
    nextReview: "28/02/2024",
    process: "Gestão de Não Conformidades",
    description: "Formulário para registro de não conformidades",
  },
  {
    id: "doc-5",
    name: "Procedimento de Melhorias",
    type: "Procedimento",
    code: "SGI-PRO-002",
    version: "1.2",
    status: "Em Revisão",
    createdBy: "Janaina Pereira",
    createdAt: "10/03/2023",
    approvedBy: "-",
    approvedAt: "-",
    nextReview: "-",
    process: "Gestão de Melhorias",
    description: "Procedimento para gestão de melhorias",
  },
]

export function SGIDocumentManager() {
  const [documents, setDocuments] = useState(documentsExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
      case "Em Revisão":
        return <Badge className="bg-amber-100 text-amber-800">Em Revisão</Badge>
      case "Obsoleto":
        return <Badge className="bg-red-100 text-red-800">Obsoleto</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Tabs defaultValue="documents" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="documents">Documentos</TabsTrigger>
        <TabsTrigger value="templates">Modelos</TabsTrigger>
        <TabsTrigger value="records">Registros</TabsTrigger>
      </TabsList>

      <TabsContent value="documents" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Procedimento">Procedimento</SelectItem>
              <SelectItem value="Instrução de Trabalho">Instrução de Trabalho</SelectItem>
              <SelectItem value="Formulário">Formulário</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Aprovado">Aprovado</SelectItem>
              <SelectItem value="Em Revisão">Em Revisão</SelectItem>
              <SelectItem value="Obsoleto">Obsoleto</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Documento</span>
          </Button>
        </div>

        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="flex h-24 items-center justify-center p-6 text-center text-muted-foreground">
                Nenhum documento encontrado com os filtros atuais
              </CardContent>
            </Card>
          ) : (
            filteredDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.code} • Versão {doc.version} • {doc.process}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getDocumentStatusBadge(doc.status)}
                          <Badge variant="outline">{doc.type}</Badge>
                        </div>
                      </div>
                      <div className="text-sm">{doc.description}</div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>Criado por:</span>
                          <span className="font-medium">{doc.createdBy}</span>
                          <span>em {doc.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Aprovado por:</span>
                          <span className="font-medium">{doc.approvedBy}</span>
                          <span>em {doc.approvedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Próxima revisão:</span>
                          <span className="font-medium">{doc.nextReview}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end border-t bg-muted/50 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                        <Link href={`/documentacao/visualizar/${doc.id}`}>
                          <Eye className="h-4 w-4" />
                          <span>Visualizar</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs" asChild>
                        <Link href={`/documentacao/${doc.id}`}>
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Visualizar
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
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

      <TabsContent value="templates" className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Modelos de Documentos</h3>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Modelo</span>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                <FileText className="mb-2 h-10 w-10 text-primary" />
                <div className="font-medium">Modelo de Procedimento</div>
                <div className="mt-1 text-sm text-muted-foreground">Modelo padrão para procedimentos</div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="/documentacao/modelos/procedimento">
                      <Eye className="h-4 w-4" />
                      <span>Visualizar</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                <FileText className="mb-2 h-10 w-10 text-primary" />
                <div className="font-medium">Modelo de Instrução de Trabalho</div>
                <div className="mt-1 text-sm text-muted-foreground">Modelo padrão para instruções de trabalho</div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="/documentacao/modelos/instrucao-trabalho">
                      <Eye className="h-4 w-4" />
                      <span>Visualizar</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                <FileText className="mb-2 h-10 w-10 text-primary" />
                <div className="font-medium">Modelo de Formulário</div>
                <div className="mt-1 text-sm text-muted-foreground">Modelo padrão para formulários</div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="/documentacao/modelos/formulario">
                      <Eye className="h-4 w-4" />
                      <span>Visualizar</span>
                    </Link>
                  </Button>
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

      <TabsContent value="records" className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Registros do SGI</h3>
          <Button className="flex gap-2">
            <Upload className="h-4 w-4" />
            <span>Importar Registros</span>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Gerenciamento de Registros</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Os registros são evidências das atividades realizadas no SGI. Utilize esta seção para gerenciar os
              registros gerados pelos processos do sistema.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild>
                <Link href="/documentacao/registros">Acessar Registros</Link>
              </Button>
              <Button variant="outline">Configurar Categorias</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
