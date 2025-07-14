import type { Metadata } from "next"
import { ImprovementList } from "@/components/improvement/improvement-list"
import { ImprovementFilters } from "@/components/improvement/improvement-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Oportunidades de Melhoria | Help360",
  description: "Gestão de oportunidades de melhoria na plataforma Help360",
}

export default function ImprovementPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Oportunidades de Melhoria</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe todas as oportunidades de melhoria registradas</p>
        </div>
        <Button asChild>
          <Link href="/melhorias/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Oportunidade
          </Link>
        </Button>
      </div>

      <ImprovementFilters />
      <ImprovementList />
    </div>
  )
}
