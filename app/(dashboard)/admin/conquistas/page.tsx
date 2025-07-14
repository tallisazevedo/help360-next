import type { Metadata } from "next"
import { AchievementList } from "@/components/admin/achievement-list"
import { AchievementFilters } from "@/components/admin/achievement-filters"

export const metadata: Metadata = {
  title: "Conquistas | Help360",
  description: "Gerenciamento de conquistas da plataforma Help360",
}

export default function ConquistasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conquistas</h1>
        <p className="text-muted-foreground">Configure conquistas e recompensas para gamificação</p>
      </div>

      <AchievementFilters />
      <AchievementList />
    </div>
  )
}
