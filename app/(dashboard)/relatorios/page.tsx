import type { Metadata } from "next"
import { ReportList } from "@/components/report/report-list"
import { ReportFilters } from "@/components/report/report-filters"

export const metadata: Metadata = {
  title: "Relatórios | Help360",
  description: "Relatórios e indicadores na plataforma Help360",
}

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Acesse relatórios e indicadores de desempenho</p>
      </div>

      <ReportFilters />
      <ReportList />
    </div>
  )
}
