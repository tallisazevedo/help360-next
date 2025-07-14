import type { Metadata } from "next"
import { InvoiceList } from "@/components/financeiro/invoice-list"

export const metadata: Metadata = {
  title: "Faturas | Help360",
  description: "Histórico de faturas e pagamentos",
}

export default function FaturaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>
        <p className="text-muted-foreground">Histórico de faturas, pagamentos e notas fiscais</p>
      </div>

      <InvoiceList />
    </div>
  )
}
