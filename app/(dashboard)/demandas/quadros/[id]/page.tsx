"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  Users,
  Calendar,
  Paperclip,
  MessageSquare,
  LinkIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Dados de exemplo para o quadro Comercial
const quadroComercial = {
  id: 1,
  nome: "Comercial - Leads",
  descricao: "Gerenciamento de leads e oportunidades comerciais",
  areaTrabalho: "Comercial",
  setor: "Vendas",
  colunas: [
    {
      id: "lead",
      titulo: "Lead",
      cor: "bg-blue-500",
      limite: 0,
      cards: [
        {
          id: 1,
          titulo: "Empresa ABC Ltda",
          descricao: "Interessados em implementar Help360 para equipe de 50 pessoas",
          etiquetas: ["Novo Cliente", "Prioridade Alta"],
          responsavel: {
            nome: "Carlos Silva",
            avatar: "/placeholder.svg?height=32&width=32",
            iniciais: "CS",
          },
          dataLimite: "15/06/2023",
          comentarios: 3,
          anexos: 2,
          ticketsVinculados: 1,
          prioridade: "alta",
        },
        {
          id: 2,
          titulo: "Indústrias XYZ S.A.",
          descricao: "Solicitou demonstração da plataforma",
          etiquetas: ["Demonstração"],
          responsavel: {
            nome: "Ana Costa",
            avatar: "/placeholder.svg?height=32&width=32",
            iniciais: "AC",
          },
          dataLimite: "18/06/2023",
          comentarios: 1,
          anexos: 0,
          ticketsVinculados: 0,
          prioridade: "media",
        },
      ],
    },
    {
      id: "primeiro-contato",
      titulo: "Primeiro Contato",
      cor: "bg-purple-500",
      limite: 0,
      cards: [
        {
          id: 3,
          titulo: "Consultoria Estratégica",
          descricao: "Reunião inicial realizada, aguardando feedback",
          etiquetas: ["Follow-up"],
          responsavel: {
            nome: "Pedro Alves",
            avatar: "/placeholder.svg?height=32&width=32",
            iniciais: "PA",
          },
          dataLimite: "20/06/2023",
          comentarios: 5,
          anexos: 1,
          ticketsVinculados: 2,
          prioridade: "media",
        },
      ],
    },
    {
      id: "reuniao",
      titulo: "Reunião",
      cor: "bg-amber-500",
      limite: 0,
      cards: [
        {
          id: 4,
          titulo: "Distribuidora Nacional",
          descricao: "Reunião de apresentação da proposta agendada",
          etiquetas: ["Proposta", "Reunião"],
          responsavel: {
            nome: "Mariana Santos",
            avatar: "/placeholder.svg?height=32&width=32",
            iniciais: "MS",
          },
          dataLimite: "22/06/2023",
          comentarios: 2,
          anexos: 3,
          ticketsVinculados: 0,
          prioridade: "alta",
        },
        {
          id: 5,
          titulo: "Comércio Rápido ME",
          descricao: "Cliente solicitou reunião para discutir valores",
          etiquetas: ["Negociação"],
          responsavel: {
            nome: "Carlos Silva",
            avatar: "/placeholder.svg?height=32&width=32",
            iniciais: "CS",
          },
          dataLimite: "25/06/2023",
          comentarios: 4,
          anexos: 1,
          ticketsVinculados: 1,
          prioridade: "baixa",
        },
      ],
    },
    {
      id: "fechado",
      titulo: "Fechado",
      cor: "bg-green-500",
      limite: 0,
      cards: [
        {
          id: 6,
          titulo: "Tech Solutions Inc.",
          descricao: "Contrato assinado, encaminhado para jurídico",
          etiquetas: ["Contrato", "Novo Cliente"],
          responsavel: {
            nome: "Ana Costa",
            avatar: "/placeholder.svg?height=32&width=32",
            iniciais: "AC",
          },
          dataLimite: "Concluído",
          comentarios: 8,
          anexos: 5,
          ticketsVinculados: 3,
          prioridade: "concluido",
        },
      ],
    },
  ],
}

export default function QuadroDetalhesPage() {
  const params = useParams()
  const id = params.id
  const [searchTerm, setSearchTerm] = useState("")
  const [quadro, setQuadro] = useState(quadroComercial)
  const [draggedCard, setDraggedCard] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("kanban")

  // Função para lidar com o início do arrasto
  const handleDragStart = (card: any) => {
    setDraggedCard(card)
  }

  // Função para lidar com o drop em uma coluna
  const handleDrop = (colunaId: string) => {
    if (!draggedCard) return

    // Encontrar a coluna de origem e remover o card
    const novasColunas = quadro.colunas.map((coluna) => {
      const cards = coluna.cards.filter((card) => card.id !== draggedCard.id)
      return { ...coluna, cards }
    })

    // Adicionar o card à coluna de destino
    const colunaDestino = novasColunas.find((coluna) => coluna.id === colunaId)
    if (colunaDestino) {
      colunaDestino.cards.push(draggedCard)
    }

    setQuadro({ ...quadro, colunas: novasColunas })
    setDraggedCard(null)
  }

  // Função para permitir o drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Filtrar cards com base no termo de pesquisa
  const filtrarCards = () => {
    if (!searchTerm) return quadro.colunas

    return quadro.colunas.map((coluna) => {
      const cardsFiltrados = coluna.cards.filter(
        (card) =>
          card.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.etiquetas.some((etiqueta) => etiqueta.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      return { ...coluna, cards: cardsFiltrados }
    })
  }

  const colunasFiltradas = filtrarCards()

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/demandas/quadros">
                <ChevronLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <Badge className="bg-blue-500">{quadro.areaTrabalho}</Badge>
            <Badge variant="outline">{quadro.setor}</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{quadro.nome}</h1>
          <p className="text-muted-foreground">{quadro.descricao}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Demanda
          </Button>
        </div>
      </div>

      <Tabs defaultValue="kanban" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="lista">Lista</TabsTrigger>
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar demandas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="kanban" className="mt-0">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {colunasFiltradas.map((coluna) => (
              <div
                key={coluna.id}
                className="flex-shrink-0 w-80"
                onDrop={() => handleDrop(coluna.id)}
                onDragOver={handleDragOver}
              >
                <div className="bg-muted rounded-t-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${coluna.cor}`}></div>
                    <h3 className="font-medium">{coluna.titulo}</h3>
                    <Badge variant="outline" className="ml-1">
                      {coluna.cards.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <ScrollArea className="h-[calc(100vh-280px)] rounded-b-md border bg-background">
                  <div className="p-3 space-y-3">
                    {coluna.cards.map((card) => (
                      <motion.div
                        key={card.id}
                        draggable
                        onDragStart={() => handleDragStart(card)}
                        whileHover={{ y: -2 }}
                        className="cursor-pointer"
                      >
                        <Card className="overflow-hidden">
                          <CardHeader className="p-3 pb-0">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{card.titulo}</CardTitle>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuItem>Editar demanda</DropdownMenuItem>
                                  <DropdownMenuItem>Vincular ticket</DropdownMenuItem>
                                  <DropdownMenuItem>Mover para...</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 pt-2">
                            <p className="text-sm text-muted-foreground mb-3">{card.descricao}</p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {card.etiquetas.map((etiqueta, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {etiqueta}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{card.dataLimite}</span>
                              </div>
                              <div>
                                {card.prioridade === "alta" && <Badge className="bg-red-500 text-xs">Alta</Badge>}
                                {card.prioridade === "media" && <Badge className="bg-amber-500 text-xs">Média</Badge>}
                                {card.prioridade === "baixa" && <Badge className="bg-blue-500 text-xs">Baixa</Badge>}
                                {card.prioridade === "concluido" && (
                                  <Badge className="bg-green-500 text-xs">Concluído</Badge>
                                )}
                              </div>
                            </div>

                            {card.ticketsVinculados > 0 && (
                              <div className="flex items-center gap-1 mb-2">
                                <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {card.ticketsVinculados} ticket{card.ticketsVinculados > 1 ? "s" : ""} vinculado
                                  {card.ticketsVinculados > 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="p-3 pt-0 flex justify-between items-center">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={card.responsavel.avatar} alt={card.responsavel.nome} />
                              <AvatarFallback className="text-xs">{card.responsavel.iniciais}</AvatarFallback>
                            </Avatar>

                            <div className="flex items-center gap-3">
                              {card.comentarios > 0 && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span className="text-xs">{card.comentarios}</span>
                                </div>
                              )}

                              {card.anexos > 0 && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Paperclip className="h-3.5 w-3.5" />
                                  <span className="text-xs">{card.anexos}</span>
                                </div>
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}

                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar demanda
                    </Button>
                  </div>
                </ScrollArea>
              </div>
            ))}

            <div className="flex-shrink-0 w-80">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar coluna
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lista" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Título</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Responsável</th>
                    <th className="text-left p-3 font-medium">Data Limite</th>
                    <th className="text-left p-3 font-medium">Prioridade</th>
                    <th className="text-right p-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {quadro.colunas.flatMap((coluna) =>
                    coluna.cards
                      .filter(
                        (card) =>
                          !searchTerm ||
                          card.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((card) => (
                        <tr key={card.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{card.titulo}</div>
                              <div className="text-sm text-muted-foreground">{card.descricao}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge
                              className={`${coluna.cor.replace("bg-", "bg-")}/20 text-${coluna.cor.replace("bg-", "")}-700 border-${coluna.cor.replace("bg-", "")}-200`}
                            >
                              {coluna.titulo}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={card.responsavel.avatar} alt={card.responsavel.nome} />
                                <AvatarFallback className="text-xs">{card.responsavel.iniciais}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{card.responsavel.nome}</span>
                            </div>
                          </td>
                          <td className="p-3">{card.dataLimite}</td>
                          <td className="p-3">
                            {card.prioridade === "alta" && <Badge className="bg-red-500">Alta</Badge>}
                            {card.prioridade === "media" && <Badge className="bg-amber-500">Média</Badge>}
                            {card.prioridade === "baixa" && <Badge className="bg-blue-500">Baixa</Badge>}
                            {card.prioridade === "concluido" && <Badge className="bg-green-500">Concluído</Badge>}
                          </td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>Editar demanda</DropdownMenuItem>
                                <DropdownMenuItem>Vincular ticket</DropdownMenuItem>
                                <DropdownMenuItem>Mover para...</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )),
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario" className="mt-0">
          <Card className="p-6">
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Visualização de calendário em desenvolvimento</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
