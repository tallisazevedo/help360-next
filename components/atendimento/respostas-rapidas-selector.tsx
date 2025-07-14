"use client"

import { useState, useEffect } from "react"
import { Zap, ChevronRight, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

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

type RespostasRapidasSelectorProps = {
  onSelectResponse: (content: string) => void
}

export function RespostasRapidasSelector({ onSelectResponse }: RespostasRapidasSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [recentlyUsed, setRecentlyUsed] = useState<typeof MOCK_RESPONSES>([])

  // Simula o carregamento de respostas recentes do localStorage ou API
  useEffect(() => {
    // Em uma aplicação real, isso viria do localStorage ou de uma API
    setRecentlyUsed([MOCK_RESPONSES[0], MOCK_RESPONSES[4]])
  }, [])

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

  const handleSelectResponse = (content: string) => {
    onSelectResponse(content)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Zap className="mr-2 h-4 w-4" />
          Respostas Rápidas
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar resposta rápida..." value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>Nenhuma resposta encontrada.</CommandEmpty>

            {searchTerm === "" && (
              <CommandGroup heading="Recentes">
                {recentlyUsed.map((response) => (
                  <CommandItem
                    key={`recent-${response.id}`}
                    onSelect={() => handleSelectResponse(response.content)}
                    className="flex flex-col items-start"
                  >
                    <div className="font-medium">{response.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-1">{response.content}</div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <CommandGroup heading="Categorias">
              <CommandItem onSelect={() => setSelectedCategory(null)} className="flex items-center justify-between">
                <div className="flex items-center">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span>Todas as categorias</span>
                </div>
                {selectedCategory === null && <ChevronRight className="h-4 w-4" />}
              </CommandItem>

              {MOCK_CATEGORIES.map((category) => (
                <CommandItem
                  key={category.id}
                  onSelect={() => setSelectedCategory(category.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  {selectedCategory === category.id && <ChevronRight className="h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Respostas Disponíveis">
              {filteredResponses.map((response) => (
                <CommandItem
                  key={response.id}
                  onSelect={() => handleSelectResponse(response.content)}
                  className="flex flex-col items-start"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium">{response.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {MOCK_CATEGORIES.find((c) => c.id === response.category)?.name}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{response.content}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
