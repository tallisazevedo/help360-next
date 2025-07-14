"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2, FolderPlus, Tag, Copy, Check, ChevronDown } from "lucide-react"
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
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Dados simulados
const MOCK_CATEGORIES = [
  { id: "1", name: "Saudações", count: 5 },
  { id: "2", name: "Suporte Técnico", count: 8 },
  { id: "3", name: "Financeiro", count: 4 },
  { id: "4", name: "Reclamações", count: 6 },
  { id: "5", name: "Encerramento", count: 3 },
]

const MOCK_RESPONSES = [
  {
    id: "1",
    title: "Saudação Inicial",
    content: "Olá! Seja bem-vindo(a) à Help360. Como posso ajudar você hoje?",
    category: "1",
    tags: ["saudação", "boas-vindas"],
    usageCount: 128,
  },
  {
    id: "2",
    title: "Agradecimento",
    content: "Agradeço pelo contato. Estamos à disposição para qualquer outra dúvida ou necessidade.",
    category: "1",
    tags: ["agradecimento"],
    usageCount: 95,
  },
  {
    id: "3",
    title: "Problema de Login",
    content:
      "Para resolver problemas de login, tente limpar o cache do navegador e reiniciar a aplicação. Se o problema persistir, podemos resetar sua senha.",
    category: "2",
    tags: ["login", "acesso", "senha"],
    usageCount: 67,
  },
  {
    id: "4",
    title: "Informação de Pagamento",
    content:
      "Os pagamentos são processados em até 2 dias úteis. Caso tenha alguma dúvida sobre sua fatura, por favor, informe o número do pedido para que possamos verificar.",
    category: "3",
    tags: ["pagamento", "fatura"],
    usageCount: 42,
  },
  {
    id: "5",
    title: "Encerramento de Atendimento",
    content:
      "Foi um prazer atendê-lo(a). Seu protocolo de atendimento é #{{protocolo}}. Caso precise de mais alguma coisa, estamos à disposição.",
    category: "5",
    tags: ["encerramento", "protocolo"],
    usageCount: 103,
  },
]

export function RespostasRapidasManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [editingResponse, setEditingResponse] = useState<(typeof MOCK_RESPONSES)[0] | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filtra as respostas com base na pesquisa e categoria selecionada
  const filteredResponses = MOCK_RESPONSES.filter((response) => {
    const matchesSearch =
      searchTerm === "" ||
      response.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === null || response.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleCopyToClipboard = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleEditResponse = (response: (typeof MOCK_RESPONSES)[0]) => {
    setEditingResponse(response)
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Respostas Rápidas</h1>
        <p className="text-muted-foreground">
          Gerencie mensagens pré-definidas para agilizar o atendimento ao cliente.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Painel lateral de categorias */}
        <div className="w-full md:w-64">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Categorias</CardTitle>
              <CardDescription>Organize suas respostas</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button variant="ghost" className="justify-start font-normal" onClick={() => setSelectedCategory(null)}>
                <span className={selectedCategory === null ? "font-medium" : ""}>Todas as respostas</span>
                <Badge variant="outline" className="ml-auto">
                  {MOCK_RESPONSES.length}
                </Badge>
              </Button>
              {MOCK_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className={selectedCategory === category.id ? "font-medium" : ""}>{category.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddCategoryDialogOpen(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                Nova Categoria
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Lista de respostas rápidas */}
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Respostas Disponíveis</CardTitle>
                <Button
                  onClick={() => {
                    setEditingResponse(null)
                    setIsAddDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Resposta
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar respostas..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredResponses.length > 0 ? (
                    filteredResponses.map((response) => (
                      <Collapsible key={response.id} className="rounded-md border">
                        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left">
                          <div>
                            <h3 className="font-medium">{response.title}</h3>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {response.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="border-t p-4">
                            <p className="whitespace-pre-wrap text-sm">{response.content}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Utilizada {response.usageCount} vezes</span>
                                <span>•</span>
                                <span>{MOCK_CATEGORIES.find((c) => c.id === response.category)?.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyToClipboard(response.id, response.content)}
                                >
                                  {copiedId === response.id ? (
                                    <Check className="mr-2 h-4 w-4" />
                                  ) : (
                                    <Copy className="mr-2 h-4 w-4" />
                                  )}
                                  {copiedId === response.id ? "Copiado!" : "Copiar"}
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Ações
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditResponse(response)}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Tag className="mr-2 h-4 w-4" />
                                      Gerenciar Tags
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                      <p className="text-sm text-muted-foreground">Nenhuma resposta rápida encontrada.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setEditingResponse(null)
                          setIsAddDialogOpen(true)
                        }}
                      >
                        Criar uma nova resposta
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog para adicionar/editar resposta rápida */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingResponse ? "Editar Resposta Rápida" : "Nova Resposta Rápida"}</DialogTitle>
            <DialogDescription>
              Crie ou edite uma resposta pré-definida para usar durante os atendimentos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="Ex: Saudação Inicial" defaultValue={editingResponse?.title || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                placeholder="Digite o conteúdo da resposta rápida..."
                className="min-h-[150px]"
                defaultValue={editingResponse?.content || ""}
              />
              <p className="text-xs text-muted-foreground">
                Dica: Use {"{{"} variavel {"}}"} para incluir variáveis que serão substituídas automaticamente.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={editingResponse?.category || ""}
                >
                  <option value="">Selecione uma categoria</option>
                  {MOCK_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  placeholder="Ex: saudação, boas-vindas"
                  defaultValue={editingResponse?.tags.join(", ") || ""}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{editingResponse ? "Salvar Alterações" : "Criar Resposta"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para adicionar categoria */}
      <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>Crie uma nova categoria para organizar suas respostas rápidas.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Nome da Categoria</Label>
              <Input id="category-name" placeholder="Ex: Suporte Técnico" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-description">Descrição (opcional)</Label>
              <Textarea id="category-description" placeholder="Descreva o propósito desta categoria..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Categoria</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
