"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Building2, ArrowRight, LogOut, Star, StarOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

// Dados de exemplo para empresas
const empresas = [
  {
    id: 1,
    nome: "Empresa ABC Ltda",
    cnpj: "12.345.678/0001-90",
    logo: "/placeholder.svg?height=80&width=80",
    favorita: true,
    ultimoAcesso: "Há 2 dias",
    modulos: ["Qualidade", "Atendimento", "Documentação"],
  },
  {
    id: 2,
    nome: "XYZ Indústria S.A.",
    cnpj: "98.765.432/0001-10",
    logo: "/placeholder.svg?height=80&width=80",
    favorita: true,
    ultimoAcesso: "Há 1 semana",
    modulos: ["Qualidade", "Segurança"],
  },
  {
    id: 3,
    nome: "Tech Solutions",
    cnpj: "45.678.901/0001-23",
    logo: "/placeholder.svg?height=80&width=80",
    favorita: false,
    ultimoAcesso: "Há 1 mês",
    modulos: ["Atendimento", "Documentação"],
  },
  {
    id: 4,
    nome: "Indústria Nacional Ltda",
    cnpj: "56.789.012/0001-34",
    logo: "/placeholder.svg?height=80&width=80",
    favorita: false,
    ultimoAcesso: "Há 3 meses",
    modulos: ["Qualidade"],
  },
  {
    id: 5,
    nome: "Comércio Geral S.A.",
    cnpj: "67.890.123/0001-45",
    logo: "/placeholder.svg?height=80&width=80",
    favorita: false,
    ultimoAcesso: "Nunca acessado",
    modulos: ["Atendimento"],
  },
]

export default function SelecionarEmpresaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [empresasList, setEmpresasList] = useState(empresas)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState<number | null>(null)

  // Filtrar empresas com base no termo de busca
  useEffect(() => {
    if (searchTerm) {
      const filtered = empresas.filter(
        (empresa) => empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) || empresa.cnpj.includes(searchTerm),
      )
      setEmpresasList(filtered)
    } else {
      setEmpresasList(empresas)
    }
  }, [searchTerm])

  const handleEmpresaSelect = (id: number) => {
    setIsLoading(true)

    // Simulação de seleção de empresa
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Empresa selecionada com sucesso",
        description: "Redirecionando para o dashboard...",
      })
      router.push("/dashboard") // Garantir que redireciona para o dashboard
    }, 1000)
  }

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmpresasList((prev) =>
      prev.map((empresa) => (empresa.id === id ? { ...empresa, favorita: !empresa.favorita } : empresa)),
    )
  }

  // Ordenar empresas: favoritas primeiro, depois por ordem alfabética
  const sortedEmpresas = [...empresasList].sort((a, b) => {
    if (a.favorita && !b.favorita) return -1
    if (!a.favorita && b.favorita) return 1
    return a.nome.localeCompare(b.nome)
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <header className="bg-background border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="https://app.helpdesk360.com.br/static/media/logo_color.cd67e9c711ddcaef62031842d33ac9d4.svg"
              alt="Help360 Logo"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Maria Silva</p>
                <p className="text-xs text-muted-foreground">maria.silva@empresa.com</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Selecione uma empresa</h1>
            <p className="text-muted-foreground">Escolha a empresa que deseja acessar</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome ou CNPJ..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="grid gap-4">
            {sortedEmpresas.length > 0 ? (
              sortedEmpresas.map((empresa, index) => (
                <motion.div
                  key={empresa.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card
                    className={`overflow-hidden transition-all cursor-pointer hover:shadow-md ${
                      selectedEmpresa === empresa.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleEmpresaSelect(empresa.id)}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <div className="relative mr-4">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={empresa.logo} alt={empresa.nome} />
                            <AvatarFallback className="text-lg">
                              {empresa.nome.charAt(0)}
                              {empresa.nome.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-sm hover:bg-background"
                            onClick={(e) => toggleFavorite(empresa.id, e)}
                          >
                            {empresa.favorita ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{empresa.nome}</h3>
                            {empresa.favorita && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                Favorita
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">CNPJ: {empresa.cnpj}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">{empresa.ultimoAcesso}</p>
                            <span className="text-xs text-muted-foreground">•</span>
                            <div className="flex gap-1">
                              {empresa.modulos.map((modulo, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {modulo}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="ml-4">
                          <Button variant="ghost" size="icon" className="text-primary">
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Nenhuma empresa encontrada</h3>
                <p className="text-muted-foreground">Tente buscar com outro termo ou entre em contato com o suporte</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">Carregando empresa...</p>
            <p className="text-sm text-muted-foreground mt-1">Aguarde um momento</p>
          </div>
        </div>
      )}
    </div>
  )
}
