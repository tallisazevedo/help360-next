"use client"

import { useState } from "react"
import Link from "next/link"
import { ClipboardList, ChevronDown, ChevronUp, Clock, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const actionPlans = [
  {
    id: "PA-2023-001",
    title: "Implementação de novo processo de inspeção",
    department: "Qualidade",
    status: "Em andamento",
    progress: 45,
    deadline: "30/04/2023",
    responsible: "João Silva",
    priority: "Alta",
    source: "Não conformidade NC-2023-001",
  },
  {
    id: "PA-2023-002",
    title: "Treinamento da equipe de produção",
    department: "RH",
    status: "Planejado",
    progress: 0,
    deadline: "15/05/2023",
    responsible: "Maria Oliveira",
    priority: "Média",
    source: "Melhoria OM-2023-002",
  },
  {
    id: "PA-2023-003",
    title: "Calibração de equipamentos",
    department: "Manutenção",
    status: "Concluído",
    progress: 100,
    deadline: "10/04/2023",
    responsible: "Carlos Santos",
    priority: "Alta",
    source: "Não conformidade NC-2023-003",
  },
  {
    id: "PA-2023-004",
    title: "Revisão de procedimentos operacionais",
    department: "Operações",
    status: "Em andamento",
    progress: 70,
    deadline: "20/05/2023",
    responsible: "Ana Pereira",
    priority: "Média",
    source: "Melhoria OM-2023-001",
  },
  {
    id: "PA-2023-005",
    title: "Implementação de controle de qualidade de fornecedores",
    department: "Suprimentos",
    status: "Em andamento",
    progress: 30,
    deadline: "30/05/2023",
    responsible: "Roberto Alves",
    priority: "Alta",
    source: "Não conformidade NC-2023-005",
  },
]

export function ActionPlanList() {
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
    if (selectedItems.length === actionPlans.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(actionPlans.map((item) => item.id))
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
      case "Planejado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Em andamento":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Concluído":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "Atrasado":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === actionPlans.length && actionPlans.length > 0}
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
                <TableHead>Prioridade</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("deadline")}>
                  <div className="flex items-center gap-1">
                    Prazo
                    {sortColumn === "deadline" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionPlans.map((item) => (
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
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell>{item.responsible}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/planos-acao/${item.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          Atualizar Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Adicionar Tarefa
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
