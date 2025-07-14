"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, MoreHorizontal, Shield, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@empresa.com",
    role: "Gerente de Qualidade",
    department: "Qualidade",
    status: "Ativo",
    lastActive: "Há 5 minutos",
    avatar: "/placeholder.svg?height=40&width=40",
    isAdmin: true,
  },
  {
    id: "2",
    name: "João Oliveira",
    email: "joao.oliveira@empresa.com",
    role: "Analista de Qualidade",
    department: "Qualidade",
    status: "Ativo",
    lastActive: "Há 30 minutos",
    avatar: "/placeholder.svg?height=40&width=40",
    isAdmin: false,
  },
  {
    id: "3",
    name: "Ana Pereira",
    email: "ana.pereira@empresa.com",
    role: "Agente de Suporte",
    department: "Suporte",
    status: "Ativo",
    lastActive: "Há 1 hora",
    avatar: "/placeholder.svg?height=40&width=40",
    isAdmin: false,
  },
  {
    id: "4",
    name: "Carlos Santos",
    email: "carlos.santos@empresa.com",
    role: "Desenvolvedor",
    department: "TI",
    status: "Ativo",
    lastActive: "Há 2 horas",
    avatar: "/placeholder.svg?height=40&width=40",
    isAdmin: false,
  },
  {
    id: "5",
    name: "Roberto Alves",
    email: "roberto.alves@empresa.com",
    role: "Gerente de Operações",
    department: "Operações",
    status: "Inativo",
    lastActive: "Há 3 dias",
    avatar: "/placeholder.svg?height=40&width=40",
    isAdmin: false,
  },
]

export function UserList() {
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
    if (selectedItems.length === users.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(users.map((item) => item.id))
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
      case "Ativo":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "Inativo":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
      case "Pendente":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
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
                    checked={selectedItems.length === users.length && users.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    Usuário
                    {sortColumn === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("lastActive")}>
                  <div className="flex items-center gap-1">
                    Último acesso
                    {sortColumn === "lastActive" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(user.id)}
                      onCheckedChange={() => handleSelectItem(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{user.name}</span>
                          {user.isAdmin && <Shield className="h-3.5 w-3.5 text-primary" />}
                        </div>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/usuarios/${user.id}`}>
                            <User2 className="mr-2 h-4 w-4" />
                            Ver perfil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Gerenciar permissões
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
