"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  CheckCircle,
  PlusCircle,
  Search,
  MessageSquare,
  Users,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  FileText,
  FileBarChart,
  Megaphone,
  Mail,
  BarChart3,
  Download,
} from "lucide-react"

export function SubscriptionModules() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dados de exemplo dos módulos com ícones
  const modules = {
    included: [
      {
        id: 1,
        name: "Atendimento",
        description: "Gestão de atendimentos multicanal",
        status: "Ativo",
        icon: MessageSquare,
      },
      { id: 2, name: "Clientes", description: "Cadastro e gestão de clientes", status: "Ativo", icon: Users },
      { id: 3, name: "Wiki", description: "Base de conhecimento interna", status: "Ativo", icon: BookOpen },
    ],
    available: [
      {
        id: 4,
        name: "Qualidade",
        description: "Gestão de não conformidades, melhorias e planos de ação",
        price: "R$ 99,90/mês",
        icon: AlertTriangle,
        features: ["Gestão de não conformidades", "Planos de ação", "Melhorias contínuas", "Indicadores de qualidade"],
      },
      {
        id: 5,
        name: "Marketing",
        description: "Campanhas e automação de marketing",
        price: "R$ 149,90/mês",
        icon: Megaphone,
        features: [
          "Campanhas de WhatsApp",
          "Automação de marketing",
          "Segmentação de clientes",
          "Análise de resultados",
        ],
      },
      {
        id: 6,
        name: "Relatórios Avançados",
        description: "Relatórios e dashboards personalizados",
        price: "R$ 79,90/mês",
        icon: BarChart3,
        features: [
          "Dashboards personalizados",
          "Exportação em múltiplos formatos",
          "Agendamento de relatórios",
          "Indicadores de desempenho",
        ],
      },
      {
        id: 7,
        name: "Integrações",
        description: "Conecte com outras ferramentas e sistemas",
        price: "R$ 129,90/mês",
        icon: FileBarChart,
        features: ["API completa", "Webhooks", "Integrações nativas", "Sincronização de dados"],
      },
      {
        id: 8,
        name: "Automação",
        description: "Automatize processos e fluxos de trabalho",
        price: "R$ 119,90/mês",
        icon: Lightbulb,
        features: ["Fluxos de trabalho", "Gatilhos automáticos", "Regras de negócio", "Notificações"],
      },
      {
        id: 9,
        name: "E-mail Marketing",
        description: "Campanhas de e-mail e newsletters",
        price: "R$ 89,90/mês",
        icon: Mail,
        features: ["Templates responsivos", "Segmentação avançada", "Análise de desempenho", "Anti-spam"],
      },
    ],
    purchased: [
      {
        id: 10,
        name: "Documentação",
        description: "Gestão de documentos e controle de versões",
        price: "R$ 69,90/mês",
        status: "Ativo",
        icon: FileText,
        renewalDate: "15/04/2025",
      },
      {
        id: 11,
        name: "Exportação",
        description: "Exportação de dados em diversos formatos",
        price: "R$ 49,90/mês",
        status: "Ativo",
        icon: Download,
        renewalDate: "22/05/2025",
      },
    ],
  }

  // Função para filtrar módulos com base na pesquisa
  const filterModules = (moduleList) => {
    if (!searchQuery) return moduleList
    return moduleList.filter(
      (module) =>
        module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Módulos</CardTitle>
            <CardDescription>Gerencie os módulos da sua assinatura</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar módulos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="included">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="included">Inclusos no Plano</TabsTrigger>
            <TabsTrigger value="purchased">Adquiridos</TabsTrigger>
            <TabsTrigger value="available">Disponíveis</TabsTrigger>
          </TabsList>

          <TabsContent value="included" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {filterModules(modules.included).map((module) => {
                const Icon = module.icon
                return (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 p-1.5 rounded-md bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">{module.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Incluso no plano
                      </div>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="purchased" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {filterModules(modules.purchased).map((module) => {
                const Icon = module.icon
                return (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 p-1.5 rounded-md bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">{module.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <p className="mt-2 text-sm font-medium">{module.price}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Próxima renovação: {module.renewalDate}</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Cancelar módulo
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
              {filterModules(modules.purchased).length === 0 && (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  Nenhum módulo encontrado com os termos de pesquisa.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="available" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {filterModules(modules.available).map((module) => {
                const Icon = module.icon
                return (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <div className="mr-2 p-1.5 rounded-md bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <p className="mt-2 text-sm font-medium">{module.price}</p>
                      <ul className="mt-2 space-y-1">
                        {module.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs">
                            <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button size="sm" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar módulo
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
              {filterModules(modules.available).length === 0 && (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  Nenhum módulo encontrado com os termos de pesquisa.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
