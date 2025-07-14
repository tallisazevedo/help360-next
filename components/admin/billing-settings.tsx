"use client"

import { useState } from "react"
import { CreditCard, Download, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  downloadUrl: string
}

const invoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2023-06-01",
    amount: 299.99,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-002",
    date: "2023-05-01",
    amount: 299.99,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-003",
    date: "2023-04-01",
    amount: 299.99,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-004",
    date: "2023-03-01",
    amount: 249.99,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-005",
    date: "2023-02-01",
    amount: 249.99,
    status: "paid",
    downloadUrl: "#",
  },
]

export function BillingSettings() {
  const [currentPlan] = useState({
    name: "Enterprise",
    price: 299.99,
    billingCycle: "monthly",
    nextBillingDate: "2023-07-01",
    features: [
      "Acesso a todos os módulos",
      "Usuários ilimitados",
      "Suporte prioritário 24/7",
      "Integrações avançadas",
      "Relatórios personalizados",
      "API completa",
    ],
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plano Atual</CardTitle>
            <CardDescription>Detalhes do seu plano atual e ciclo de faturamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <p className="text-muted-foreground">
                  R$ {currentPlan.price.toFixed(2)}/{currentPlan.billingCycle === "monthly" ? "mês" : "ano"}
                </p>
              </div>
              <Badge className="bg-green-500">Ativo</Badge>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Recursos incluídos:</h4>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Próxima cobrança: {new Date(currentPlan.nextBillingDate).toLocaleDateString("pt-BR")}
            </div>
            <Button variant="outline">Alterar Plano</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Método de Pagamento</CardTitle>
            <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Mastercard •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expira em 12/2025</div>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Visa •••• 1234</div>
                <div className="text-sm text-muted-foreground">Expira em 08/2024</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Adicionar Método de Pagamento
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Faturas</CardTitle>
          <CardDescription>Visualize e baixe suas faturas anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>R$ {invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {invoice.status === "paid" && <Badge className="bg-green-500">Pago</Badge>}
                    {invoice.status === "pending" && <Badge className="bg-yellow-500">Pendente</Badge>}
                    {invoice.status === "failed" && <Badge className="bg-red-500">Falhou</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
