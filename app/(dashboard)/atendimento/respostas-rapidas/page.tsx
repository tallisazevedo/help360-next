import type { Metadata } from "next"
import { RespostasRapidasManager } from "@/components/atendimento/respostas-rapidas-manager"

export const metadata: Metadata = {
  title: "Respostas Rápidas | Help360",
  description: "Gerenciamento de respostas rápidas para atendimento",
}

export default function RespostasRapidasPage() {
  return (
    <div className="container space-y-6 p-6">
      <RespostasRapidasManager />
    </div>
  )
}
