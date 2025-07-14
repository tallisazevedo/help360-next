import type { Metadata } from "next"
import { SubscriptionDetails } from "@/components/financeiro/subscription-details"
import { SubscriptionModules } from "@/components/financeiro/subscription-modules"

export const metadata: Metadata = {
  title: "Assinatura | Help360",
  description: "Gerenciamento da assinatura Help360",
}

export default function AssinaturaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assinatura</h1>
        <p className="text-muted-foreground">Gerencie sua assinatura e módulos contratados</p>
      </div>

      <SubscriptionDetails />
      <SubscriptionModules />
    </div>
  )
}
