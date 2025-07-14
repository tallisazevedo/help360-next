"use client"

import { useState } from "react"
import Link from "next/link"
import { Lightbulb, ChevronDown, ChevronUp, Clock, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const improvements = [
  {
    id: "OM-2023-001",
    title: "Otimização do fluxo de trabalho",
    department: "Produção",
    status: "Em análise",
    progress: 25,
    date: "15/03/2023",
    responsible: "João Silva",
    impact: "Médio",
  },
  {
    id: "OM-2023-002",
    title: "Redução de desperdício de materiais",
    department: "Operações",
    status: "Em implementação",
    progress: 60,
    date: "20/03/2023",
    responsible: "Maria Oliveira",
    impact: "Alto",
  },
  {
    id: "OM-2023-003",
    title: "Melhoria na comunicação interna",
    department: "RH",
    status: "Em análise",
    progress: 15,
    date: "25/03/2023",
    responsible: "Carlos Santos",
    impact: "Médio",
  },
  {
    id: "OM-2023-004",
    title: "Automação de processos manuais",
    department: "TI",
    status: "Aprovada",
    progress: 40,
    date: "02/04/2023",
    responsible: "Ana Pereira",
    impact: "Alto",
  },
  {
    id: "OM-2023-005",
    title: "Revisão de procedimentos de segurança",
    department: "Segurança",
    status: "Em implementação",
    progress: 75,
    date: "05/04/2023",
    responsible: "Roberto Alves",
    impact: "Alto",
  },
]

export function ImprovementList() {
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
    if (selectedItems.length === improvements.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(improvements.map((item) => item.id))
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em análise":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Em implementação":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Aprovada":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "Concluída":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Alto":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "Médio":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Baixo":
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
                    checked={selectedItems.length === improvements.length && improvements.length > 0}
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
                <TableHead>Status</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Impacto</TableHead>
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
              {improvements.map((item) => (
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
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2 w-20" />
                      <span className="text-xs text-muted-foreground">{item.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getImpactColor(item.impact)}>
                      {item.impact}
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
                          <Link href={`/melhorias/${item.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          Atualizar Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Lightbulb className="mr-2 h-4 w-4" />
                          Adicionar Ideia
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
