import type { Metadata } from "next"
import { StatsDashboard } from "@/components/atendimento/stats-dashboard"

export const metadata: Metadata = {
  title: "Estatísticas de Atendimento | Help360",
  description: "Estatísticas e métricas de atendimento Help360",
}

export default function EstatisticasPage() {
  return (
    <div className="container space-y-6 p-6">
      <StatsDashboard />
    </div>
  )
}
