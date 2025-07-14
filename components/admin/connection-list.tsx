"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, MessageSquare, Instagram, Phone, AlertCircle } from "lucide-react"

// Dados de exemplo para conexões
const connections = [
  {
    id: 1,
    name: "WhatsApp Business",
    type: "whatsapp",
    status: "active",
    phone: "+5511999999999",
    lastSync: "2023-05-15T10:30:00",
    description: "Conexão principal de WhatsApp para atendimento",
  },
  {
    id: 2,
    name: "Chat Web",
    type: "chat",
    status: "active",
    lastSync: "2023-05-16T14:20:00",
    description: "Widget de chat para o site principal",
  },
  {
    id: 3,
    name: "Instagram Oficial",
    type: "instagram",
    status: "active",
    account: "@empresa360",
    lastSync: "2023-05-14T09:15:00",
    description: "Conta oficial da empresa no Instagram",
  },
  {
    id: 4,
    name: "WhatsApp Suporte",
    type: "whatsapp",
    status: "inactive",
    phone: "+5511888888888",
    lastSync: "2023-04-30T16:45:00",
    description: "Número secundário para suporte técnico",
  },
  {
    id: 5,
    name: "Chat Suporte",
    type: "chat",
    status: "active",
    lastSync: "2023-05-16T11:10:00",
    description: "Widget de chat para a página de suporte",
  },
]

// Função para obter o ícone baseado no tipo de conexão
const getConnectionIcon = (type: string) => {
  switch (type) {
    case "whatsapp":
      return <Phone className="h-5 w-5 text-green-500" />
    case "chat":
      return <MessageSquare className="h-5 w-5 text-blue-500" />
    case "instagram":
      return <Instagram className="h-5 w-5 text-pink-500" />
    default:
      return <Wifi className="h-5 w-5 text-gray-500" />
  }
}

export function ConnectionList() {
  const [activeConnections, setActiveConnections] = useState(connections.filter((conn) => conn.status === "active"))

  const handleToggleStatus = (id: number) => {
    setActiveConnections((prev) => {
      const isActive = prev.some((conn) => conn.id === id)
      if (isActive) {
        return prev.filter((conn) => conn.id !== id)
      } else {
        const connection = connections.find((conn) => conn.id === id)
        if (connection) {
          return [...prev, connection]
        }
        return prev
      }
    })
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="instagram">Instagram</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection.id}
            connection={connection}
            isActive={activeConnections.some((conn) => conn.id === connection.id)}
            onToggleStatus={() => handleToggleStatus(connection.id)}
          />
        ))}
      </TabsContent>

      <TabsContent value="whatsapp" className="space-y-4">
        {connections
          .filter((conn) => conn.type === "whatsapp")
          .map((connection) => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
              isActive={activeConnections.some((conn) => conn.id === connection.id)}
              onToggleStatus={() => handleToggleStatus(connection.id)}
            />
          ))}
      </TabsContent>

      <TabsContent value="chat" className="space-y-4">
        {connections
          .filter((conn) => conn.type === "chat")
          .map((connection) => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
              isActive={activeConnections.some((conn) => conn.id === connection.id)}
              onToggleStatus={() => handleToggleStatus(connection.id)}
            />
          ))}
      </TabsContent>

      <TabsContent value="instagram" className="space-y-4">
        {connections
          .filter((conn) => conn.type === "instagram")
          .map((connection) => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
              isActive={activeConnections.some((conn) => conn.id === connection.id)}
              onToggleStatus={() => handleToggleStatus(connection.id)}
            />
          ))}
      </TabsContent>
    </Tabs>
  )
}

interface ConnectionCardProps {
  connection: (typeof connections)[0]
  isActive: boolean
  onToggleStatus: () => void
}

function ConnectionCard({ connection, isActive, onToggleStatus }: ConnectionCardProps) {
  const [isHealthy, setIsHealthy] = useState(true)

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center space-x-2">
          {getConnectionIcon(connection.type)}
          <div>
            <CardTitle>{connection.name}</CardTitle>
            <CardDescription>{connection.description}</CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isHealthy ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
              Saudável
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
              <AlertCircle className="mr-1 h-3 w-3" />
              Problema
            </Badge>
          )}
          <Switch
            checked={isActive}
            onCheckedChange={onToggleStatus}
            aria-label={`Ativar ou desativar ${connection.name}`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tipo</p>
            <p className="text-sm font-medium capitalize">{connection.type}</p>
          </div>
          {connection.phone && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p className="text-sm font-medium">{connection.phone}</p>
            </div>
          )}
          {connection.account && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conta</p>
              <p className="text-sm font-medium">{connection.account}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Última sincronização</p>
            <p className="text-sm font-medium">{new Date(connection.lastSync).toLocaleString("pt-BR")}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Testar conexão
        </Button>
        <Button variant="outline" size="sm">
          Configurar
        </Button>
      </CardFooter>
    </Card>
  )
}
