"use client"

import { useState } from "react"
import { Eye, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Adicione o import do DocumentViewer no topo do arquivo
import { DocumentViewer } from "./document-viewer"
import { DocumentUploadModal } from "./document-upload-modal"
import { CreateFolderModal } from "./create-folder-modal"
import { ShareDocumentModal } from "./share-document-modal"

type ItemType = "file" | "folder"

interface DocumentDriveProps {
  currentPath?: string[]
}

export function DocumentDrive({ currentPath = [] }: DocumentDriveProps) {
  // Adicione estes estados dentro da função DocumentDrive
  const [viewerOpen, setViewerOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedDocumentForViewer, setSelectedDocumentForViewer] = useState<{
    id: string
    name: string
    type: ItemType
  } | null>(null)
  const [selectedDocumentForShare, setSelectedDocumentForShare] = useState<{ id: string; name: string } | null>(null)

  // Adicione esta função dentro da função DocumentDrive
  const handleViewDocument = (document: { id: string; name: string; type: ItemType }) => {
    setSelectedDocumentForViewer(document)
    setViewerOpen(true)
  }

  // Adicione esta função dentro da função DocumentDrive
  const handleShareDocument = (document: { id: string; name: string }) => {
    setSelectedDocumentForShare(document)
    setShareModalOpen(true)
  }

  const item = {
    id: "123",
    name: "test",
    type: "file" as ItemType,
  }

  return (
    <div>
      {/* Substitua os botões de Upload e Nova Pasta na barra de ferramentas */}
      <div className="flex items-center gap-2 mb-4">
        <DocumentUploadModal currentPath={currentPath} />
        <CreateFolderModal currentPath={currentPath} />
      </div>

      {/* Exemplo de item de documento com menu de contexto */}
      <div className="p-4 border rounded-md mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-gray-500" />
            <span>{item.name}</span>
          </div>

          {/* Menu de contexto corretamente estruturado */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewDocument({ id: item.id, name: item.name, type: item.type })}>
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShareDocument({ id: item.id, name: item.name })}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Adicione estes componentes no final do return */}
      {selectedDocumentForViewer && (
        <DocumentViewer
          documentId={selectedDocumentForViewer.id}
          documentName={selectedDocumentForViewer.name}
          documentType={selectedDocumentForViewer.type}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />
      )}

      {selectedDocumentForShare && (
        <ShareDocumentModal
          documentId={selectedDocumentForShare.id}
          documentName={selectedDocumentForShare.name}
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </div>
  )
}
