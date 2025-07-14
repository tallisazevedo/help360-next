"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para as etiquetas
const tags = [
  {
    id: "1",
    name: "Urgente",
    color: "#FF4136",
    category: "Tickets",
    usageCount: 128,
    status: "active",
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    name: "Bug",
    color: "#FF851B",
    category: "Tickets",
    usageCount: 87,
    status: "active",
    createdAt: "2023-06-22",
  },
  {
    id: "3",
    name: "Fatura",
    color: "#0074D9",
    category: "Documentos",
    usageCount: 64,
    status: "active",
    createdAt: "2023-07-10",
  },
  {
    id: "4",
    name: "VIP",
    color: "#B10DC9",
    category: "Clientes",
    usageCount: 42,
    status: "active",
    createdAt: "2023-08-05",
  },
  {
    id: "5",
    name: "Pendente",
    color: "#FFDC00",
    category: "Tickets",
    usageCount: 156,
    status: "active",
    createdAt: "2023-04-18",
  },
  {
    id: "6",
    name: "Resolvido",
    color: "#2ECC40",
    category: "Tickets",
    usageCount: 203,
    status: "active",
    createdAt: "2023-03-30",
  },
  {
    id: "7",
    name: "Contrato",
    color: "#AAAAAA",
    category: "Documentos",
    usageCount: 35,
    status: "inactive",
    createdAt: "2023-09-12",
  },
]

export function TagList() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState<(typeof tags)[0] | null>(null)

  const handleEdit = (tag: (typeof tags)[0]) => {
    setCurrentTag(tag)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (tag: (typeof tags)[0]) => {
    setCurrentTag(tag)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cor</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Uso</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: tag.color }} />
                </TableCell>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell>{tag.category}</TableCell>
                <TableCell>{tag.usageCount}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tag.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tag.status === "active" ? "Ativa" : "Inativa"}
                  </span>
                </TableCell>
                <TableCell>{new Date(tag.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(tag)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(tag)} className="text-red-600">
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
      </Card>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar etiqueta</DialogTitle>
            <DialogDescription>Faça alterações na etiqueta aqui. Clique em salvar quando terminar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag-name" className="text-right">
                Nome
              </Label>
              <Input id="tag-name" defaultValue={currentTag?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag-color" className="text-right">
                Cor
              </Label>
              <div className="col-span-3 flex gap-2 items-center">
                <Input id="tag-color" type="color" defaultValue={currentTag?.color} className="w-12 h-8 p-1" />
                <Input defaultValue={currentTag?.color} className="flex-1" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag-category" className="text-right">
                Categoria
              </Label>
              <Select defaultValue={currentTag?.category.toLowerCase()}>
                <SelectTrigger id="tag-category" className="col-span-3">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tickets">Tickets</SelectItem>
                  <SelectItem value="documentos">Documentos</SelectItem>
                  <SelectItem value="clientes">Clientes</SelectItem>
                  <SelectItem value="produtos">Produtos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag-status" className="text-right">
                Status
              </Label>
              <Select defaultValue={currentTag?.status}>
                <SelectTrigger id="tag-status" className="col-span-3">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativa</SelectItem>
                  <SelectItem value="inactive">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir etiqueta</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a etiqueta "{currentTag?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive">Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
