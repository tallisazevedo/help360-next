import type { Metadata } from "next"
import { ProfileList } from "@/components/admin/profile-list"
import { ProfileFilters } from "@/components/admin/profile-filters"

export const metadata: Metadata = {
  title: "Perfis | Help360",
  description: "Gerenciamento de perfis de acesso da plataforma Help360",
}

export default function PerfisPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfis de Acesso</h1>
        <p className="text-muted-foreground">Gerencie os perfis de acesso da sua organização</p>
      </div>

      <ProfileFilters />
      <ProfileList />
    </div>
  )
}
