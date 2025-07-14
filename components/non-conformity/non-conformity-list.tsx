"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ChevronDown, ChevronUp, Clock, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const nonConformities = [
  {
    id: "NC-2023-001",
    title: "Falha no processo de embalagem",
    department: "Produção",
    severity: "Alta",
    status: "Aberta",
    date: "15/03/2023",
    responsible: "João Silva",
  },
  {
    id: "NC-2023-002",
    title: "Documentação incompleta",
    department: "Qualidade",
    severity: "Média",
    status: "Em análise",
    date: "20/03/2023",
    responsible: "Maria Oliveira",
  },
  {
    id: "NC-2023-003",
    title: "Calibração de equipamento vencida",
    department: "Manutenção",
    severity: "Alta",
    status: "Em tratamento",
    date: "25/03/2023",
    responsible: "Carlos Santos",
  },
  {
    id: "NC-2023-004",
    title: "Falha na inspeção de qualidade",
    department: "Qualidade",
    severity: "Média",
    status: "Em análise",
    date: "02/04/2023",
    responsible: "Ana Pereira",
  },
  {
    id: "NC-2023-005",
    title: "Matéria-prima fora de especificação",
    department: "Suprimentos",
    severity: "Alta",
    status: "Aberta",
    date: "05/04/2023",
    responsible: "Roberto Alves",
  },
]

export function NonConformityList() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.length === nonConformities.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(nonConformities.map((item) => item.id))
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alta":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "Média":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Baixa":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberta":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "Em análise":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Em tratamento":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Concluída":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === nonConformities.length && nonConformities.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                  <div className="flex items-center gap-1">
                    ID
                    {sortColumn === "id" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                  <div className="flex items-center gap-1">
                    Título
                    {sortColumn === "title" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Severidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                  <div className="flex items-center gap-1">
                    Data
                    {sortColumn === "date" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nonConformities.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.responsible}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/nao-conformidades/${item.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          Atualizar Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Reportar Problema
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
