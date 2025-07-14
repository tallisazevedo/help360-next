import type { Metadata } from "next"
import { ConnectionList } from "@/components/admin/connection-list"
import { ConnectionFilters } from "@/components/admin/connection-filters"

export const metadata: Metadata = {
  title: "Conexões | Help360",
  description: "Gerenciamento de conexões da plataforma Help360",
}

export default function ConexoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conexões</h1>
        <p className="text-muted-foreground">Gerencie as conexões com serviços externos</p>
      </div>

      <ConnectionFilters />
      <ConnectionList />
    </div>
  )
}
