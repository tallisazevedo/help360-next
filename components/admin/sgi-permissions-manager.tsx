"use client"

import { useState } from "react"
import { ChevronDown, Eye, Plus, Search, Shield, Trash, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Exemplo de usuários e permissões
const usersExample = [
  {
    id: "user-1",
    name: "Douglas Lopes",
    email: "douglas.lopes@help360.com",
    role: "Atendente",
    department: "Suporte",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: [
      { module: "Comunicação", level: "Completo" },
      { module: "Não Conformidades", level: "Leitura" },
      { module: "Ações Corretivas", level: "Nenhum" },
      { module: "Documentação", level: "Leitura" },
      { module: "Melhorias", level: "Nenhum" },
    ],
  },
  {
    id: "user-2",
    name: "Janaina Pereira",
    email: "janaina.pereira@help360.com",
    role: "Analista de Qualidade",
    department: "Qualidade",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: [
      { module: "Comunicação", level: "Leitura" },
      { module: "Não Conformidades", level: "Completo" },
      { module: "Ações Corretivas", level: "Completo" },
      { module: "Documentação", level: "Leitura/Escrita" },
      { module: "Melhorias", level: "Leitura" },
    ],
  },
  {
    id: "user-3",
    name: "Tiago Mendes",
    email: "tiago.mendes@help360.com",
    role: "Gerente de Qualidade",
    department: "Qualidade",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: [
      { module: "Comunicação", level: "Leitura" },
      { module: "Não Conformidades", level: "Completo" },
      { module: "Ações Corretivas", level: "Completo" },
      { module: "Documentação", level: "Completo" },
      { module: "Melhorias", level: "Completo" },
    ],
  },
]

// Exemplo de perfis de acesso
const accessProfilesExample = [
  {
    id: "profile-1",
    name: "Atendente",
    description: "Acesso para atendentes de suporte",
    permissions: [
      { module: "Comunicação", level: "Completo" },
      { module: "Não Conformidades", level: "Leitura" },
      { module: "Ações Corretivas", level: "Nenhum" },
      { module: "Documentação", level: "Leitura" },
      { module: "Melhorias", level: "Nenhum" },
    ],
  },
  {
    id: "profile-2",
    name: "Analista de Qualidade",
    description: "Acesso para analistas de qualidade",
    permissions: [
      { module: "Comunicação", level: "Leitura" },
      { module: "Não Conformidades", level: "Completo" },
      { module: "Ações Corretivas", level: "Completo" },
      { module: "Documentação", level: "Leitura/Escrita" },
      { module: "Melhorias", level: "Leitura" },
    ],
  },
  {
    id: "profile-3",
    name: "Gerente de Qualidade",
    description: "Acesso para gerentes de qualidade",
    permissions: [
      { module: "Comunicação", level: "Leitura" },
      { module: "Não Conformidades", level: "Completo" },
      { module: "Ações Corretivas", level: "Completo" },
      { module: "Documentação", level: "Completo" },
      { module: "Melhorias", level: "Completo" },
    ],
  },
  {
    id: "profile-4",
    name: "Administrador",
    description: "Acesso completo a todos os módulos",
    permissions: [
      { module: "Comunicação", level: "Completo" },
      { module: "Não Conformidades", level: "Completo" },
      { module: "Ações Corretivas", level: "Completo" },
      { module: "Documentação", level: "Completo" },
      { module: "Melhorias", level: "Completo" },
    ],
  },
]

export function SGIPermissionsManager() {
  const [users, setUsers] = useState(usersExample)
  const [accessProfiles, setAccessProfiles] = useState(accessProfilesExample)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Completo":
        return <Badge className="bg-green-100 text-green-800">Completo</Badge>
      case "Leitura/Escrita":
        return <Badge className="bg-blue-100 text-blue-800">Leitura/Escrita</Badge>
      case "Leitura":
        return <Badge className="bg-amber-100 text-amber-800">Leitura</Badge>
      case "Nenhum":
        return <Badge className="bg-gray-100 text-gray-800">Nenhum</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users">Usuários</TabsTrigger>
        <TabsTrigger value="profiles">Perfis de Acesso</TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Adicionar Usuário</span>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className={cn(
                "cursor-pointer transition-colors hover:bg-muted/50",
                selectedUser === user.id && "border-primary",
              )}
              onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge variant="outline">{user.department}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle>Permissões do Usuário</CardTitle>
              <CardDescription>
                Gerencie as permissões de acesso para {users.find((u) => u.id === selectedUser)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Aplicar perfil de acesso</div>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecionar perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      {accessProfiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  {users
                    .find((u) => u.id === selectedUser)
                    ?.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>{permission.module}</span>
                        </div>
                        <Select defaultValue={permission.level}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Completo">Completo</SelectItem>
                            <SelectItem value="Leitura/Escrita">Leitura/Escrita</SelectItem>
                            <SelectItem value="Leitura">Leitura</SelectItem>
                            <SelectItem value="Nenhum">Nenhum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar Alterações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="profiles" className="space-y-4">
        <div className="flex justify-end">
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Perfil de Acesso</span>
          </Button>
        </div>

        <div className="space-y-4">
          {accessProfiles.map((profile) => (
            <Card key={profile.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{profile.name}</CardTitle>
                    <CardDescription>{profile.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Usuários com este perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {profile.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <div className="text-sm">{permission.module}</div>
                      {getLevelBadge(permission.level)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
