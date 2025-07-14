import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSettings } from "@/components/settings/user-settings"
import { CompanySettings } from "@/components/settings/company-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { IntegrationSettings } from "@/components/settings/integration-settings"

export const metadata: Metadata = {
  title: "Configurações | Help360",
  description: "Configurações da plataforma Help360",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-5 rounded-lg">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
        </TabsList>
        <TabsContent value="perfil">
          <UserSettings />
        </TabsContent>
        <TabsContent value="empresa">
          <CompanySettings />
        </TabsContent>
        <TabsContent value="seguranca">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="notificacoes">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="integracoes">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
