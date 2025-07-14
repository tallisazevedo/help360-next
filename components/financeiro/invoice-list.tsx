"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { CreditCard, FileText, Download, Search, Filter, CreditCardIcon, Receipt } from "lucide-react"

export function InvoiceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Dados de exemplo das faturas
  const invoices = [
    {
      id: "INV-2025-0001",
      date: "15/03/2025",
      dueDate: "15/03/2025",
      amount: "R$ 299,90",
      status: "Pago",
      paymentMethod: "Cartão de crédito",
      description: "Assinatura Help360 - Plano Profissional (Março/2025)",
      nfse: "NFS-e 12345",
      gateway: "Asaas",
    },
    {
      id: "INV-2025-0002",
      date: "15/03/2025",
      dueDate: "15/03/2025",
      amount: "R$ 69,90",
      status: "Pago",
      paymentMethod: "Cartão de crédito",
      description: "Módulo Documentação (Março/2025)",
      nfse: "NFS-e 12346",
      gateway: "Asaas",
    },
    {
      id: "INV-2025-0003",
      date: "15/02/2025",
      dueDate: "15/02/2025",
      amount: "R$ 299,90",
      status: "Pago",
      paymentMethod: "Boleto",
      description: "Assinatura Help360 - Plano Profissional (Fevereiro/2025)",
      nfse: "NFS-e 12300",
      gateway: "Asaas",
    },
    {
      id: "INV-2025-0004",
      date: "15/02/2025",
      dueDate: "15/02/2025",
      amount: "R$ 69,90",
      status: "Pago",
      paymentMethod: "Boleto",
      description: "Módulo Documentação (Fevereiro/2025)",
      nfse: "NFS-e 12301",
      gateway: "Asaas",
    },
    {
      id: "INV-2025-0005",
      date: "15/04/2025",
      dueDate: "15/04/2025",
      amount: "R$ 299,90",
      status: "Pendente",
      paymentMethod: "Cartão de crédito",
      description: "Assinatura Help360 - Plano Profissional (Abril/2025)",
      nfse: "-",
      gateway: "Asaas",
    },
    {
      id: "INV-2025-0006",
      date: "15/04/2025",
      dueDate: "15/04/2025",
      amount: "R$ 69,90",
      status: "Pendente",
      paymentMethod: "Cartão de crédito",
      description: "Módulo Documentação (Abril/2025)",
      nfse: "-",
      gateway: "Asaas",
    },
  ]

  // Filtrar faturas com base nos filtros aplicados
  const filteredInvoices = invoices.filter((invoice) => {
    // Filtro de pesquisa
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.nfse.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && invoice.status === "Pago") ||
      (statusFilter === "pending" && invoice.status === "Pendente")

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Faturas</CardTitle>
        <CardDescription>Visualize e gerencie suas faturas e pagamentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número, descrição ou NFS-e..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="paid">Pagos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
              </SelectContent>
            </Select>

            <DateRangePicker />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>NFS-e</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhuma fatura encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{invoice.date}</span>
                        <span className="text-xs text-muted-foreground">Venc: {invoice.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{invoice.description}</span>
                        <div className="mt-1 flex items-center">
                          <img src="/placeholder.svg?height=16&width=40" alt="Asaas" className="h-4 w-10 rounded" />
                          <span className="ml-1 text-xs text-muted-foreground">{invoice.gateway}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          invoice.status === "Pago"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {invoice.paymentMethod === "Cartão de crédito" ? (
                          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm">{invoice.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.nfse}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {invoice.status === "Pendente" ? (
                          <Button size="sm" variant="outline">
                            <CreditCard className="mr-1 h-3 w-3" />
                            Pagar
                          </Button>
                        ) : (
                          <>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                              <FileText className="h-3 w-3" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                              <Download className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
