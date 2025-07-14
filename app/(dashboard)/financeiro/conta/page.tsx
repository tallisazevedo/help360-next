import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CompanySettings } from "@/components/settings/company-settings"

export const metadata: Metadata = {
  title: "Conta | Help360",
  description: "Gerenciamento de dados cadastrais da empresa",
}

export default function ContaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dados Cadastrais</h1>
        <p className="text-muted-foreground">Gerencie as informações da sua empresa</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>Atualize as informações cadastrais da sua empresa.</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanySettings />
        </CardContent>
      </Card>
    </div>
  )
}
