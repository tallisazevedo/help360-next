import type { Metadata } from "next"
import { UserList } from "@/components/user/user-list"
import { UserFilters } from "@/components/user/user-filters"

export const metadata: Metadata = {
  title: "Usuários | Help360",
  description: "Gerenciamento de usuários da plataforma Help360",
}

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <p className="text-muted-foreground">Gerencie os usuários da sua organização</p>
      </div>

      <UserFilters />
      <UserList />
    </div>
  )
}
