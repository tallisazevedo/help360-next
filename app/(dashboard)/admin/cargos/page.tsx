import type { Metadata } from "next"
import { RoleList } from "@/components/admin/role-list"
import { RoleFilters } from "@/components/admin/role-filters"

export const metadata: Metadata = {
  title: "Cargos | Help360",
  description: "Gerenciamento de cargos da plataforma Help360",
}

export default function CargosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cargos</h1>
        <p className="text-muted-foreground">Gerencie os cargos da sua organização</p>
      </div>

      <RoleFilters />
      <RoleList />
    </div>
  )
}
