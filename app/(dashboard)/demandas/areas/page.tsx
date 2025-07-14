"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, MoreHorizontal, Users, Briefcase, ArrowRight, Building, Kanban } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados de exemplo para as áreas de trabalho
const areasTrabalho = [
  {
    id: 1,
    nome: "Comercial",
    descricao: "Área de trabalho para equipe comercial",
    icone: <Briefcase className="h-5 w-5" />,
    cor: "bg-blue-500",
    membros: 8,
    quadros: 3,
    demandas: 45,
  },
  {
    id: 2,
    nome: "Jurídico",
    descricao: "Área de trabalho para equipe jurídica",
    icone: <Building className="h-5 w-5" />,
    cor: "bg-purple-500",
    membros: 5,
    quadros: 2,
    demandas: 23,
  },
  {
    id: 3,
    nome: "Suporte",
    descricao: "Área de trabalho para equipe de suporte",
    icone: <Users className="h-5 w-5" />,
    cor: "bg-green-500",
    membros: 12,
    quadros: 4,
    demandas: 78,
  },
  {
    id: 4,
    nome: "Desenvolvimento",
    descricao: "Área de trabalho para equipe de desenvolvimento",
    icone: <Kanban className="h-5 w-5" />,
    cor: "bg-amber-500",
    membros: 15,
    quadros: 6,
    demandas: 92,
  },
]

export default function AreasTrabalhoPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const areasFiltradas = areasTrabalho.filter(
    (area) =>
      area.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAreaClick = (id: number) => {
    router.push(`/demandas/areas/${id}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Áreas de Trabalho</h1>
        <Button onClick={() => {}} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Área
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar áreas..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areasFiltradas.map((area) => (
          <motion.div
            key={area.id}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => handleAreaClick(area.id)}
            className="cursor-pointer"
          >
            <Card className="h-full flex flex-col overflow-hidden border-t-4" style={{ borderTopColor: area.cor }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`${area.cor} p-2 rounded-md text-white`}>{area.icone}</div>
                    <CardTitle className="text-xl">{area.nome}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>Editar área</DropdownMenuItem>
                      <DropdownMenuItem>Gerenciar membros</DropdownMenuItem>
                      <DropdownMenuItem>Ver todos os quadros</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Arquivar área</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">{area.descricao}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-md p-3 text-center">
                    <div className="text-2xl font-bold">{area.quadros}</div>
                    <div className="text-xs text-muted-foreground">Quadros</div>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3 text-center">
                    <div className="text-2xl font-bold">{area.demandas}</div>
                    <div className="text-xs text-muted-foreground">Demandas</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(3, area.membros))].map((_, i) => (
                    <Avatar key={i} className="border-2 border-background h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                  {area.membros > 3 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                      +{area.membros - 3}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver quadros
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
