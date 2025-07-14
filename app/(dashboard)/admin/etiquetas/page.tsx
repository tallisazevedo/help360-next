import type { Metadata } from "next"
import { TagList } from "@/components/admin/tag-list"
import { TagFilters } from "@/components/admin/tag-filters"

export const metadata: Metadata = {
  title: "Etiquetas | Help360",
  description: "Gerenciamento de etiquetas da plataforma Help360",
}

export default function EtiquetasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Etiquetas</h1>
        <p className="text-muted-foreground">Gerencie as etiquetas para categorização de conteúdo</p>
      </div>

      <TagFilters />
      <TagList />
    </div>
  )
}
