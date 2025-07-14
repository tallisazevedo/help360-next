import type { Metadata } from "next"
import { UserList } from "@/components/user/user-list"
import { UserFilters } from "@/components/user/user-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Usuários | Help360",
  description: "Gestão de usuários na plataforma Help360",
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários da plataforma</p>
        </div>
        <Button asChild>
          <Link href="/usuarios/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Link>
        </Button>
      </div>

      <UserFilters />
      <UserList />
    </div>
  )
}
