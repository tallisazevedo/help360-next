"use client"

import { Separator } from "@/components/ui/separator"

import { Switch } from "@/components/ui/switch"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import {
  Shield,
  Users,
  AlertTriangle,
  Lock,
  Key,
  UserCheck,
  RefreshCw,
  Eye,
  LogIn,
  LogOut,
  UserX,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Tipos
interface SecurityEvent {
  id: string
  type: "login" | "logout" | "failed_login" | "password_change" | "permission_change" | "account_locked"
  user: {
    name: string
    email: string
    avatar?: string
  }
  ip: string
  location: string
  timestamp: string
  details?: string
}

// Dados de exemplo
const securityEvents: SecurityEvent[] = [
  {
    id: "event1",
    type: "login",
    user: {
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "192.168.1.1",
    location: "São Paulo, Brasil",
    timestamp: "2023-06-15T10:30:00Z",
  },
  {
    id: "event2",
    type: "failed_login",
    user: {
      name: "Maria Oliveira",
      email: "maria.oliveira@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "203.0.113.45",
    location: "Rio de Janeiro, Brasil",
    timestamp: "2023-06-15T09:45:00Z",
    details: "Senha incorreta (3ª tentativa)",
  },
  {
    id: "event3",
    type: "password_change",
    user: {
      name: "Carlos Santos",
      email: "carlos.santos@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "198.51.100.23",
    location: "Belo Horizonte, Brasil",
    timestamp: "2023-06-14T16:20:00Z",
  },
  {
    id: "event4",
    type: "permission_change",
    user: {
      name: "Ana Costa",
      email: "ana.costa@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "192.168.1.1",
    location: "São Paulo, Brasil",
    timestamp: "2023-06-14T14:15:00Z",
    details: "Permissões atualizadas: Administrador → Usuário",
  },
  {
    id: "event5",
    type: "account_locked",
    user: {
      name: "Pedro Alves",
      email: "pedro.alves@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "203.0.113.45",
    location: "Curitiba, Brasil",
    timestamp: "2023-06-14T11:05:00Z",
    details: "Conta bloqueada após 5 tentativas de login malsucedidas",
  },
  {
    id: "event6",
    type: "logout",
    user: {
      name: "Juliana Mendes",
      email: "juliana.mendes@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "198.51.100.23",
    location: "Porto Alegre, Brasil",
    timestamp: "2023-06-14T10:30:00Z",
  },
  {
    id: "event7",
    type: "login",
    user: {
      name: "Roberto Oliveira",
      email: "roberto.oliveira@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "192.168.1.1",
    location: "São Paulo, Brasil",
    timestamp: "2023-06-14T09:45:00Z",
  },
  {
    id: "event8",
    type: "failed_login",
    user: {
      name: "Fernanda Lima",
      email: "fernanda.lima@exemplo.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    ip: "203.0.113.45",
    location: "Recife, Brasil",
    timestamp: "2023-06-13T16:20:00Z",
    details: "Usuário não encontrado",
  },
]

export function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [eventTypeFilter, setEventTypeFilter] = useState("")

  // Filtrar eventos
  const filteredEvents = securityEvents.filter((event) => {
    const matchesSearch =
      event.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ip.includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = eventTypeFilter ? event.type === eventTypeFilter : true

    return matchesSearch && matchesType
  })

  // Estatísticas
  const stats = {
    securityScore: 85,
    activeUsers: 42,
    securityAlerts: 3,
    mfaEnabled: 38,
    totalUsers: 45,
  }

  // Renderizar ícone do evento
  const renderEventIcon = (type: SecurityEvent["type"]) => {
    switch (type) {
      case "login":
        return <LogIn className="h-4 w-4 text-green-500" />
      case "logout":
        return <LogOut className="h-4 w-4 text-blue-500" />
      case "failed_login":
        return <UserX className="h-4 w-4 text-red-500" />
      case "password_change":
        return <Key className="h-4 w-4 text-amber-500" />
      case "permission_change":
        return <UserCheck className="h-4 w-4 text-purple-500" />
      case "account_locked":
        return <Lock className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Renderizar nome do evento
  const renderEventName = (type: SecurityEvent["type"]) => {
    switch (type) {
      case "login":
        return "Login"
      case "logout":
        return "Logout"
      case "failed_login":
        return "Falha no Login"
      case "password_change":
        return "Alteração de Senha"
      case "permission_change":
        return "Alteração de Permissão"
      case "account_locked":
        return "Conta Bloqueada"
      default:
        return "Evento Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="events">Eventos de Segurança</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pontuação de Segurança</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.securityScore}/100</h3>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <Progress value={stats.securityScore} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Usuários Ativos</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.activeUsers}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {stats.mfaEnabled} de {stats.totalUsers} com 2FA ativado
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Alertas de Segurança</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.securityAlerts}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {stats.securityAlerts > 0 ? "Requer atenção" : "Nenhum alerta pendente"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações de Segurança</CardTitle>
              <CardDescription>Melhore a segurança da sua plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <Key className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium">Ative a autenticação de dois fatores (2FA)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    7 usuários ainda não ativaram a autenticação de dois fatores. Isso aumenta o risco de acesso não
                    autorizado.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Configurar 2FA
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <RefreshCw className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium">Atualize as políticas de senha</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Suas políticas de senha não atendem aos padrões recomendados. Considere exigir senhas mais fortes.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Atualizar Políticas
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Eye className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">Revise os logs de acesso</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Detectamos alguns padrões incomuns de login. Recomendamos revisar os logs de acesso recentes.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Ver Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar eventos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os Eventos</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="failed_login">Falha no Login</SelectItem>
                  <SelectItem value="password_change">Alteração de Senha</SelectItem>
                  <SelectItem value="permission_change">Alteração de Permissão</SelectItem>
                  <SelectItem value="account_locked">Conta Bloqueada</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>IP / Localização</TableHead>
                    <TableHead>Data e Hora</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {renderEventIcon(event.type)}
                          <span>{renderEventName(event.type)}</span>
                        </div>
                        {event.details && <p className="text-xs text-muted-foreground mt-1">{event.details}</p>}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={event.user.avatar} alt={event.user.name} />
                            <AvatarFallback>{event.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{event.user.name}</div>
                            <div className="text-xs text-muted-foreground">{event.user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{event.ip}</div>
                        <div className="text-xs text-muted-foreground">{event.location}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(event.timestamp).toLocaleTimeString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.timestamp).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Investigar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Marcar como Revisado</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Políticas de Segurança</CardTitle>
              <CardDescription>Configure as políticas de segurança da sua plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Políticas de Senha</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Comprimento mínimo da senha</Label>
                    <Select defaultValue="8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 caracteres</SelectItem>
                        <SelectItem value="8">8 caracteres</SelectItem>
                        <SelectItem value="10">10 caracteres</SelectItem>
                        <SelectItem value="12">12 caracteres</SelectItem>
                        <SelectItem value="14">14 caracteres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Expiração de senha</Label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="180">180 dias</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Exigir caracteres especiais</Label>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Exigir letras maiúsculas e minúsculas</Label>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Exigir números</Label>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Impedir reutilização de senhas anteriores</Label>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Autenticação</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Exigir autenticação de dois fatores (2FA)</Label>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Bloquear conta após tentativas de login malsucedidas</Label>
                    <Switch checked={true} />
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Número de tentativas antes do bloqueio</Label>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 tentativas</SelectItem>
                          <SelectItem value="5">5 tentativas</SelectItem>
                          <SelectItem value="10">10 tentativas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Duração do bloqueio</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="1440">24 horas</SelectItem>
                          <SelectItem value="manual">Desbloqueio manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessão</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tempo limite de sessão</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                        <SelectItem value="240">4 horas</SelectItem>
                        <SelectItem value="480">8 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sessões simultâneas permitidas</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 sessão</SelectItem>
                        <SelectItem value="3">3 sessões</SelectItem>
                        <SelectItem value="5">5 sessões</SelectItem>
                        <SelectItem value="unlimited">Ilimitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
