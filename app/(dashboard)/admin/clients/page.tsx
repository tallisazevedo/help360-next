import type { Metadata } from "next"
import { ClientList } from "@/components/admin/client-list"
import { ClientFilters } from "@/components/admin/client-filters"

export const metadata: Metadata = {
  title: "Clientes | Help360",
  description: "Gerenciamento de clientes da plataforma Help360",
}

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">Gerencie os clientes da sua plataforma</p>
      </div>

      <ClientFilters />
      <ClientList />
    </div>
  )
}
