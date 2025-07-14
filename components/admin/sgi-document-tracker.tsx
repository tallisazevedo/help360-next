"use client"

import { useState } from "react"
import { Calendar, Download, Eye, FileText, Lock, Search, Shield, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Exemplo de documentos compartilhados
const documentsExample = [
  {
    id: "doc-1",
    title: "Evidências de não conformidade - Empresa ABC",
    type: "PDF",
    size: "2.5 MB",
    uploadedBy: {
      name: "Lucas Moraes",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Empresa ABC",
    },
    uploadedAt: "15/05/2023 10:42",
    accessLevel: "Restrito",
    accessibleBy: ["Douglas Lopes", "Janaina Pereira", "Tiago Mendes"],
    relatedTo: "NC-2023-042",
    module: "Não Conformidades",
  },
  {
    id: "doc-2",
    title: "Análise de causa raiz - NC-2023-042",
    type: "DOCX",
    size: "1.8 MB",
    uploadedBy: {
      name: "Janaina Pereira",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Help360",
    },
    uploadedAt: "15/05/2023 14:35",
    accessLevel: "Interno",
    accessibleBy: ["Douglas Lopes", "Janaina Pereira", "Tiago Mendes"],
    relatedTo: "AC-2023-038",
    module: "Ações Corretivas",
  },
  {
    id: "doc-3",
    title: "Plano de implementação de melhoria",
    type: "XLSX",
    size: "1.2 MB",
    uploadedBy: {
      name: "Tiago Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Help360",
    },
    uploadedAt: "16/05/2023 10:30",
    accessLevel: "Interno",
    accessibleBy: ["Janaina Pereira", "Tiago Mendes"],
    relatedTo: "DM-2023-015",
    module: "Melhorias",
  },
  {
    id: "doc-4",
    title: "Relatório de ação corretiva - Empresa ABC",
    type: "PDF",
    size: "3.5 MB",
    uploadedBy: {
      name: "Janaina Pereira",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Help360",
    },
    uploadedAt: "16/05/2023 14:15",
    accessLevel: "Compartilhado",
    accessibleBy: ["Douglas Lopes", "Janaina Pereira", "Tiago Mendes", "Lucas Moraes"],
    relatedTo: "AC-2023-038",
    module: "Ações Corretivas",
  },
]

export function SGIDocumentTracker() {
  const [documents, setDocuments] = useState(documentsExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [accessFilter, setAccessFilter] = useState("all")
  const [moduleFilter, setModuleFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.relatedTo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAccess = accessFilter === "all" || doc.accessLevel === accessFilter
    const matchesModule = moduleFilter === "all" || doc.module === moduleFilter

    return matchesSearch && matchesAccess && matchesModule
  })

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return "text-red-500"
      case "DOCX":
        return "text-blue-500"
      case "XLSX":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "Restrito":
        return <Badge className="bg-red-100 text-red-800">Restrito</Badge>
      case "Interno":
        return <Badge className="bg-amber-100 text-amber-800">Interno</Badge>
      case "Compartilhado":
        return <Badge className="bg-green-100 text-green-800">Compartilhado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-4">
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
        <Select value={accessFilter} onValueChange={setAccessFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nível de acesso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os níveis</SelectItem>
            <SelectItem value="Restrito">Restrito</SelectItem>
            <SelectItem value="Interno">Interno</SelectItem>
            <SelectItem value="Compartilhado">Compartilhado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Módulo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os módulos</SelectItem>
            <SelectItem value="Não Conformidades">Não Conformidades</SelectItem>
            <SelectItem value="Ações Corretivas">Ações Corretivas</SelectItem>
            <SelectItem value="Melhorias">Melhorias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="access">Controle de Acesso</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
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
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-muted")}>
                      <FileText className={cn("h-5 w-5", getFileTypeIcon(doc.type))} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">{doc.type}</span>
                            <span>•</span>
                            <span className="text-muted-foreground">{doc.size}</span>
                            <span>•</span>
                            <span className="text-muted-foreground">Relacionado a: {doc.relatedTo}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getAccessLevelBadge(doc.accessLevel)}
                          <Badge variant="outline">{doc.module}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{doc.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t bg-muted/50 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={doc.uploadedBy.avatar} alt={doc.uploadedBy.name} />
                        <AvatarFallback>
                          {doc.uploadedBy.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs">
                        <span>Enviado por </span>
                        <span className="font-medium">{doc.uploadedBy.name}</span>
                        <span className="text-muted-foreground"> ({doc.uploadedBy.company})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className={cn("h-5 w-5", getFileTypeIcon(doc.type))} />
                    <div>
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc.relatedTo} • {doc.module}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getAccessLevelBadge(doc.accessLevel)}
                    <Select defaultValue={doc.accessLevel}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Restrito">Restrito</SelectItem>
                        <SelectItem value="Interno">Interno</SelectItem>
                        <SelectItem value="Compartilhado">Compartilhado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">Usuários com acesso</div>
                  <div className="flex flex-wrap gap-2">
                    {doc.accessibleBy.map((user, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{user}</span>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="h-6 gap-1 rounded-full">
                      <Shield className="h-3 w-3" />
                      <span className="text-xs">Gerenciar acesso</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
