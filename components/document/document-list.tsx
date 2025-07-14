"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, ChevronDown, ChevronUp, Download, Eye, MoreHorizontal, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { OpenActionModal } from "./open-action-modal"
import { SendToSectorModal } from "./send-to-sector-modal"

const documents = [
  {
    id: "DOC-2023-001",
    title: "Manual de Procedimentos Operacionais",
    category: "Procedimento",
    version: "2.3",
    status: "Aprovado",
    date: "15/03/2023",
    author: "João Silva",
    type: "PDF",
    size: "2.5 MB",
    isOverdue: false,
    daysToAction: null,
  },
  {
    id: "DOC-2023-002",
    title: "Política de Qualidade",
    category: "Política",
    version: "1.0",
    status: "Aprovado",
    date: "20/03/2023",
    author: "Maria Oliveira",
    type: "DOCX",
    size: "1.2 MB",
    isOverdue: false,
    daysToAction: null,
  },
  {
    id: "DOC-2023-003",
    title: "Relatório de Calibração de Equipamentos",
    category: "Relatório",
    version: "1.1",
    status: "Em revisão",
    date: "25/03/2023",
    author: "Carlos Santos",
    type: "PDF",
    size: "3.7 MB",
    isOverdue: true,
    daysToAction: 0,
  },
  {
    id: "DOC-2023-004",
    title: "Checklist de Inspeção de Qualidade",
    category: "Formulário",
    version: "1.2",
    status: "Aprovado",
    date: "02/04/2023",
    author: "Ana Pereira",
    type: "XLSX",
    size: "0.8 MB",
    isOverdue: false,
    daysToAction: 5,
  },
  {
    id: "DOC-2023-005",
    title: "Plano de Contingência",
    category: "Plano",
    version: "1.0",
    status: "Em revisão",
    date: "05/04/2023",
    author: "Roberto Alves",
    type: "PDF",
    size: "4.2 MB",
    isOverdue: true,
    daysToAction: 0,
  },
]

export function DocumentList() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [sectorModalOpen, setSectorModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<{ id: string; title: string } | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.length === documents.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(documents.map((item) => item.id))
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
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

  const handleOpenAction = (document: { id: string; title: string }) => {
    setSelectedDocument(document)
    setActionModalOpen(true)
  }

  const handleSendToSector = (document: { id: string; title: string }) => {
    setSelectedDocument(document)
    setSectorModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === documents.length && documents.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center gap-1">
                      ID
                      {sortColumn === "id" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center gap-1">
                      Título
                      {sortColumn === "title" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    <div className="flex items-center gap-1">
                      Data
                      {sortColumn === "date" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((item) => (
                  <TableRow key={item.id} className={`hover:bg-muted/50 ${item.isOverdue ? "bg-red-50" : ""}`}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.version}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className={`h-4 w-4 ${getFileTypeIcon(item.type)}`} />
                        <span>{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>
                      {item.isOverdue ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center text-red-600">
                                <AlertTriangle className="mr-1 h-4 w-4" />
                                <span>Em atraso</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Este documento está em atraso e requer atenção imediata</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : item.daysToAction !== null ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center text-amber-600">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>{item.daysToAction} dias</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Dias restantes para tomar uma ação</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-green-600">Em dia</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/documentacao/${item.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          {item.isOverdue && (
                            <>
                              <DropdownMenuItem onClick={() => handleOpenAction({ id: item.id, title: item.title })}>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Abrir Ação
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendToSector({ id: item.id, title: item.title })}>
                                <Clock className="mr-2 h-4 w-4" />
                                Enviar ao Setor
                              </DropdownMenuItem>
                            </>
                          )}
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

      {selectedDocument && (
        <>
          <OpenActionModal
            documentId={selectedDocument.id}
            documentTitle={selectedDocument.title}
            isOpen={actionModalOpen}
            onClose={() => setActionModalOpen(false)}
          />
          <SendToSectorModal
            documentId={selectedDocument.id}
            documentTitle={selectedDocument.title}
            isOpen={sectorModalOpen}
            onClose={() => setSectorModalOpen(false)}
          />
        </>
      )}
    </>
  )
}
