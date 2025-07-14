"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  MoreVertical,
  Phone,
  Video,
  UserPlus,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RespostasRapidasSelector } from "./respostas-rapidas-selector"

interface MessagePanelProps {
  conversationId: string
}

const MOCK_CONVERSATION = {
  id: "1",
  contact: {
    id: "1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=JohnDoe",
    phone: "+5511999999999",
  },
  protocol: "202401220001",
  queue: "Suporte Técnico",
  messages: [
    {
      id: "1",
      sender: "agent",
      agent: {
        id: "1",
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=JaneSmith",
      },
      content: "Olá! Como posso ajudar?",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "contact",
      content: "Não estou conseguindo acessar o sistema.",
      timestamp: new Date(),
    },
    {
      id: "3",
      sender: "internal",
      agent: {
        id: "1",
        name: "Jane Smith",
      },
      content: "Verificando o acesso do cliente...",
      timestamp: new Date(),
    },
    {
      id: "4",
      sender: "restricted",
      agent: {
        id: "1",
        name: "Jane Smith",
      },
      content: "Dados sensíveis do cliente foram acessados.",
      timestamp: new Date(),
    },
  ],
}

// Resto do código permanece o mesmo...

export function MessagePanel({ conversationId }: MessagePanelProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showLogsDialog, setShowLogsDialog] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simular a conversa com base no ID
  const conversation = MOCK_CONVERSATION

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

  const handleAddResponse = (content: string) => {
    setMessage((prev) => prev + (prev ? "\n\n" : "") + content)
  }

  return (
    <div className="flex h-full flex-col">
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
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {conversation.queue}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ligar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Videochamada</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowInviteDialog(true)}>
                  <UserPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Convidar operador</p>
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
              <DropdownMenuItem>Encerrar atendimento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
                      className={`mt-1 flex text-xs text-muted-foreground ${isAgent ? "justify-end" : "justify-start"}`}
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

                <RespostasRapidasSelector onSelectResponse={handleAddResponse} />
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

      {/* Diálogos permanecem os mesmos... */}
    </div>
  )
}
