"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  X,
  Trash2,
  RefreshCw,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  QrCode,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

// Dados de exemplo para conexões
const conexoes = [
  {
    id: 1,
    tipo: "whatsapp",
    nome: "WhatsApp Suporte",
    numero: "+55 11 98765-4321",
    status: "conectado",
    ultimaConexao: "Há 2 horas",
    mensagensHoje: 145,
  },
  {
    id: 2,
    tipo: "instagram",
    nome: "Instagram Oficial",
    usuario: "@empresa_oficial",
    status: "conectado",
    ultimaConexao: "Há 5 horas",
    mensagensHoje: 78,
  },
  {
    id: 3,
    tipo: "facebook",
    nome: "Facebook Página",
    pagina: "Empresa Oficial",
    status: "desconectado",
    ultimaConexao: "Há 2 dias",
    mensagensHoje: 0,
  },
  {
    id: 4,
    tipo: "telegram",
    nome: "Telegram Vendas",
    usuario: "@empresa_vendas",
    status: "conectado",
    ultimaConexao: "Há 1 hora",
    mensagensHoje: 32,
  },
  {
    id: 5,
    tipo: "whatsapp",
    nome: "WhatsApp Vendas",
    numero: "+55 11 91234-5678",
    status: "pendente",
    ultimaConexao: "Nunca",
    mensagensHoje: 0,
  },
]

export default function ConexoesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("todas")
  const [showQrCode, setShowQrCode] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51NzT7RJKqzKMVFmQYou6dTrC8eJY2hVKM...")

  // Filtrar conexões com base na aba ativa
  const filteredConexoes = activeTab === "todas" ? conexoes : conexoes.filter((conexao) => conexao.tipo === activeTab)

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "Chave API copiada",
      description: "A chave API foi copiada para a área de transferência.",
    })
  }

  const handleReconectar = (id: number) => {
    toast({
      title: "Reconexão iniciada",
      description: "Tentando reconectar o canal de comunicação...",
    })
  }

  const handleDesconectar = (id: number) => {
    toast({
      title: "Canal desconectado",
      description: "O canal de comunicação foi desconectado com sucesso.",
    })
  }

  const handleExcluir = (id: number) => {
    toast({
      title: "Canal excluído",
      description: "O canal de comunicação foi excluído com sucesso.",
    })
  }

  // Renderizar ícone do canal
  const renderCanalIcon = (tipo: string) => {
    switch (tipo) {
      case "whatsapp":
        return (
          <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        )
      case "instagram":
        return (
          <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
            <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
        )
      case "facebook":
        return (
          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        )
      case "telegram":
        return (
          <div className="bg-sky-100 dark:bg-sky-900/20 p-3 rounded-full">
            <svg className="h-6 w-6 text-sky-600 dark:text-sky-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0Zm.16 2.014a9.986 9.986 0 0 1 7.11 2.947 9.986 9.986 0 0 1 2.944 7.112 9.986 9.986 0 0 1-2.944 7.112 9.986 9.986 0 0 1-7.11 2.947 9.986 9.986 0 0 1-7.113-2.947 9.986 9.986 0 0 1-2.944-7.112 9.986 9.986 0 0 1 2.944-7.112 9.986 9.986 0 0 1 7.113-2.947ZM5.275 11.257c-.252.003-.464.21-.492.46-.003.03-.003.058 0 .087v.002c.213 2.112 1.037 4.109 2.347 5.832 1.27 1.673 2.975 3.013 4.907 3.85.543.234 1.106.425 1.682.57a.478.478 0 0 0 .128.018.478.478 0 0 0 .462-.356l.667-2.244c.07-.235-.07-.484-.308-.555a8.254 8.254 0 0 1-2.085-.967 8.315 8.315 0 0 1-3.12-3.133.478.478 0 0 0-.155-.155.478.478 0 0 0-.538.093L7.408 15.992a.478.478 0 0 1-.537.07 11.36 11.36 0 0 1-2.163-1.405.478.478 0 0 1-.07-.667l1.273-1.76a.478.478 0 0 0 .093-.538.478.478 0 0 0-.155-.155 8.322 8.322 0 0 1-2.973-5.298.478.478 0 0 0-.472-.416h-.002a.478.478 0 0 0-.127.018v.002Z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
        )
    }
  }

  // Renderizar status do canal
  const renderStatus = (status: string) => {
    switch (status) {
      case "conectado":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Conectado
          </Badge>
        )
      case "desconectado":
        return (
          <Badge
            variant="outline"
            className="text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"
          >
            <X className="mr-1 h-3 w-3" />
            Desconectado
          </Badge>
        )
      case "pendente":
        return (
          <Badge
            variant="outline"
            className="text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800"
          >
            <AlertCircle className="mr-1 h-3 w-3" />
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conexões</h1>
          <p className="text-muted-foreground">Gerencie suas conexões com canais de comunicação</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nova Conexão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar nova conexão</DialogTitle>
              <DialogDescription>Conecte um novo canal de comunicação à plataforma Help360</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="canal">Canal</Label>
                <Tabs defaultValue="whatsapp" className="w-full">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    <TabsTrigger value="telegram">Telegram</TabsTrigger>
                  </TabsList>
                  <TabsContent value="whatsapp" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome da conexão</Label>
                      <Input id="nome" placeholder="Ex: WhatsApp Suporte" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número de telefone</Label>
                      <Input id="numero" placeholder="Ex: +55 11 98765-4321" />
                    </div>
                    <Alert>
                      <Smartphone className="h-4 w-4" />
                      <AlertTitle>Conexão via QR Code</AlertTitle>
                      <AlertDescription>
                        Para conectar o WhatsApp, você precisará escanear um QR Code com seu telefone.
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-center">
                      <Button onClick={() => setShowQrCode(true)}>
                        <QrCode className="mr-2 h-4 w-4" />
                        Gerar QR Code
                      </Button>
                    </div>
                    {showQrCode && (
                      <div className="border rounded-lg p-4 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg mb-4">
                          <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="h-48 w-48" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          Escaneie este QR Code com o WhatsApp no seu telefone para conectar
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setShowQrCode(false)}>
                            Cancelar
                          </Button>
                          <Button size="sm">
                            <RefreshCw className="mr-2 h-3 w-3" />
                            Atualizar QR Code
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="instagram" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-instagram">Nome da conexão</Label>
                      <Input id="nome-instagram" placeholder="Ex: Instagram Oficial" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usuario">Nome de usuário</Label>
                      <Input id="usuario" placeholder="Ex: @empresa_oficial" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex">
                        <Input
                          id="api-key"
                          type={showApiKey ? "text" : "password"}
                          value={apiKey}
                          className="rounded-r-none"
                        />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="rounded-l-none border-l-0"
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Obter API Key
                      </Button>
                      <Button onClick={handleCopyApiKey}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="facebook" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-facebook">Nome da conexão</Label>
                      <Input id="nome-facebook" placeholder="Ex: Facebook Página" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pagina">Nome da página</Label>
                      <Input id="pagina" placeholder="Ex: Empresa Oficial" />
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Autorização necessária</AlertTitle>
                      <AlertDescription>
                        Você precisará autorizar o Help360 a acessar sua página do Facebook.
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-center">
                      <Button>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Conectar com Facebook
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="telegram" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-telegram">Nome da conexão</Label>
                      <Input id="nome-telegram" placeholder="Ex: Telegram Vendas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="token">Token do Bot</Label>
                      <div className="flex">
                        <Input
                          id="token"
                          type={showApiKey ? "text" : "password"}
                          placeholder="Ex: 123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
                          className="rounded-r-none"
                        />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="rounded-l-none border-l-0"
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Criação de Bot</AlertTitle>
                      <AlertDescription>
                        Você precisa criar um bot no Telegram usando o BotFather para obter o token.
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-end">
                      <Button variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Como criar um bot
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Adicionar Conexão</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <Tabs defaultValue="todas" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="telegram">Telegram</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConexoes.map((conexao, index) => (
              <motion.div
                key={conexao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {renderCanalIcon(conexao.tipo)}
                        <div>
                          <CardTitle className="text-lg">{conexao.nome}</CardTitle>
                          <CardDescription>
                            {conexao.tipo === "whatsapp" && conexao.numero}
                            {conexao.tipo === "instagram" && conexao.usuario}
                            {conexao.tipo === "facebook" && conexao.pagina}
                            {conexao.tipo === "telegram" && conexao.usuario}
                          </CardDescription>
                        </div>
                      </div>
                      {renderStatus(conexao.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Última conexão:</span>
                        <span>{conexao.ultimaConexao}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mensagens hoje:</span>
                        <span className="font-medium">{conexao.mensagensHoje}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm">Status da API</span>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Operacional
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`ativo-${conexao.id}`}
                        checked={conexao.status === "conectado"}
                        disabled={conexao.status === "pendente"}
                      />
                      <Label htmlFor={`ativo-${conexao.id}`} className="text-sm">
                        Ativo
                      </Label>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleReconectar(conexao.id)}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Excluir conexão</DialogTitle>
                            <DialogDescription>
                              Tem certeza que deseja excluir a conexão "{conexao.nome}"? Esta ação não pode ser
                              desfeita.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2 sm:justify-end">
                            <Button variant="outline" type="button">
                              Cancelar
                            </Button>
                            <Button variant="destructive" type="button" onClick={() => handleExcluir(conexao.id)}>
                              Excluir
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            {/* Card para adicionar nova conexão */}
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: filteredConexoes.length * 0.1 }}
                >
                  <Card className="overflow-hidden h-full border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <div className="rounded-full bg-primary/10 p-3 mb-4">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">Nova Conexão</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-[200px]">
                        Adicione um novo canal de comunicação
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar nova conexão</DialogTitle>
                  <DialogDescription>Conecte um novo canal de comunicação à plataforma Help360</DialogDescription>
                </DialogHeader>
                {/* Conteúdo do diálogo (mesmo conteúdo do diálogo anterior) */}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de API</CardTitle>
          <CardDescription>Gerencie as configurações globais para todas as conexões</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Chave API</Label>
            <div className="flex">
              <Input id="api-key" type={showApiKey ? "text" : "password"} value={apiKey} className="rounded-r-none" />
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="rounded-l-none border-l-0"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="outline" type="button" onClick={handleCopyApiKey} className="rounded-l-none border-l-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="webhook">Webhook ativo</Label>
                <p className="text-sm text-muted-foreground">Receber notificações em tempo real de todas as conexões</p>
              </div>
              <Switch id="webhook" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-resposta">Auto-resposta</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar mensagem automática quando nenhum agente estiver disponível
                </p>
              </div>
              <Switch id="auto-resposta" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="log">Registro de logs</Label>
                <p className="text-sm text-muted-foreground">Manter logs detalhados de todas as comunicações</p>
              </div>
              <Switch id="log" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">Restaurar Padrões</Button>
          <Button>Salvar Configurações</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
