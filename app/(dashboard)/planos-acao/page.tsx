import type { Metadata } from "next"
import { ActionPlanList } from "@/components/action-plan/action-plan-list"
import { ActionPlanFilters } from "@/components/action-plan/action-plan-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Planos de Ação | Help360",
  description: "Gestão de planos de ação na plataforma Help360",
}

export default function ActionPlanPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos de Ação</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe todos os planos de ação</p>
        </div>
        <Button asChild>
          <Link href="/planos-acao/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano de Ação
          </Link>
        </Button>
      </div>

      <ActionPlanFilters />
      <ActionPlanList />
    </div>
  )
}
