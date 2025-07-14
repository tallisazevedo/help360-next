import type { Metadata } from "next"
import { SecurityDashboard } from "@/components/admin/security-dashboard"

export const metadata: Metadata = {
  title: "Segurança | Help360",
  description: "Gerenciamento de segurança da plataforma Help360",
}

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Segurança</h1>
        <p className="text-muted-foreground">Monitore e gerencie a segurança da sua plataforma</p>
      </div>

      <SecurityDashboard />
    </div>
  )
}
