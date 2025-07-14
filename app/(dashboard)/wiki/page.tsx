"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Book, Star, Clock, Calendar, Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Dados de exemplo para artigos
const artigos = [
  {
    id: "1",
    titulo: "Guia Completo de Atendimento ao Cliente via WhatsApp",
    resumo:
      "Aprenda as melhores práticas para oferecer um atendimento eficiente e de qualidade através do WhatsApp Business.",
    categoria: "Atendimento ao Cliente",
    subcategoria: "Canais Digitais",
    tags: ["WhatsApp", "Atendimento Digital"],
    autor: {
      nome: "Amanda Rodrigues",
      cargo: "Especialista em Atendimento",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    dataCriacao: "2023-02-15",
    dataAtualizacao: "2023-03-10",
    visualizacoes: 342,
    tempoLeitura: 8,
    favorito: true,
  },
  {
    id: "2",
    titulo: "Integrando WhatsApp com CRM",
    resumo: "Um guia passo a passo para integrar o WhatsApp Business com os principais sistemas de CRM do mercado.",
    categoria: "Tecnologia",
    subcategoria: "Integrações",
    tags: ["WhatsApp", "CRM", "Integração"],
    autor: {
      nome: "Ricardo Mendes",
      cargo: "Analista de Sistemas",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    dataCriacao: "2023-01-20",
    dataAtualizacao: "2023-02-05",
    visualizacoes: 215,
    tempoLeitura: 12,
    favorito: false,
  },
  {
    id: "3",
    titulo: "Templates de Mensagens para Atendimento",
    resumo: "Coleção de templates prontos para agilizar o atendimento ao cliente em diferentes situações.",
    categoria: "Atendimento ao Cliente",
    subcategoria: "Comunicação",
    tags: ["Templates", "Comunicação", "Mensagens"],
    autor: {
      nome: "Juliana Costa",
      cargo: "Supervisora de Atendimento",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    dataCriacao: "2023-03-05",
    dataAtualizacao: "2023-03-05",
    visualizacoes: 178,
    tempoLeitura: 5,
    favorito: true,
  },
  {
    id: "4",
    titulo: "Métricas de Sucesso em Atendimento Digital",
    resumo:
      "Conheça os principais indicadores para avaliar a qualidade e eficiência do atendimento em canais digitais.",
    categoria: "Gestão",
    subcategoria: "Indicadores",
    tags: ["Métricas", "KPIs", "Atendimento"],
    autor: {
      nome: "Fernando Alves",
      cargo: "Gerente de Operações",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    dataCriacao: "2023-02-28",
    dataAtualizacao: "2023-03-15",
    visualizacoes: 156,
    tempoLeitura: 10,
    favorito: false,
  },
  {
    id: "5",
    titulo: "Estratégias de Automação para Suporte ao Cliente",
    resumo: "Descubra como implementar automações inteligentes para otimizar o atendimento sem perder o toque humano.",
    categoria: "Tecnologia",
    subcategoria: "Automação",
    tags: ["Automação", "Chatbots", "IA"],
    autor: {
      nome: "Carla Sousa",
      cargo: "Especialista em IA",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    dataCriacao: "2023-03-10",
    dataAtualizacao: "2023-03-12",
    visualizacoes: 98,
    tempoLeitura: 15,
    favorito: false,
  },
]

// Dados de exemplo para categorias
const categorias = [
  { id: 1, nome: "Atendimento ao Cliente", artigos: 15 },
  { id: 2, nome: "Tecnologia", artigos: 12 },
  { id: 3, nome: "Gestão", artigos: 8 },
  { id: 4, nome: "Vendas", artigos: 10 },
  { id: 5, nome: "Marketing", artigos: 7 },
  { id: 6, nome: "Recursos Humanos", artigos: 5 },
  { id: 7, nome: "Financeiro", artigos: 6 },
  { id: 8, nome: "Jurídico", artigos: 4 },
]

export default function WikiPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null)

  const filteredArtigos = artigos.filter(
    (artigo) =>
      (searchTerm === "" ||
        artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedCategoria === null || artigo.categoria === categorias.find((c) => c.id === selectedCategoria)?.nome),
  )

  const handleArtigoClick = (id: string) => {
    router.push(`/wiki/${id}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Wiki</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Artigo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 pt-0">
                  <Button
                    variant={selectedCategoria === null ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                    onClick={() => setSelectedCategoria(null)}
                  >
                    Todas as Categorias
                  </Button>
                  {categorias.map((categoria) => (
                    <Button
                      key={categoria.id}
                      variant={selectedCategoria === categoria.id ? "default" : "ghost"}
                      className="w-full justify-between mb-1"
                      onClick={() => setSelectedCategoria(categoria.id)}
                    >
                      <span>{categoria.nome}</span>
                      <Badge variant="secondary" className="ml-2">
                        {categoria.artigos}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Artigos Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {artigos
                  .filter((a) => a.favorito)
                  .map((artigo) => (
                    <Button
                      key={artigo.id}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleArtigoClick(artigo.id)}
                    >
                      <div className="truncate">{artigo.titulo}</div>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar na Wiki..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="recentes" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="recentes">Artigos Recentes</TabsTrigger>
              <TabsTrigger value="populares">Mais Populares</TabsTrigger>
              <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            </TabsList>

            <TabsContent value="recentes" className="space-y-4">
              {filteredArtigos.length > 0 ? (
                filteredArtigos.map((artigo) => (
                  <Card
                    key={artigo.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleArtigoClick(artigo.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{artigo.titulo}</h3>
                            <p className="text-muted-foreground mt-1">{artigo.resumo}</p>
                          </div>
                          {artigo.favorito && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {artigo.categoria}
                          </Badge>
                          {artigo.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={artigo.autor.avatar} alt={artigo.autor.nome} />
                              <AvatarFallback>{artigo.autor.nome.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{artigo.autor.nome}</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(artigo.dataAtualizacao).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{artigo.tempoLeitura} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="populares">
              <Card>
                <CardContent className="p-6">
                  <p>Exibindo artigos mais populares.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favoritos">
              <Card>
                <CardContent className="p-6">
                  <p>Exibindo artigos favoritos.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
