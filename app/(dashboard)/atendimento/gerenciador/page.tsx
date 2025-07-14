import type { Metadata } from "next"
import { Clock, AlertCircle, CheckCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Gerenciador de Atendimento | Help360",
  description: "Gerenciador de atendimento ao cliente Help360",
}

// Dados simulados para atendimentos
const attendances = {
  waiting: [
    {
      id: "1",
      name: "João Silva",
      company: "Empresa ABC",
      message: "Preciso de ajuda com o sistema",
      time: "10:30",
      waitTime: "00:05:30",
      channel: "whatsapp",
      protocol: "PROT-001",
    },
    {
      id: "2",
      name: "Ana Pereira",
      company: "Empresa DEF",
      message: "Preciso de um orçamento",
      time: "10:15",
      waitTime: "00:20:45",
      channel: "email",
      protocol: "PROT-004",
    },
    {
      id: "3",
      name: "Roberto Almeida",
      company: "Empresa GHI",
      message: "Quando vocês podem fazer a instalação?",
      time: "09:50",
      waitTime: "00:45:10",
      channel: "chat",
      protocol: "PROT-005",
    },
  ],
  inProgress: [
    {
      id: "4",
      name: "Maria Oliveira",
      company: "Empresa XYZ",
      message: "Quando será resolvido o problema?",
      time: "09:45",
      attendant: "Carlos Santos",
      duration: "00:50:15",
      channel: "email",
      protocol: "PROT-002",
    },
    {
      id: "5",
      name: "Pedro Souza",
      company: "Empresa JKL",
      message: "Estou com problemas no login",
      time: "10:05",
      attendant: "Ana Lima",
      duration: "00:30:25",
      channel: "whatsapp",
      protocol: "PROT-006",
    },
  ],
  analysis: [
    {
      id: "6",
      name: "Fernanda Costa",
      company: "Empresa MNO",
      message: "Preciso de uma análise técnica",
      time: "09:30",
      attendant: "Roberto Silva",
      analysisTime: "00:35:40",
      channel: "email",
      protocol: "PROT-007",
    },
  ],
  closed: [
    {
      id: "7",
      name: "Carlos Santos",
      company: "Empresa 123",
      message: "Obrigado pela ajuda!",
      time: "Ontem",
      attendant: "Mariana Oliveira",
      resolution: "Problema resolvido",
      channel: "chat",
      protocol: "PROT-003",
    },
    {
      id: "8",
      name: "Luciana Alves",
      company: "Empresa PQR",
      message: "Confirmando o agendamento",
      time: "Ontem",
      attendant: "João Pereira",
      resolution: "Agendamento confirmado",
      channel: "whatsapp",
      protocol: "PROT-008",
    },
  ],
}

export default function GerenciadorPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Gerenciador de Atendimento</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os canais</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Buscar atendimento..." className="w-[250px]" />
          </div>
          <Button>Novo Atendimento</Button>
        </div>
      </div>

      <Tabs defaultValue="waiting" className="flex-1">
        <div className="border-b">
          <TabsList className="mx-4 my-2">
            <TabsTrigger value="waiting" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Aguardando
              <Badge variant="destructive" className="ml-1">
                {attendances.waiting.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Em Atendimento
              <Badge className="ml-1">{attendances.inProgress.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Em Análise
              <Badge variant="secondary" className="ml-1">
                {attendances.analysis.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="closed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Encerrados
              <Badge variant="outline" className="ml-1">
                {attendances.closed.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="waiting" className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendances.waiting.map((attendance) => (
              <Card key={attendance.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{attendance.name}</CardTitle>
                      <CardDescription>{attendance.company}</CardDescription>
                    </div>
                    <Badge variant="outline">{attendance.channel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{attendance.message}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="outline">{attendance.protocol}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{attendance.waitTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                  <Button size="sm">Atender</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendances.inProgress.map((attendance) => (
              <Card key={attendance.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{attendance.name}</CardTitle>
                      <CardDescription>{attendance.company}</CardDescription>
                    </div>
                    <Badge variant="outline">{attendance.channel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{attendance.message}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{attendance.attendant.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{attendance.attendant}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="outline">{attendance.protocol}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{attendance.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                  <Button size="sm">Acompanhar</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendances.analysis.map((attendance) => (
              <Card key={attendance.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{attendance.name}</CardTitle>
                      <CardDescription>{attendance.company}</CardDescription>
                    </div>
                    <Badge variant="outline">{attendance.channel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{attendance.message}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{attendance.attendant.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{attendance.attendant}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="outline">{attendance.protocol}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{attendance.analysisTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                  <Button size="sm">Resolver</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendances.closed.map((attendance) => (
              <Card key={attendance.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{attendance.name}</CardTitle>
                      <CardDescription>{attendance.company}</CardDescription>
                    </div>
                    <Badge variant="outline">{attendance.channel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{attendance.message}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{attendance.attendant.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{attendance.attendant}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Resolução:</span>
                    <p className="text-sm">{attendance.resolution}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="outline">{attendance.protocol}</Badge>
                    <span className="text-xs text-muted-foreground">{attendance.time}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    Reabrir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
