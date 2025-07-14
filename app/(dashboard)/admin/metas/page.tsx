import type { Metadata } from "next"
import { GoalList } from "@/components/admin/goal-list"
import { GoalFilters } from "@/components/admin/goal-filters"

export const metadata: Metadata = {
  title: "Metas | Help360",
  description: "Gerenciamento de metas da plataforma Help360",
}

export default function MetasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Metas</h1>
        <p className="text-muted-foreground">Defina e acompanhe metas para sua equipe</p>
      </div>

      <GoalFilters />
      <GoalList />
    </div>
  )
}
