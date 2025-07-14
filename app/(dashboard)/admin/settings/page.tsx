import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "@/components/admin/general-settings"
import { SecuritySettings } from "@/components/admin/security-settings"
import { IntegrationSettings } from "@/components/admin/integration-settings"
import { NotificationSettings } from "@/components/admin/notification-settings"
import { BillingSettings } from "@/components/admin/billing-settings"

export const metadata: Metadata = {
  title: "Configurações | Help360",
  description: "Configurações da plataforma Help360",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da sua plataforma</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="general"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Geral
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Segurança
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Integrações
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Notificações
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Faturamento
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="pt-6">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="security" className="pt-6">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="integrations" className="pt-6">
          <IntegrationSettings />
        </TabsContent>
        <TabsContent value="notifications" className="pt-6">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="billing" className="pt-6">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
