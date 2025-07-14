"use client"

import { useState } from "react"
import { Edit, Plus, Save, Trash2, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados de exemplo
const MOCK_QUEUES = [
  {
    id: "1",
    name: "Suporte",
    color: "#3b82f6",
    active: true,
    agents: 8,
    waitingTime: "4m 12s",
    priority: "medium",
  },
  {
    id: "2",
    name: "Financeiro",
    color: "#10b981",
    active: true,
    agents: 5,
    waitingTime: "6m 45s",
    priority: "high",
  },
  {
    id: "3",
    name: "Vendas",
    color: "#8b5cf6",
    active: true,
    agents: 6,
    waitingTime: "2m 38s",
    priority: "medium",
  },
  {
    id: "4",
    name: "Cancelamento",
    color: "#ef4444",
    active: true,
    agents: 4,
    waitingTime: "8m 22s",
    priority: "high",
  },
  {
    id: "5",
    name: "Reclamações",
    color: "#f59e0b",
    active: false,
    agents: 0,
    waitingTime: "N/A",
    priority: "low",
  },
]

const MOCK_AGENTS = [
  {
    id: "1",
    name: "Carlos Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "carlos.silva@help360.com.br",
    queues: ["Suporte", "Vendas"],
  },
  {
    id: "2",
    name: "Ana Oliveira",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "ana.oliveira@help360.com.br",
    queues: ["Financeiro", "Cancelamento"],
  },
  {
    id: "3",
    name: "Pedro Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "pedro.santos@help360.com.br",
    queues: ["Vendas"],
  },
  {
    id: "4",
    name: "Mariana Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "mariana.costa@help360.com.br",
    queues: ["Suporte", "Cancelamento"],
  },
  {
    id: "5",
    name: "João Pereira",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "joao.pereira@help360.com.br",
    queues: ["Financeiro"],
  },
]

export function QueueSettings() {
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [queueName, setQueueName] = useState("")
  const [queueColor, setQueueColor] = useState("")
  const [queuePriority, setQueuePriority] = useState("")
  const [queueActive, setQueueActive] = useState(true)

  const handleSelectQueue = (queueId: string) => {
    const queue = MOCK_QUEUES.find((q) => q.id === queueId)
    if (queue) {
      setSelectedQueue(queueId)
      setQueueName(queue.name)
      setQueueColor(queue.color)
      setQueuePriority(queue.priority)
      setQueueActive(queue.active)
      setEditMode(false)
    }
  }

  const handleNewQueue = () => {
    setSelectedQueue(null)
    setQueueName("")
    setQueueColor("#3b82f6")
    setQueuePriority("medium")
    setQueueActive(true)
    setEditMode(true)
  }

  const handleSaveQueue = () => {
    // Lógica para salvar a fila
    setEditMode(false)
  }

  const handleCancelEdit = () => {
    if (selectedQueue) {
      const queue = MOCK_QUEUES.find((q) => q.id === selectedQueue)
      if (queue) {
        setQueueName(queue.name)
        setQueueColor(queue.color)
        setQueuePriority(queue.priority)
        setQueueActive(queue.active)
      }
    } else {
      setQueueName("")
      setQueueColor("#3b82f6")
      setQueuePriority("medium")
      setQueueActive(true)
    }
    setEditMode(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações de Filas</h2>
        <p className="text-muted-foreground">Gerencie as filas de atendimento e atribuição de agentes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filas</CardTitle>
              <Button size="sm" onClick={handleNewQueue}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Fila
              </Button>
            </div>
            <CardDescription>Selecione uma fila para editar ou crie uma nova</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {MOCK_QUEUES.map((queue) => (
                <div
                  key={queue.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-accent ${
                    selectedQueue === queue.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleSelectQueue(queue.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: queue.color }} />
                    <span className="font-medium">{queue.name}</span>
                  </div>
                  <Badge variant={queue.active ? "default" : "outline"}>{queue.active ? "Ativo" : "Inativo"}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedQueue
                  ? editMode
                    ? "Editar Fila"
                    : `Detalhes da Fila: ${MOCK_QUEUES.find((q) => q.id === selectedQueue)?.name}`
                  : "Nova Fila"}
              </CardTitle>
              {selectedQueue && !editMode && (
                <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              )}
            </div>
            <CardDescription>
              {editMode ? "Configure os detalhes da fila" : "Visualize e gerencie os detalhes da fila"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedQueue || editMode ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="queue-name">Nome da Fila</Label>
                    <Input
                      id="queue-name"
                      value={queueName}
                      onChange={(e) => setQueueName(e.target.value)}
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="queue-color">Cor</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: queueColor }} />
                      <Input
                        id="queue-color"
                        type="color"
                        value={queueColor}
                        onChange={(e) => setQueueColor(e.target.value)}
                        disabled={!editMode}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="queue-priority">Prioridade</Label>
                    <Select value={queuePriority} onValueChange={setQueuePriority} disabled={!editMode}>
                      <SelectTrigger id="queue-priority">
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="queue-active"
                      checked={queueActive}
                      onCheckedChange={setQueueActive}
                      disabled={!editMode}
                    />
                    <Label htmlFor="queue-active">Fila Ativa</Label>
                  </div>
                </div>

                {selectedQueue && !editMode && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Agentes Atribuídos</h3>
                        <p className="text-sm text-muted-foreground">Agentes que atendem nesta fila</p>
                      </div>

                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Agente</TableHead>
                              <TableHead>E-mail</TableHead>
                              <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {MOCK_AGENTS.filter((agent) =>
                              agent.queues.includes(MOCK_QUEUES.find((q) => q.id === selectedQueue)?.name || ""),
                            ).map((agent) => (
                              <TableRow key={agent.id}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={agent.avatar} alt={agent.name} />
                                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{agent.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{agent.email}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="h-8 text-red-500">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remover
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Adicionar Agentes
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Selecione uma fila existente ou crie uma nova para visualizar os detalhes
                </p>
              </div>
            )}
          </CardContent>
          {editMode && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button onClick={handleSaveQueue}>
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            </CardFooter>
          )}
          {selectedQueue && !editMode && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir Fila
              </Button>
              <Button variant="outline" onClick={() => setEditMode(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
