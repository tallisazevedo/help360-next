"use client"

import { useState } from "react"
import { PlusCircle, Search, Filter, Trash2, Edit, MoreHorizontal, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Dados de exemplo
const initialGroups = [
  {
    id: "1",
    name: "Clientes Premium",
    description: "Clientes com planos premium ativos nos últimos 3 meses",
    contactCount: 156,
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Leads Qualificados",
    description: "Contatos que demonstraram interesse em nossos produtos",
    contactCount: 89,
    createdAt: "2023-07-02T14:45:00Z",
  },
  {
    id: "3",
    name: "Aniversariantes do Mês",
    description: "Clientes que fazem aniversário no mês atual",
    contactCount: 42,
    createdAt: "2023-08-01T09:15:00Z",
  },
  {
    id: "4",
    name: "Inativos 90 dias",
    description: "Clientes que não interagiram nos últimos 90 dias",
    contactCount: 213,
    createdAt: "2023-07-10T16:20:00Z",
  },
]

export default function GruposPage() {
  const [groups, setGroups] = useState(initialGroups)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentGroup, setCurrentGroup] = useState<any>(null)
  const [formData, setFormData] = useState({ name: "", description: "" })

  // Filtrar grupos com base na pesquisa
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Abrir diálogo de edição
  const handleEditGroup = (group: any) => {
    setCurrentGroup(group)
    setFormData({
      name: group.name,
      description: group.description,
    })
    setIsEditDialogOpen(true)
  }

  // Abrir diálogo de exclusão
  const handleDeleteGroup = (group: any) => {
    setCurrentGroup(group)
    setIsDeleteDialogOpen(true)
  }

  // Salvar novo grupo
  const handleSaveNewGroup = () => {
    const newGroup = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      description: formData.description,
      contactCount: 0,
      createdAt: new Date().toISOString(),
    }
    setGroups([...groups, newGroup])
    setFormData({ name: "", description: "" })
    setIsCreateDialogOpen(false)
    toast({
      title: "Grupo criado",
      description: `O grupo "${formData.name}" foi criado com sucesso.`,
    })
  }

  // Atualizar grupo existente
  const handleUpdateGroup = () => {
    const updatedGroups = groups.map((group) =>
      group.id === currentGroup.id ? { ...group, name: formData.name, description: formData.description } : group,
    )
    setGroups(updatedGroups)
    setIsEditDialogOpen(false)
    toast({
      title: "Grupo atualizado",
      description: `O grupo "${formData.name}" foi atualizado com sucesso.`,
    })
  }

  // Excluir grupo
  const handleConfirmDelete = () => {
    const updatedGroups = groups.filter((group) => group.id !== currentGroup.id)
    setGroups(updatedGroups)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Grupo excluído",
      description: `O grupo "${currentGroup.name}" foi excluído com sucesso.`,
      variant: "destructive",
    })
  }

  // Formatação de data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grupos de Disparos</h1>
          <p className="text-muted-foreground">Gerencie seus grupos de contatos para campanhas de WhatsApp</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Novo Grupo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Grupo</DialogTitle>
              <DialogDescription>
                Crie um grupo para organizar seus contatos para campanhas de marketing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Nome do Grupo</label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Clientes Premium"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Descrição</label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o propósito deste grupo"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNewGroup} disabled={!formData.name}>
                Criar Grupo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar grupos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{group.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditGroup(group)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteGroup(group)} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2">{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {group.contactCount} {group.contactCount === 1 ? "contato" : "contatos"}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <span className="text-xs text-muted-foreground">Criado em {formatDate(group.createdAt)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Diálogo de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Grupo</DialogTitle>
            <DialogDescription>Atualize as informações do grupo de contatos.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name">Nome do Grupo</label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-description">Descrição</label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateGroup} disabled={!formData.name}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Grupo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o grupo "{currentGroup?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
