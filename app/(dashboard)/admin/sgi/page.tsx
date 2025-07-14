import type { Metadata } from "next"
import { SGIWorkflowViewer } from "@/components/admin/sgi-workflow-viewer"
import { SGIActivityTimeline } from "@/components/admin/sgi-activity-timeline"
import { SGIPermissionsManager } from "@/components/admin/sgi-permissions-manager"
import { SGIDocumentTracker } from "@/components/admin/sgi-document-tracker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Administração do SGI | Help360",
  description: "Gerenciamento do Sistema de Gestão Integrado",
}

export default function SGIAdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Administração do SGI</h1>
        <p className="text-muted-foreground">Gerencie o Sistema de Gestão Integrado e acompanhe o fluxo de processos</p>
      </div>

      <Tabs defaultValue="workflow" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflow">Fluxo de Trabalho</TabsTrigger>
          <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visualização de Fluxo de Trabalho</CardTitle>
              <CardDescription>
                Acompanhe o fluxo completo de processos e a interação entre diferentes módulos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SGIWorkflowViewer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Linha do Tempo de Atividades</CardTitle>
              <CardDescription>
                Visualize a sequência cronológica de atividades e interações entre usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SGIActivityTimeline />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Permissões</CardTitle>
              <CardDescription>
                Configure o acesso de usuários a informações sensíveis e funcionalidades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SGIPermissionsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rastreamento de Documentos</CardTitle>
              <CardDescription>Acompanhe o compartilhamento e acesso a documentos no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <SGIDocumentTracker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
