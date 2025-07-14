"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function RoleList() {
  // Dados de exemplo
  const roles = [
    { id: 1, name: "Administrador", description: "Acesso completo ao sistema", permissions: 25, users: 3 },
    { id: 2, name: "Gerente", description: "Gerenciamento de equipes e relatórios", permissions: 18, users: 5 },
    { id: 3, name: "Atendente", description: "Atendimento ao cliente", permissions: 12, users: 15 },
    { id: 4, name: "Supervisor", description: "Supervisão de atendimentos", permissions: 15, users: 4 },
    {
      id: 5,
      name: "Analista de Qualidade",
      description: "Análise de qualidade e processos",
      permissions: 14,
      users: 2,
    },
  ]

  return (
    <Card>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Cargos</h2>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Novo Cargo
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-center">Permissões</TableHead>
            <TableHead className="text-center">Usuários</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">{role.permissions}</Badge>
              </TableCell>
              <TableCell className="text-center">{role.users}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
