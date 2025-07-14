"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, Filter, Calendar, Users, MessageSquare, ChevronRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

// Dados de exemplo
const initialCampaigns = [
  {
    id: "1",
    name: "Lançamento Produto X",
    status: "scheduled",
    scheduledFor: "2023-08-15T10:00:00Z",
    targetGroups: ["Clientes Premium", "Leads Qualificados"],
    messageCount: 2,
    contactCount: 245,
    progress: 0,
    createdAt: "2023-07-30T14:30:00Z",
  },
  {
    id: "2",
    name: "Promoção de Aniversário",
    status: "active",
    scheduledFor: "2023-08-01T08:00:00Z",
    targetGroups: ["Aniversariantes do Mês"],
    messageCount: 1,
    contactCount: 42,
    progress: 65,
    createdAt: "2023-07-25T11:15:00Z",
  },
  {
    id: "3",
    name: "Reativação de Clientes",
    status: "completed",
    scheduledFor: "2023-07-20T09:30:00Z",
    targetGroups: ["Inativos 90 dias"],
    messageCount: 3,
    contactCount: 213,
    progress: 100,
    createdAt: "2023-07-15T16:45:00Z",
  },
  {
    id: "4",
    name: "Pesquisa de Satisfação",
    status: "draft",
    scheduledFor: null,
    targetGroups: [],
    messageCount: 1,
    contactCount: 0,
    progress: 0,
    createdAt: "2023-08-02T10:20:00Z",
  },
]

// Grupos de exemplo
const availableGroups = [
  { id: "1", name: "Clientes Premium", contactCount: 156 },
  { id: "2", name: "Leads Qualificados", contactCount: 89 },
  { id: "3", name: "Aniversariantes do Mês", contactCount: 42 },
  { id: "4", name: "Inativos 90 dias", contactCount: 213 },
]

export default function CampanhasPage() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isMetaPolicyDialogOpen, setIsMetaPolicyDialogOpen] = useState(false)
  const [newCampaign, setNewCampaign] = useState({ name: "" })

  // Filtrar campanhas com base na pesquisa e na aba ativa
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && campaign.status === "active") ||
      (activeTab === "scheduled" && campaign.status === "scheduled") ||
      (activeTab === "completed" && campaign.status === "completed") ||
      (activeTab === "draft" && campaign.status === "draft")
    return matchesSearch && matchesTab
  })

  // Função para criar nova campanha
  const handleCreateCampaign = () => {
    setIsCreateDialogOpen(false)
    setIsMetaPolicyDialogOpen(true)
  }

  // Função para confirmar políticas e prosseguir
  const handleConfirmPolicy = () => {
    const id = Math.random().toString(36).substring(2, 9)
    const newCampaignWithId = {
      ...newCampaign,
      id,
      status: "draft",
      scheduledFor: null,
      targetGroups: [],
      messageCount: 0,
      contactCount: 0,
      progress: 0,
      createdAt: new Date().toISOString(),
    }
    setCampaigns([...campaigns, newCampaignWithId])
    setNewCampaign({ name: "" })
    setIsMetaPolicyDialogOpen(false)

    // Simular redirecionamento para a página de edição da campanha
    toast({
      title: "Campanha criada",
      description: `A campanha "${newCampaign.name}" foi criada com sucesso.`,
    })

    // Em um cenário real, redirecionaria para a página de edição
    // router.push(`/marketing/campanhas/${id}/edit`)
  }

  // Formatação de data
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Não agendada"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Obter o status em português
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Em andamento"
      case "scheduled":
        return "Agendada"
      case "completed":
        return "Concluída"
      case "draft":
        return "Rascunho"
      default:
        return status
    }
  }

  // Obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "scheduled":
        return "bg-amber-500"
      case "completed":
        return "bg-green-500"
      case "draft":
        return "bg-slate-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campanhas</h1>
          <p className="text-muted-foreground">Crie e gerencie suas campanhas de marketing para WhatsApp</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Campanha</DialogTitle>
              <DialogDescription>
                Dê um nome para sua campanha. Você poderá configurar os detalhes no próximo passo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Nome da Campanha</label>
                <Input
                  id="name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="Ex: Lançamento Produto X"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCampaign} disabled={!newCampaign.name}>
                Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar campanhas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Em andamento</TabsTrigger>
            <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            {filteredCampaigns.length} {filteredCampaigns.length === 1 ? "campanha" : "campanhas"}
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">{campaign.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(campaign.scheduledFor)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {campaign.targetGroups.length > 0
                          ? campaign.targetGroups.join(", ")
                          : "Nenhum grupo selecionado"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {campaign.messageCount} {campaign.messageCount === 1 ? "mensagem" : "mensagens"}
                      </span>
                    </div>
                    {campaign.status === "active" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progresso</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Criada em {formatDate(campaign.createdAt)}</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    {campaign.status === "draft" ? "Editar" : "Detalhes"}
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo de Políticas da Meta */}
      <AlertDialog open={isMetaPolicyDialogOpen} onOpenChange={setIsMetaPolicyDialogOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              Políticas de Mensagens da Meta
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <div>
                  Antes de prosseguir com a criação da sua campanha, é importante estar ciente das políticas da Meta
                  (Facebook) para envio de mensagens em massa via WhatsApp:
                </div>
                <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                  <div className="font-medium">Ao criar esta campanha, você concorda que:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Não enviará mensagens para contatos que não deram consentimento explícito</li>
                    <li>Não enviará conteúdo promocional sem aprovação prévia da Meta</li>
                    <li>Respeitará os limites de frequência de envio estabelecidos pela plataforma</li>
                    <li>Não enviará conteúdo proibido pelas diretrizes da Meta</li>
                    <li>
                      Está ciente que o descumprimento dessas políticas pode resultar em bloqueio temporário ou
                      permanente do seu número WhatsApp Business
                    </li>
                  </ul>
                  <div className="mt-4">
                    Recomendamos fortemente que você leia as{" "}
                    <a href="#" className="text-primary underline">
                      Políticas Oficiais da Meta para WhatsApp Business
                    </a>{" "}
                    antes de prosseguir.
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPolicy}>Concordo com as políticas</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
