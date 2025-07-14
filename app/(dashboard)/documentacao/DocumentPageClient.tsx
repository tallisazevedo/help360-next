"use client"

import { useState } from "react"
import { DocumentDrive } from "@/components/document/document-drive"
import { DocumentFolderTree } from "@/components/document/document-folder-tree"
import { DocumentStats } from "@/components/document/document-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentList } from "@/components/document/document-list"
import { DocumentFilters } from "@/components/document/document-filters"
import { CreateDocumentModal } from "@/components/document/create-document-modal"

export default function DocumentPageClient() {
  const [currentPath, setCurrentPath] = useState<string[]>([])

  const handleSelectFolder = (path: string[]) => {
    setCurrentPath(path)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentação</h1>
          <p className="text-muted-foreground">Gerencie todos os documentos e evidências do sistema</p>
        </div>
        <CreateDocumentModal />
      </div>

      <DocumentStats />

      <Tabs defaultValue="drive" className="flex-1">
        <TabsList>
          <TabsTrigger value="drive">Drive</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>
        <TabsContent value="drive" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            <div className="hidden md:block">
              <DocumentFolderTree onSelectFolder={handleSelectFolder} currentPath={currentPath} />
            </div>
            <DocumentDrive currentPath={currentPath} />
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <DocumentFilters />
          <div className="mt-4">
            <DocumentList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
