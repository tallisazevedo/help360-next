"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FolderTreeProps {
  onSelectFolder: (path: string[]) => void
  currentPath: string[]
}

interface FolderItem {
  id: string
  name: string
  children?: FolderItem[]
  path: string[]
}

// Dados de exemplo para a árvore de pastas
const folderStructure: FolderItem[] = [
  {
    id: "folder-1",
    name: "Procedimentos",
    path: ["Procedimentos"],
    children: [
      {
        id: "folder-1-1",
        name: "Operacionais",
        path: ["Procedimentos", "Operacionais"],
      },
      {
        id: "folder-1-2",
        name: "Administrativos",
        path: ["Procedimentos", "Administrativos"],
      },
    ],
  },
  {
    id: "folder-2",
    name: "Políticas",
    path: ["Políticas"],
    children: [
      {
        id: "folder-2-1",
        name: "RH",
        path: ["Políticas", "RH"],
      },
      {
        id: "folder-2-2",
        name: "Segurança",
        path: ["Políticas", "Segurança"],
      },
    ],
  },
  {
    id: "folder-3",
    name: "Relatórios",
    path: ["Relatórios"],
    children: [
      {
        id: "folder-3-1",
        name: "Mensais",
        path: ["Relatórios", "Mensais"],
      },
      {
        id: "folder-3-2",
        name: "Anuais",
        path: ["Relatórios", "Anuais"],
      },
    ],
  },
  {
    id: "folder-4",
    name: "Formulários",
    path: ["Formulários"],
  },
  {
    id: "folder-5",
    name: "Planos",
    path: ["Planos"],
    children: [
      {
        id: "folder-5-1",
        name: "Estratégicos",
        path: ["Planos", "Estratégicos"],
      },
      {
        id: "folder-5-2",
        name: "Operacionais",
        path: ["Planos", "Operacionais"],
      },
    ],
  },
]

export function DocumentFolderTree({ onSelectFolder, currentPath }: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  // Função para verificar se uma pasta está expandida
  const isFolderExpanded = (folderId: string) => {
    return expandedFolders.includes(folderId)
  }

  // Função para alternar a expansão de uma pasta
  const toggleFolderExpansion = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFolderExpanded(folderId)) {
      setExpandedFolders(expandedFolders.filter((id) => id !== folderId))
    } else {
      setExpandedFolders([...expandedFolders, folderId])
    }
  }

  // Função para verificar se um caminho é igual ao caminho atual
  const isCurrentPath = (path: string[]) => {
    if (path.length !== currentPath.length) return false
    return path.every((segment, index) => segment === currentPath[index])
  }

  // Renderiza um item de pasta e seus filhos recursivamente
  const renderFolderItem = (item: FolderItem) => {
    const isExpanded = isFolderExpanded(item.id)
    const isCurrent = isCurrentPath(item.path)

    return (
      <div key={item.id} className="select-none">
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-muted/50",
            isCurrent ? "bg-muted font-medium" : "",
          )}
          onClick={() => onSelectFolder(item.path)}
        >
          <button
            className="mr-1 h-4 w-4 flex items-center justify-center"
            onClick={(e) => item.children && toggleFolderExpansion(item.id, e)}
          >
            {item.children && (
              <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded ? "transform rotate-90" : "")} />
            )}
          </button>
          {isExpanded ? (
            <FolderOpen className="h-4 w-4 text-amber-500 mr-2" />
          ) : (
            <Folder className="h-4 w-4 text-amber-500 mr-2" />
          )}
          <span>{item.name}</span>
        </div>

        {isExpanded && item.children && (
          <div className="ml-4 pl-2 border-l border-border">
            {item.children.map((child) => renderFolderItem(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="font-medium mb-2 px-2">Pastas</div>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-muted/50",
            currentPath.length === 0 ? "bg-muted font-medium" : "",
          )}
          onClick={() => onSelectFolder([])}
        >
          <Folder className="h-4 w-4 text-amber-500 mr-2" />
          <span>Todos os Documentos</span>
        </div>
        {folderStructure.map((folder) => renderFolderItem(folder))}
      </ScrollArea>
    </div>
  )
}
