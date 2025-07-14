"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  MoreVertical,
  PaperclipIcon,
  Smile,
  Mic,
  Send,
  FileText,
  ImageIcon,
  Camera,
  Contact,
  EyeOff,
  AlertTriangle,
  Clock,
  Shield,
  Tag,
  Trash2,
  Archive,
  Flag,
  AlertCircle,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo
const MOCK_CONVERSATION_DETAILS = {
  id: "c1",
  contact: {
    id: "contact1",
    name: "João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+55 11 98765-4321",
    email: "joao.silva@email.com",
  },
  protocol: "HELP-2023-001",
  channel: "whatsapp",
  queue: "suporte",
  status: "active",
  messages: [
    {
      id: "m1",
      sender: "contact",
      content: "Olá, estou com um problema no meu pedido #12345. Não recebi ainda e já se passaram 15 dias.",
      timestamp: new Date(2023, 5, 15, 10, 25),
      status: "read",
    },
    {
      id: "m2",
      sender: "agent",
      content:
        "Olá João, tudo bem? Vou verificar o status do seu pedido. Pode me informar o seu CPF para confirmar os dados?",
      timestamp: new Date(2023, 5, 15, 10, 28),
      status: "read",
      agent: {
        id: "a1",
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m3",
      sender: "contact",
      content: "Claro, meu CPF é 123.456.789-00",
      timestamp: new Date(2023, 5, 15, 10, 30),
      status: "read",
    },
    {
      id: "m4",
      sender: "agent",
      content: "Obrigado! Estou consultando o sistema...",
      timestamp: new Date(2023, 5, 15, 10, 32),
      status: "read",
      agent: {
        id: "a1",
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m5",
      sender: "internal",
      content:
        "Verificar no sistema de logística o status real da entrega. Parece haver um atraso com a transportadora.",
      timestamp: new Date(2023, 5, 15, 10, 33),
      agent: {
        id: "a1",
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m6",
      sender: "agent",
      content:
        "João, identifiquei que seu pedido está em trânsito. Houve um atraso na transportadora, mas a previsão atualizada é para entrega em 2 dias úteis. Vou monitorar e te manter informado.",
      timestamp: new Date(2023, 5, 15, 10, 35),
      status: "read",
      agent: {
        id: "a1",
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m7",
      sender: "contact",
      content: "Entendi. Obrigado pela informação. Vou aguardar então.",
      timestamp: new Date(2023, 5, 15, 10, 37),
      status: "read",
    },
    {
      id: "m8",
      sender: "restricted",
      content: "Cliente possui histórico de reclamações frequentes. Verificar com cuidado.",
      timestamp: new Date(2023, 5, 15, 10, 38),
      agent: {
        id: "a2",
        name: "Supervisor Maria",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m9",
      sender: "agent",
      content:
        "Disponibilizei um cupom de desconto de 10% para sua próxima compra como cortesia pelo inconveniente. O código é DESCULPE10.",
      timestamp: new Date(2023, 5, 15, 10, 40),
      status: "read",
      agent: {
        id: "a1",
        name: "Carlos Atendente",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "m10",
      sender: "contact",
      content: "Muito obrigado! Isso ajuda bastante.",
      timestamp: new Date(2023, 5, 15, 10, 42),
      status: "read",
    },
  ],
  logs: [
    {
      id: "l1",
      action: "Atendimento iniciado",
      timestamp: new Date(2023, 5, 15, 10, 25),
      user: {
        id: "a1",
        name: "Sistema",
      },
    },
    {
      id: "l2",
      action: "Atribuído ao agente Carlos Atendente",
      timestamp: new Date(2023, 5, 15, 10, 26),
      user: {
        id: "a3",
        name: "Supervisor Ana",
      },
    },
    {
      id: "l3",
      action: "Supervisor Maria adicionado ao atendimento",
      timestamp: new Date(2023, 5, 15, 10, 38),
      user: {
        id: "a1",
        name: "Carlos Atendente",
      },
    },
  ],
  lgpd: {
    hasConsent: true,
    consentDate: "2023-05-10",
    retentionDays: 90,
    dataCategories: ["identificação", "contato", "histórico de compras"],
    dataUsage: ["atendimento", "melhoria de serviço"],
    anonymizationDate: "2023-09-15",
  },
  quality: {
    score: 4.8,
    evaluationDate: "2023-06-15",
    evaluator: "Sistema",
    metrics: {
      responseTime: 3.2, // minutos
      resolution: 5.0, // 1-5
      courtesy: 4.5, // 1-5
      knowledge: 4.7, // 1-5
    },
    feedback: "Atendimento rápido e eficiente. Cliente satisfeito com a solução.",
  },
}

type ConversationChatPanelProps = {
  conversationId: string
}

export function ConversationChatPanel({ conversationId }: ConversationChatPanelProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showLogsDialog, setShowLogsDialog] = useState(false)
  const [showLgpdDialog, setShowLgpdDialog] = useState(false)
  const [showQualityDialog, setShowQualityDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simular a conversa com base no ID
  const conversation = MOCK_CONVERSATION_DETAILS

  useEffect(() => {
    scrollToBottom()
  }, [conversation.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aqui seria a lógica para enviar a mensagem
      console.log("Enviando mensagem:", message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    // Lógica para iniciar gravação
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Lógica para parar gravação e processar áudio
  }

  const handleTransferToAnalysis = () => {
    setShowAnalysisDialog(true)
  }

  // Função para obter a cor da fila
  const getQueueColor = (queue: string) => {
    switch (queue) {
      case "suporte":
        return "bg-blue-500"
      case "financeiro":
        return "bg-green-500"
      case "vendas":
        return "bg-purple-500"
      case "cancelamento":
        return "bg-red-500"
      case "logistica":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex h-[calc(100vh-220px)] flex-col">
      {/* Cabeçalho */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
            <AvatarFallback>{conversation.contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-medium">{conversation.contact.name}</h2>
              <Badge variant="outline" className="text-xs">
                {conversation.protocol}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{conversation.contact.phone}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${getQueueColor(conversation.queue)}`}></div>
                <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                  {conversation.queue}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-2">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="info">Informações</TabsTrigger>
            </TabsList>
          </Tabs>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowLgpdDialog(true)}>
                  <Shield className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Informações LGPD</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowQualityDialog(true)}>
                  <Tag className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Qualidade</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowLogsDialog(true)}>
                  <Clock className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logs de acesso</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleTransferToAnalysis}>Enviar para análise</DropdownMenuItem>
              <DropdownMenuItem>Transferir atendimento</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir conversa
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Arquivar conversa
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                Marcar como sensível
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {activeTab === "chat" ? (
        <>
          {/* Área de mensagens */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {conversation.messages.map((msg) => {
                if (msg.sender === "internal") {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="rounded-md bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">Nota interna</span>
                        </div>
                        <p>{msg.content}</p>
                        <div className="mt-1 text-xs text-yellow-600">
                          {msg.agent?.name} • {formatDistanceToNow(msg.timestamp, { addSuffix: true, locale: ptBR })}
                        </div>
                      </div>
                    </div>
                  )
                }

                if (msg.sender === "restricted") {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4" />
                          <span className="font-medium">Conteúdo restrito</span>
                        </div>
                        <p>{msg.content}</p>
                        <div className="mt-1 text-xs text-red-600">
                          {msg.agent?.name} • {formatDistanceToNow(msg.timestamp, { addSuffix: true, locale: ptBR })}
                        </div>
                      </div>
                    </div>
                  )
                }

                const isAgent = msg.sender === "agent"

                return (
                  <div key={msg.id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[70%] gap-2 ${isAgent ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={isAgent ? msg.agent?.avatar : conversation.contact.avatar}
                          alt={isAgent ? msg.agent?.name : conversation.contact.name}
                        />
                        <AvatarFallback>
                          {isAgent ? msg.agent?.name.charAt(0) : conversation.contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            isAgent ? "rounded-br-none bg-primary text-primary-foreground" : "rounded-bl-none bg-muted"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div
                          className={`mt-1 flex text-xs text-muted-foreground ${
                            isAgent ? "justify-end" : "justify-start"
                          }`}
                        >
                          {isAgent && msg.agent?.name && (
                            <>
                              <span>{msg.agent.name}</span>
                              <span className="mx-1">•</span>
                            </>
                          )}
                          <span>{formatDistanceToNow(msg.timestamp, { addSuffix: true, locale: ptBR })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Área de entrada de mensagem */}
          <div className="border-t p-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Textarea
                  placeholder="Digite uma mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[80px] resize-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Popover open={showAttachMenu} onOpenChange={setShowAttachMenu}>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <PaperclipIcon className="mr-1 h-4 w-4" />
                          <span>Anexar</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="start">
                        <div className="grid gap-1">
                          <Button variant="ghost" className="justify-start" size="sm">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            <span>Imagem</span>
                          </Button>
                          <Button variant="ghost" className="justify-start" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Documento</span>
                          </Button>
                          <Button variant="ghost" className="justify-start" size="sm">
                            <Camera className="mr-2 h-4 w-4" />
                            <span>Câmera</span>
                          </Button>
                          <Button variant="ghost" className="justify-start" size="sm">
                            <Contact className="mr-2 h-4 w-4" />
                            <span>Contato</span>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Button variant="ghost" size="sm" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <Smile className="mr-1 h-4 w-4" />
                      <span>Emoji</span>
                    </Button>

                    <Button variant="ghost" size="sm">
                      <FileText className="mr-1 h-4 w-4" />
                      <span>Nota interna</span>
                    </Button>
                  </div>

                  <div>
                    {message.trim() ? (
                      <Button onClick={handleSendMessage}>
                        <Send className="mr-1 h-4 w-4" />
                        <span>Enviar</span>
                      </Button>
                    ) : (
                      <Button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        variant={isRecording ? "destructive" : "default"}
                      >
                        <Mic className="mr-1 h-4 w-4" />
                        <span>{isRecording ? "Gravando..." : "Gravar áudio"}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Informações do Contato</h3>
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
                    <AvatarFallback>{conversation.contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-semibold">{conversation.contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{conversation.contact.email}</p>
                    <p className="text-sm text-muted-foreground">{conversation.contact.phone}</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">ID do Contato:</span>
                    <span className="text-sm">{conversation.contact.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Protocolo:</span>
                    <span className="text-sm">{conversation.protocol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Canal:</span>
                    <span className="text-sm capitalize">{conversation.channel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Fila:</span>
                    <span className="text-sm capitalize">{conversation.queue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="text-sm capitalize">{conversation.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Histórico de Interações</h3>
              <div className="rounded-lg border p-4">
                <div className="space-y-3">
                  {conversation.logs.map((log) => (
                    <div key={log.id} className="border-b pb-2">
                      <div className="font-medium">{log.action}</div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{log.user.name}</span>
                        <span>{formatDistanceToNow(log.timestamp, { addSuffix: true, locale: ptBR })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Conformidade LGPD</h3>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2">
                  {conversation.lgpd.hasConsent ? (
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      <Shield className="mr-1 h-3 w-3" />
                      Consentimento Obtido
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-500 text-red-500">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Sem Consentimento
                    </Badge>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Data do Consentimento:</span>
                    <span className="text-sm">{conversation.lgpd.consentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Retenção:</span>
                    <span className="text-sm">{conversation.lgpd.retentionDays} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Data de Anonimização:</span>
                    <span className="text-sm">{conversation.lgpd.anonymizationDate}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Categorias de Dados:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {conversation.lgpd.dataCategories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Uso dos Dados:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {conversation.lgpd.dataUsage.map((usage) => (
                        <Badge key={usage} variant="secondary" className="text-xs">
                          {usage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Métricas de Qualidade</h3>
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="text-2xl font-bold">{conversation.quality.score.toFixed(1)}</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= Math.round(conversation.quality.score) ? "text-yellow-500" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Data da Avaliação:</span>
                    <span className="text-sm">{conversation.quality.evaluationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Avaliador:</span>
                    <span className="text-sm">{conversation.quality.evaluator}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Métricas Detalhadas:</span>
                    <div className="mt-2 grid gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Tempo de Resposta:</span>
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(conversation.quality.metrics.responseTime / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{conversation.quality.metrics.responseTime.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Resolução:</span>
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${(conversation.quality.metrics.resolution / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{conversation.quality.metrics.resolution.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Cortesia:</span>
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${(conversation.quality.metrics.courtesy / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{conversation.quality.metrics.courtesy.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Conhecimento:</span>
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-yellow-500"
                            style={{ width: `${(conversation.quality.metrics.knowledge / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{conversation.quality.metrics.knowledge.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-medium">Feedback:</span>
                    <p className="mt-1 text-sm">{conversation.quality.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}

      {/* Dialog para enviar para análise */}
      <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar para análise</DialogTitle>
            <DialogDescription>Informe os detalhes para enviar este atendimento para análise.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Motivo</Label>
              <Input id="reason" placeholder="Informe o motivo da análise" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Departamento</Label>
              <Input id="department" placeholder="Selecione o departamento" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Input id="priority" placeholder="Selecione a prioridade" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="create-demand" className="h-4 w-4" />
              <Label htmlFor="create-demand">Criar demanda a partir deste atendimento</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnalysisDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit">Enviar para análise</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para LGPD */}
      <Dialog open={showLgpdDialog} onOpenChange={setShowLgpdDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Informações LGPD</DialogTitle>
            <DialogDescription>Detalhes de conformidade com a Lei Geral de Proteção de Dados.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                {conversation.lgpd.hasConsent ? (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    <Shield className="mr-1 h-3 w-3" />
                    Consentimento Obtido
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Sem Consentimento
                  </Badge>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Data do Consentimento:</span>
                  <span className="text-sm">{conversation.lgpd.consentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Retenção:</span>
                  <span className="text-sm">{conversation.lgpd.retentionDays} dias</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Data de Anonimização:</span>
                  <span className="text-sm">{conversation.lgpd.anonymizationDate}</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium">Categorias de Dados:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {conversation.lgpd.dataCategories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium">Uso dos Dados:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {conversation.lgpd.dataUsage.map((usage) => (
                      <Badge key={usage} variant="secondary" className="text-xs">
                        {usage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="retention">Alterar período de retenção (dias)</Label>
              <Input id="retention" type="number" defaultValue={conversation.lgpd.retentionDays} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="anonymize" className="h-4 w-4" />
              <Label htmlFor="anonymize">Anonimizar dados após período de retenção</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLgpdDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Qualidade */}
      <Dialog open={showQualityDialog} onOpenChange={setShowQualityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Avaliação de Qualidade</DialogTitle>
            <DialogDescription>Avalie a qualidade deste atendimento.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-medium">Avaliação Geral</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-2xl ${
                      star <= Math.round(conversation.quality.score) ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="response-time">Tempo de Resposta</Label>
              <Input
                id="response-time"
                type="range"
                min="1"
                max="5"
                step="0.1"
                defaultValue={conversation.quality.metrics.responseTime}
              />
              <div className="flex justify-between text-xs">
                <span>Lento</span>
                <span>Rápido</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resolution">Resolução do Problema</Label>
              <Input
                id="resolution"
                type="range"
                min="1"
                max="5"
                step="0.1"
                defaultValue={conversation.quality.metrics.resolution}
              />
              <div className="flex justify-between text-xs">
                <span>Não resolvido</span>
                <span>Totalmente resolvido</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="courtesy">Cortesia</Label>
              <Input
                id="courtesy"
                type="range"
                min="1"
                max="5"
                step="0.1"
                defaultValue={conversation.quality.metrics.courtesy}
              />
              <div className="flex justify-between text-xs">
                <span>Inadequada</span>
                <span>Excelente</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="knowledge">Conhecimento</Label>
              <Input
                id="knowledge"
                type="range"
                min="1"
                max="5"
                step="0.1"
                defaultValue={conversation.quality.metrics.knowledge}
              />
              <div className="flex justify-between text-xs">
                <span>Insuficiente</span>
                <span>Especialista</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea id="feedback" defaultValue={conversation.quality.feedback} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQualityDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar avaliação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para logs de acesso */}
      <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logs de acesso</DialogTitle>
            <DialogDescription>Histórico de ações realizadas neste atendimento.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto py-4">
            <div className="space-y-4">
              {conversation.logs.map((log) => (
                <div key={log.id} className="border-b pb-2">
                  <div className="font-medium">{log.action}</div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{log.user.name}</span>
                    <span>{formatDistanceToNow(log.timestamp, { addSuffix: true, locale: ptBR })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowLogsDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
