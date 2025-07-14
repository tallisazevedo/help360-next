"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2, Eye, Plus, Download, Upload, Users, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Tipos
interface Client {
  id: string
  name: string
  logo: string
  segment: string
  status: "active" | "inactive" | "pending"
  contactName: string
  contactEmail: string
  contactPhone: string
  address: string
  city: string
  state: string
  country: string
  createdAt: string
  updatedAt: string
  employees: number
  plan: string
}

// Dados de exemplo
const clientsData: Client[] = [
  {
    id: "1",
    name: "Acme Corporation",
    logo: "/placeholder.svg?height=40&width=40",
    segment: "Tecnologia",
    status: "active",
    contactName: "John Doe",
    contactEmail: "john@acme.com",
    contactPhone: "(11) 99999-9999",
    address: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    createdAt: "2023-01-15",
    updatedAt: "2023-06-20",
    employees: 150,
    plan: "Enterprise",
  },
  {
    id: "2",
    name: "Globex Industria",
    logo: "/placeholder.svg?height=40&width=40",
    segment: "Manufatura",
    status: "active",
    contactName: "Maria Silva",
    contactEmail: "maria@globex.com",
    contactPhone: "(11) 88888-8888",
    address: "Av. Industrial, 500",
    city: "São Bernardo",
    state: "SP",
    country: "Brasil",
    createdAt: "2023-02-10",
    updatedAt: "2023-05-15",
    employees: 320,
    plan: "Enterprise",
  },
  {
    id: "3",
    name: "Stark Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    segment: "Consultoria",
    status: "inactive",
    contactName: "Tony Stark",
    contactEmail: "tony@stark.com",
    contactPhone: "(11) 77777-7777",
    address: "Rua Inovação, 42",
    city: "Rio de Janeiro",
    state: "RJ",
    country: "Brasil",
    createdAt: "2023-03-05",
    updatedAt: "2023-04-10",
    employees: 45,
    plan: "Professional",
  },
  {
    id: "4",
    name: "Wayne Enterprises",
    logo: "/placeholder.svg?height=40&width=40",
    segment: "Tecnologia",
    status: "pending",
    contactName: "Bruce Wayne",
    contactEmail: "bruce@wayne.com",
    contactPhone: "(11) 66666-6666",
    address: "Av. Gotham, 1939",
    city: "Curitiba",
    state: "PR",
    country: "Brasil",
    createdAt: "2023-04-20",
    updatedAt: "2023-04-20",
    employees: 210,
    plan: "Enterprise",
  },
  {
    id: "5",
    name: "Oscorp Industries",
    logo: "/placeholder.svg?height=40&width=40",
    segment: "Química",
    status: "active",
    contactName: "Norman Osborn",
    contactEmail: "norman@oscorp.com",
    contactPhone: "(11) 55555-5555",
    address: "Rua Ciência, 88",
    city: "Belo Horizonte",
    state: "MG",
    country: "Brasil",
    createdAt: "2023-05-12",
    updatedAt: "2023-06-01",
    employees: 175,
    plan: "Professional",
  },
]

// Componente para visualizar detalhes do cliente
const ClientDetails = ({ client }: { client: Client }) => {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={client.logo} alt={client.name} />
            <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-xl">{client.name}</DialogTitle>
            <DialogDescription>
              <Badge
                className={
                  client.status === "active"
                    ? "bg-green-500"
                    : client.status === "inactive"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }
              >
                {client.status === "active" ? "Ativo" : client.status === "inactive" ? "Inativo" : "Pendente"}
              </Badge>
              <Badge variant="outline" className="ml-2">
                {client.segment}
              </Badge>
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="contacts">Contatos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[60vh] pr-4">
          <TabsContent value="info" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Segmento</h4>
                  <p className="text-sm">{client.segment}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Plano</h4>
                  <p className="text-sm">{client.plan}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Endereço</h4>
                <p className="text-sm">{client.address}</p>
                <p className="text-sm">
                  {client.city}, {client.state} - {client.country}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Funcionários</h4>
                  <p className="text-sm">{client.employees}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <Badge
                    className={
                      client.status === "active"
                        ? "bg-green-500"
                        : client.status === "inactive"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }
                  >
                    {client.status === "active" ? "Ativo" : client.status === "inactive" ? "Inativo" : "Pendente"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Data de Criação</h4>
                  <p className="text-sm">{new Date(client.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Última Atualização</h4>
                  <p className="text-sm">{new Date(client.updatedAt).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="mt-0">
            <div className="grid gap-4 py-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{client.contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{client.contactName}</h4>
                      <p className="text-sm text-muted-foreground">Contato Principal</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.contactPhone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Contato
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cliente criado</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(client.createdAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(client.createdAt).toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                    <Edit className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Informações atualizadas</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(client.updatedAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(client.updatedAt).toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <DialogFooter className="mt-6">
        <Button variant="outline">Fechar</Button>
        <Button>Editar Cliente</Button>
      </DialogFooter>
    </>
  )
}

// Componente para o formulário de cliente
const ClientForm = ({ client }: { client?: Client }) => {
  const isEditing = !!client
  const title = isEditing ? "Editar Cliente" : "Novo Cliente"
  const description = isEditing
    ? "Atualize as informações do cliente."
    : "Preencha as informações para criar um novo cliente."

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome da Empresa</Label>
          <Input id="name" defaultValue={client?.name || ""} placeholder="Nome da empresa" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="segment">Segmento</Label>
            <Input id="segment" defaultValue={client?.segment || ""} placeholder="Segmento de atuação" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="employees">Número de Funcionários</Label>
            <Input id="employees" type="number" defaultValue={client?.employees || ""} placeholder="Quantidade" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" defaultValue={client?.address || ""} placeholder="Endereço completo" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" defaultValue={client?.city || ""} placeholder="Cidade" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" defaultValue={client?.state || ""} placeholder="Estado" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">País</Label>
            <Input id="country" defaultValue={client?.country || ""} placeholder="País" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactName">Nome do Contato Principal</Label>
          <Input id="contactName" defaultValue={client?.contactName || ""} placeholder="Nome completo" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="contactEmail">Email do Contato</Label>
            <Input
              id="contactEmail"
              type="email"
              defaultValue={client?.contactEmail || ""}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contactPhone">Telefone do Contato</Label>
            <Input id="contactPhone" defaultValue={client?.contactPhone || ""} placeholder="(00) 00000-0000" />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline">Cancelar</Button>
        <Button>{isEditing ? "Salvar Alterações" : "Criar Cliente"}</Button>
      </DialogFooter>
    </>
  )
}

// Componente para confirmar exclusão
const DeleteConfirmation = ({ client, onConfirm }: { client: Client; onConfirm: () => void }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Excluir Cliente</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir o cliente "{client.name}"? Esta ação não pode ser desfeita.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2 sm:gap-0">
        <Button variant="outline">Cancelar</Button>
        <Button variant="destructive" onClick={onConfirm}>
          Excluir Cliente
        </Button>
      </DialogFooter>
    </>
  )
}

export function ClientList() {
  const [clients, setClients] = useState<Client[]>(clientsData)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [dialogType, setDialogType] = useState<"create" | "edit" | "view" | "delete">("view")

  const handleDeleteClient = () => {
    if (selectedClient) {
      setClients((prev) => prev.filter((c) => c.id !== selectedClient.id))
    }
  }

  const openDialog = (type: "create" | "edit" | "view" | "delete", client?: Client) => {
    setSelectedClient(client || null)
    setDialogType(type)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog("create")}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              {dialogType === "create" && <ClientForm />}
              {dialogType === "edit" && selectedClient && <ClientForm client={selectedClient} />}
              {dialogType === "view" && selectedClient && <ClientDetails client={selectedClient} />}
              {dialogType === "delete" && selectedClient && (
                <DeleteConfirmation client={selectedClient} onConfirm={handleDeleteClient} />
              )}
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={client.logo} alt={client.name} />
                      <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.city}, {client.state}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{client.segment}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{client.contactName}</div>
                    <div className="text-sm text-muted-foreground">{client.contactEmail}</div>
                  </div>
                </TableCell>
                <TableCell>{client.plan}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      client.status === "active"
                        ? "bg-green-500"
                        : client.status === "inactive"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }
                  >
                    {client.status === "active" ? "Ativo" : client.status === "inactive" ? "Inativo" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openDialog("view", client)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        {dialogType === "create" && <ClientForm />}
                        {dialogType === "edit" && selectedClient && <ClientForm client={selectedClient} />}
                        {dialogType === "view" && selectedClient && <ClientDetails client={selectedClient} />}
                        {dialogType === "delete" && selectedClient && (
                          <DeleteConfirmation client={selectedClient} onConfirm={handleDeleteClient} />
                        )}
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                openDialog("edit", client)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            {dialogType === "create" && <ClientForm />}
                            {dialogType === "edit" && selectedClient && <ClientForm client={selectedClient} />}
                            {dialogType === "view" && selectedClient && <ClientDetails client={selectedClient} />}
                            {dialogType === "delete" && selectedClient && (
                              <DeleteConfirmation client={selectedClient} onConfirm={handleDeleteClient} />
                            )}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          Gerenciar Usuários
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              className="text-destructive"
                              onSelect={(e) => {
                                e.preventDefault()
                                openDialog("delete", client)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            {dialogType === "create" && <ClientForm />}
                            {dialogType === "edit" && selectedClient && <ClientForm client={selectedClient} />}
                            {dialogType === "view" && selectedClient && <ClientDetails client={selectedClient} />}
                            {dialogType === "delete" && selectedClient && (
                              <DeleteConfirmation client={selectedClient} onConfirm={handleDeleteClient} />
                            )}
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
