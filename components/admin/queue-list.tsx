"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2, Users } from "lucide-react"

// Dados de exemplo para as filas
const queues = [
  {
    id: "1",
    name: "Suporte Técnico",
    department: "Suporte",
    agents: 12,
    status: "active",
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    name: "Vendas",
    department: "Comercial",
    agents: 8,
    status: "active",
    createdAt: "2023-06-22",
  },
  {
    id: "3",
    name: "Financeiro",
    department: "Administrativo",
    agents: 5,
    status: "inactive",
    createdAt: "2023-04-10",
  },
  {
    id: "4",
    name: "Atendimento ao Cliente",
    department: "Suporte",
    agents: 15,
    status: "active",
    createdAt: "2023-07-05",
  },
  {
    id: "5",
    name: "RH",
    department: "Administrativo",
    agents: 3,
    status: "active",
    createdAt: "2023-03-18",
  },
]

export function QueueList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filas de Atendimento</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Agentes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queues.map((queue) => (
              <TableRow key={queue.id}>
                <TableCell className="font-medium">{queue.name}</TableCell>
                <TableCell>{queue.department}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    {queue.agents}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={queue.status === "active" ? "default" : "secondary"}>
                    {queue.status === "active" ? "Ativa" : "Inativa"}
                  </Badge>
                </TableCell>
                <TableCell>{queue.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
