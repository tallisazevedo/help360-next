"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Eye, MessageSquare, Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface WikiArticleListProps {
  filter: "recentes" | "populares" | "favoritos" | "contribuicoes"
}

const articles = [
  {
    id: "1",
    title: "Como configurar uma nova fila de atendimento",
    excerpt: "Guia completo para configurar e otimizar filas de atendimento no sistema Help360.",
    author: {
      name: "Maria Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Gerente de Qualidade",
    },
    category: "Tutoriais",
    tags: ["Filas", "Configuração", "Atendimento"],
    views: 342,
    likes: 28,
    comments: 5,
    createdAt: new Date("2023-03-15"),
    isFavorite: true,
  },
  {
    id: "2",
    title: "Melhores práticas para gestão de não conformidades",
    excerpt: "Aprenda como gerenciar não conformidades de forma eficiente seguindo as melhores práticas do mercado.",
    author: {
      name: "João Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Analista de Qualidade",
    },
    category: "Processos",
    tags: ["Qualidade", "ISO 9001", "Não Conformidades"],
    views: 256,
    likes: 19,
    comments: 3,
    createdAt: new Date("2023-03-10"),
    isFavorite: false,
  },
  {
    id: "3",
    title: "Guia de integração com WhatsApp Business API",
    excerpt: "Passo a passo para integrar o WhatsApp Business API com a plataforma Help360.",
    author: {
      name: "Carlos Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Desenvolvedor",
    },
    category: "Tutoriais",
    tags: ["Integração", "WhatsApp", "API"],
    views: 189,
    likes: 15,
    comments: 2,
    createdAt: new Date("2023-03-05"),
    isFavorite: true,
  },
  {
    id: "4",
    title: "Procedimento para auditoria interna de qualidade",
    excerpt: "Procedimento detalhado para realização de auditorias internas conforme requisitos da ISO 9001.",
    author: {
      name: "Ana Pereira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Auditora",
    },
    category: "Processos",
    tags: ["Auditoria", "ISO 9001", "Qualidade"],
    views: 178,
    likes: 12,
    comments: 4,
    createdAt: new Date("2023-03-01"),
    isFavorite: false,
  },
]

export function WikiArticleList({ filter }: WikiArticleListProps) {
  const [favorites, setFavorites] = useState<string[]>(
    articles.filter((article) => article.isFavorite).map((article) => article.id),
  )

  const toggleFavorite = (articleId: string) => {
    setFavorites((current) =>
      current.includes(articleId) ? current.filter((id) => id !== articleId) : [...current, articleId],
    )
  }

  // Filtra os artigos com base no filtro selecionado
  const filteredArticles = articles.filter((article) => {
    if (filter === "favoritos") return favorites.includes(article.id)
    if (filter === "contribuicoes") return article.author.name === "Maria Silva"
    return true
  })

  // Ordena os artigos com base no filtro selecionado
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (filter === "populares") return b.views - a.views
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-4">
      {sortedArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <Badge variant="outline" className="mb-2 w-fit">
                {article.category}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(article.id)}>
                <Star
                  className={`h-4 w-4 ${favorites.includes(article.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                />
              </Button>
            </div>
            <CardTitle className="line-clamp-2 text-xl">
              <Link href={`/wiki/${article.id}`} className="hover:underline">
                {article.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="line-clamp-2 text-muted-foreground">{article.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/40 px-6 py-3">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>
                    {article.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {article.author.name} •{" "}
                  {formatDistanceToNow(new Date(article.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{article.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{article.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{article.comments}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
