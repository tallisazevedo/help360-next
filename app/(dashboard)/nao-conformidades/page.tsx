import type { Metadata } from "next"
import { NonConformityList } from "@/components/non-conformity/non-conformity-list"
import { NonConformityFilters } from "@/components/non-conformity/non-conformity-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Não Conformidades | Help360",
  description: "Gestão de não conformidades na plataforma Help360",
}

export default function NonConformityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Não Conformidades</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe todas as não conformidades registradas</p>
        </div>
        <Button asChild>
          <Link href="/nao-conformidades/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Não Conformidade
          </Link>
        </Button>
      </div>

      <NonConformityFilters />
      <NonConformityList />
    </div>
  )
}
