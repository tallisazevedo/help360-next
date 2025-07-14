"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Share2,
  Printer,
  Star,
  MoreHorizontal,
  FileText,
  User,
  Calendar,
  Tag,
  MessageSquare,
  History,
} from "lucide-react"

interface DocumentViewerProps {
  documentId: string
  documentName: string
  documentType: string
  isOpen: boolean
  onClose: () => void
}

export function DocumentViewer({ documentId, documentName, documentType, isOpen, onClose }: DocumentViewerProps) {
  const [activeTab, setActiveTab] = useState("preview")

  // Simulação de dados do documento
  const documentData = {
    id: documentId,
    name: documentName,
    type: documentType,
    version: "1.2",
    status: "Aprovado",
    createdBy: "João Silva",
    createdAt: "15/03/2023",
    modifiedBy: "Maria Oliveira",
    modifiedAt: "20/03/2023",
    expiresAt: "15/03/2024",
    category: "Procedimento",
    tags: ["Qualidade", "Operacional", "ISO 9001"],
    description: "Este documento descreve os procedimentos operacionais padrão para o processo de produção.",
    comments: [
      { id: "1", user: "Carlos Santos", date: "22/03/2023", text: "Documento aprovado pela diretoria." },
      { id: "2", user: "Ana Pereira", date: "23/03/2023", text: "Implementado no setor de produção." },
    ],
    history: [
      { version: "1.0", date: "10/01/2023", user: "João Silva", action: "Criação do documento" },
      { version: "1.1", date: "05/02/2023", user: "Maria Oliveira", action: "Revisão do conteúdo" },
      { version: "1.2", date: "15/03/2023", user: "Carlos Santos", action: "Aprovação final" },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "Em revisão":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Rascunho":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Obsoleto":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <DialogTitle className="text-xl">{documentName}</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="icon" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="preview">Visualização</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 flex flex-col">
            <div className="border rounded-md p-4 flex-1 bg-white">
              <div className="flex justify-center items-center h-full">
                <iframe
                  src="/placeholder.svg?height=500&width=700"
                  className="w-full h-full border-0"
                  title={documentName}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="flex-1">
            <ScrollArea className="h-[500px]">
              <div className="space-y-6 p-4">
                <div>
                  <h3 className="text-lg font-medium">Informações do Documento</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        ID
                      </p>
                      <p>{documentData.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        Versão
                      </p>
                      <p>{documentData.version}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        Status
                      </p>
                      <p>
                        <Badge variant="outline" className={getStatusColor(documentData.status)}>
                          {documentData.status}
                        </Badge>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        Categoria
                      </p>
                      <p>{documentData.category}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Datas</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Data de Criação
                      </p>
                      <p>{documentData.createdAt}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Última Modificação
                      </p>
                      <p>{documentData.modifiedAt}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Data de Expiração
                      </p>
                      <p>{documentData.expiresAt}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Pessoas</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Criado por
                      </p>
                      <p>{documentData.createdBy}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Modificado por
                      </p>
                      <p>{documentData.modifiedBy}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {documentData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Descrição</h3>
                  <p className="mt-2">{documentData.description}</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="comments" className="flex-1">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4 p-4">
                <h3 className="text-lg font-medium">Comentários</h3>

                {documentData.comments.map((comment) => (
                  <div key={comment.id} className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{comment.user}</div>
                      <div className="text-sm text-muted-foreground">{comment.date}</div>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                  </div>
                ))}

                <div className="mt-4">
                  <textarea className="w-full border rounded-md p-2" rows={3} placeholder="Adicione um comentário..." />
                  <div className="mt-2 flex justify-end">
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comentar
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4 p-4">
                <h3 className="text-lg font-medium">Histórico de Versões</h3>

                {documentData.history.map((item, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        Versão {item.version}
                      </div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <p>{item.action}</p>
                      <p className="text-sm text-muted-foreground">por {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
