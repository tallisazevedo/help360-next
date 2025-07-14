import type { Metadata } from "next"
import { NonConformityForm } from "@/components/non-conformity/non-conformity-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Nova Não Conformidade | Help360",
  description: "Registrar uma nova não conformidade na plataforma Help360",
}

export default function NewNonConformityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/nao-conformidades">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Não Conformidade</h1>
          <p className="text-muted-foreground">Registre uma nova não conformidade no sistema</p>
        </div>
      </div>

      <NonConformityForm />
    </div>
  )
}
