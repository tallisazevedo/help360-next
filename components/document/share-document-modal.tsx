"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Plus, Copy, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ShareDocumentModalProps {
  documentId: string
  documentName: string
  isOpen: boolean
  onClose: () => void
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

const users: User[] = [
  { id: "user1", name: "João Silva", email: "joao.silva@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: "user2",
    name: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user3",
    name: "Carlos Santos",
    email: "carlos.santos@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { id: "user4", name: "Ana Pereira", email: "ana.pereira@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: "user5",
    name: "Roberto Alves",
    email: "roberto.alves@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function ShareDocumentModal({ documentId, documentName, isOpen, onClose }: ShareDocumentModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [permission, setPermission] = useState("visualizar")
  const [message, setMessage] = useState("")
  const [shareLink, setShareLink] = useState(`https://help360.com.br/share/${documentId}`)

  const filteredUsers = users.filter(
    (user) =>
      !selectedUsers.some((selected) => selected.id === user.id) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAddUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user])
    setSearchQuery("")
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    // Adicionar notificação de sucesso aqui
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para compartilhar o documento
    console.log("Documento compartilhado:", documentId, "com", selectedUsers)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Compartilhar Documento</DialogTitle>
          <DialogDescription>Compartilhe "{documentName}" com outros usuários.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Adicionar pessoas</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {selectedUsers.map((user) => (
                <Badge key={user.id} variant="secondary" className="gap-1 py-1">
                  <Avatar className="h-5 w-5 mr-1">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Input
                placeholder="Digite um nome ou email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {searchQuery && filteredUsers.length > 0 && (
              <div className="border rounded-md mt-1 max-h-40 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleAddUser(user)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="permission">Permissão</Label>
            <Select value={permission} onValueChange={setPermission}>
              <SelectTrigger id="permission">
                <SelectValue placeholder="Selecione a permissão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visualizar">Visualizar</SelectItem>
                <SelectItem value="comentar">Comentar</SelectItem>
                <SelectItem value="editar">Editar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem (opcional)</Label>
            <Textarea
              id="message"
              placeholder="Adicione uma mensagem para os destinatários"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Link de compartilhamento</Label>
            <div className="flex items-center gap-2">
              <Input value={shareLink} readOnly className="flex-1" />
              <Button type="button" variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="gap-1">
              <Mail className="h-4 w-4" />
              Compartilhar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
