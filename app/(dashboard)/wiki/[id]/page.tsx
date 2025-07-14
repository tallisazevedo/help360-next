"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Star,
  Clock,
  Calendar,
  Share2,
  Printer,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Edit,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

// Dados de exemplo para o artigo
const artigo = {
  id: "1",
  titulo: "Guia Completo de Atendimento ao Cliente via WhatsApp",
  conteudo: `
    <h2>Introdução</h2>
    <p>O WhatsApp se tornou uma das principais ferramentas de comunicação com clientes. Este guia apresenta as melhores práticas para um atendimento eficiente e de qualidade através desta plataforma.</p>
    
    <h2>Configuração Inicial</h2>
    <p>Antes de iniciar o atendimento via WhatsApp, é importante configurar corretamente o perfil comercial:</p>
    <ul>
      <li>Utilize uma foto de perfil profissional com o logo da empresa</li>
      <li>Configure uma mensagem de saudação automática</li>
      <li>Defina horários de atendimento claros na descrição</li>
      <li>Ative as confirmações de leitura para melhor acompanhamento</li>
    </ul>
    
    <h2>Boas Práticas de Atendimento</h2>
    <p>Para garantir um atendimento de qualidade, siga estas recomendações:</p>
    <ol>
      <li>Responda rapidamente - idealmente em até 5 minutos</li>
      <li>Personalize o atendimento usando o nome do cliente</li>
      <li>Utilize uma linguagem clara e profissional</li>
      <li>Evite gírias e abreviações excessivas</li>
      <li>Use emojis com moderação para humanizar a conversa</li>
      <li>Envie mensagens concisas e objetivas</li>
    </ol>
    
    <h2>Recursos Avançados</h2>
    <p>Aproveite os recursos avançados do WhatsApp Business:</p>
    <ul>
      <li>Catálogo de produtos para facilitar a apresentação</li>
      <li>Mensagens rápidas para respostas padronizadas</li>
      <li>Etiquetas para organizar conversas por status</li>
      <li>Estatísticas para acompanhar o desempenho</li>
    </ul>
    
    <h2>Resolução de Problemas</h2>
    <p>Ao lidar com reclamações ou problemas:</p>
    <ul>
      <li>Mantenha a calma e seja empático</li>
      <li>Não discuta com o cliente, mesmo que ele esteja equivocado</li>
      <li>Ofereça soluções práticas e viáveis</li>
      <li>Faça follow-up para garantir que o problema foi resolvido</li>
    </ul>
    
    <h2>Integração com Outros Canais</h2>
    <p>O WhatsApp deve ser parte de uma estratégia omnichannel:</p>
    <ul>
      <li>Mantenha o histórico de atendimento integrado com outros canais</li>
      <li>Direcione o cliente para o canal mais adequado quando necessário</li>
      <li>Garanta consistência nas informações entre todos os canais</li>
    </ul>
    
    <h2>Métricas de Acompanhamento</h2>
    <p>Monitore regularmente estas métricas:</p>
    <ul>
      <li>Tempo médio de resposta</li>
      <li>Taxa de resolução no primeiro contato</li>
      <li>Nível de satisfação do cliente</li>
      <li>Volume de atendimentos por período</li>
    </ul>
    
    <h2>Conclusão</h2>
    <p>O atendimento via WhatsApp, quando bem executado, pode aumentar significativamente a satisfação do cliente e a eficiência operacional. Siga estas diretrizes e adapte-as à realidade da sua empresa para obter os melhores resultados.</p>
  `,
  autor: {
    nome: "Amanda Rodrigues",
    cargo: "Especialista em Atendimento",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  dataCriacao: "2023-02-15",
  dataAtualizacao: "2023-03-10",
  categoria: "Atendimento ao Cliente",
  subcategoria: "Canais Digitais",
  tags: ["WhatsApp", "Atendimento Digital", "Comunicação", "Boas Práticas"],
  visualizacoes: 342,
  curtidas: 28,
  comentarios: 5,
  favoritos: 17,
  tempoLeitura: 8,
  relacionados: [
    { id: "2", titulo: "Integrando WhatsApp com CRM" },
    { id: "3", titulo: "Templates de Mensagens para Atendimento" },
    { id: "4", titulo: "Métricas de Sucesso em Atendimento Digital" },
  ],
}

export default function WikiArtigoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isFavorito, setIsFavorito] = useState(false)
  const [comentario, setComentario] = useState("")
  const [progresso, setProgresso] = useState(0)

  // Simular progresso de leitura ao rolar a página
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
      setProgresso(Math.min(Math.round(scrollPercentage), 100))
    })
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.push("/wiki")}>
          <ChevronLeft className="h-4 w-4" />
          Voltar para Wiki
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsFavorito(!isFavorito)}>
            <Star className={`h-4 w-4 ${isFavorito ? "fill-yellow-400 text-yellow-400" : ""}`} />
            {isFavorito ? "Favoritado" : "Favoritar"}
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">{artigo.titulo}</h1>

                  <div className="flex flex-wrap gap-2">
                    {artigo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Atualizado em {new Date(artigo.dataAtualizacao).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{artigo.tempoLeitura} min de leitura</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{artigo.curtidas}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{artigo.comentarios}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>{artigo.favoritos}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={artigo.autor.avatar} alt={artigo.autor.nome} />
                    <AvatarFallback>{artigo.autor.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{artigo.autor.nome}</div>
                    <div className="text-sm text-muted-foreground">{artigo.autor.cargo}</div>
                  </div>
                </div>

                <Separator />

                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: artigo.conteudo }} />
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Este artigo foi útil?</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        Sim
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4 rotate-180" />
                        Não
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Deixe um comentário</h3>
                    <Textarea
                      placeholder="Escreva seu comentário aqui..."
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button>Enviar Comentário</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Seu progresso</div>
                <Progress value={progresso} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">{progresso}% concluído</div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Categoria</div>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className="justify-start">
                    {artigo.categoria}
                  </Badge>
                  <Badge variant="outline" className="justify-start">
                    {artigo.subcategoria}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Artigos relacionados</div>
                <div className="space-y-2">
                  {artigo.relacionados.map((relacionado) => (
                    <Button
                      key={relacionado.id}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => router.push(`/wiki/${relacionado.id}`)}
                    >
                      {relacionado.titulo}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Ações</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Reportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
