"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Image, Mic, Send, Smile, Plus, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"

// Dados de exemplo
const availableGroups = [
  { id: "1", name: "Clientes Premium", contactCount: 156 },
  { id: "2", name: "Leads Qualificados", contactCount: 89 },
  { id: "3", name: "Aniversariantes do Mês", contactCount: 42 },
  { id: "4", name: "Inativos 90 dias", contactCount: 213 },
]

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const campaignId = params.id

  // Estado da campanha
  const [campaign, setCampaign] = useState({
    id: campaignId,
    name: "Nova Campanha",
    status: "draft",
    selectedGroups: [],
    messages: [
      {
        id: "msg1",
        type: "text",
        content: "",
        delay: 0,
      },
    ],
    schedule: {
      startDate: "",
      startTime: "",
      pauseTime: "22:00",
      resumeTime: "08:00",
      contactInterval: 1,
      messageInterval: 1,
    },
    settings: {
      sendContactCard: true,
    },
  })

  // Funções para gerenciar a campanha
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaign({ ...campaign, name: e.target.value })
  }

  const handleGroupToggle = (groupId: string) => {
    const isSelected = campaign.selectedGroups.includes(groupId)
    let updatedGroups

    if (isSelected) {
      updatedGroups = campaign.selectedGroups.filter((id) => id !== groupId)
    } else {
      updatedGroups = [...campaign.selectedGroups, groupId]
    }

    setCampaign({ ...campaign, selectedGroups: updatedGroups })
  }

  const handleAddMessage = () => {
    const newMessage = {
      id: `msg${campaign.messages.length + 1}`,
      type: "text",
      content: "",
      delay: 0,
    }
    setCampaign({
      ...campaign,
      messages: [...campaign.messages, newMessage],
    })
  }

  const handleRemoveMessage = (messageId: string) => {
    if (campaign.messages.length === 1) {
      toast({
        title: "Não é possível remover",
        description: "A campanha deve ter pelo menos uma mensagem.",
        variant: "destructive",
      })
      return
    }

    const updatedMessages = campaign.messages.filter((msg) => msg.id !== messageId)
    setCampaign({ ...campaign, messages: updatedMessages })
  }

  const handleMessageChange = (messageId: string, field: string, value: any) => {
    const updatedMessages = campaign.messages.map((msg) => (msg.id === messageId ? { ...msg, [field]: value } : msg))
    setCampaign({ ...campaign, messages: updatedMessages })
  }

  const handleScheduleChange = (field: string, value: any) => {
    setCampaign({
      ...campaign,
      schedule: { ...campaign.schedule, [field]: value },
    })
  }

  const handleSettingsChange = (field: string, value: any) => {
    setCampaign({
      ...campaign,
      settings: { ...campaign.settings, [field]: value },
    })
  }

  const handleSaveCampaign = () => {
    // Aqui seria a lógica para salvar a campanha
    toast({
      title: "Campanha salva",
      description: "Sua campanha foi salva com sucesso.",
    })
  }

  // Renderização do tipo de mensagem
  const renderMessageInput = (message: any) => {
    switch (message.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Textarea
              placeholder="Digite sua mensagem aqui..."
              value={message.content}
              onChange={(e) => handleMessageChange(message.id, "content", e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" className="gap-1">
                <Smile className="h-4 w-4" />
                Adicionar emoji
              </Button>
            </div>
          </div>
        )
      case "image":
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Arraste uma imagem ou clique para fazer upload</p>
              <Button variant="outline" size="sm" className="mt-2">
                Selecionar imagem
              </Button>
            </div>
            <Textarea
              placeholder="Legenda da imagem (opcional)"
              value={message.caption || ""}
              onChange={(e) => handleMessageChange(message.id, "caption", e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        )
      case "audio":
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Mic className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Arraste um arquivo de áudio ou clique para fazer upload</p>
              <Button variant="outline" size="sm" className="mt-2">
                Selecionar áudio
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editar Campanha</h1>
            <p className="text-muted-foreground">Configure sua campanha de marketing para WhatsApp</p>
          </div>
        </div>
        <Button className="gap-2" onClick={handleSaveCampaign}>
          <Save className="h-4 w-4" />
          Salvar Campanha
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Configure as informações básicas da sua campanha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="campaign-name">Nome da Campanha</Label>
                <Input
                  id="campaign-name"
                  value={campaign.name}
                  onChange={handleNameChange}
                  placeholder="Ex: Lançamento Produto X"
                />
              </div>
            </CardContent>
          </Card>

          {/* Grupos de Contatos */}
          <Card>
            <CardHeader>
              <CardTitle>Grupos de Contatos</CardTitle>
              <CardDescription>Selecione os grupos de contatos que receberão esta campanha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`group-${group.id}`}
                        checked={campaign.selectedGroups.includes(group.id)}
                        onCheckedChange={() => handleGroupToggle(group.id)}
                      />
                      <Label htmlFor={`group-${group.id}`} className="cursor-pointer">
                        {group.name}
                      </Label>
                    </div>
                    <Badge variant="outline">
                      {group.contactCount} {group.contactCount === 1 ? "contato" : "contatos"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mensagens */}
          <Card>
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
              <CardDescription>Configure as mensagens que serão enviadas nesta campanha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="multiple" defaultValue={["msg1"]} className="space-y-4">
                {campaign.messages.map((message, index) => (
                  <AccordionItem key={message.id} value={message.id} className="border rounded-lg">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span>
                          {message.type === "text"
                            ? "Mensagem de Texto"
                            : message.type === "image"
                              ? "Imagem"
                              : message.type === "audio"
                                ? "Áudio"
                                : "Mensagem"}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-4">
                      <div className="flex items-center gap-4">
                        <Select
                          value={message.type}
                          onValueChange={(value) => handleMessageChange(message.id, "type", value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tipo de mensagem" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Texto</SelectItem>
                            <SelectItem value="image">Imagem</SelectItem>
                            <SelectItem value="audio">Áudio</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon" onClick={() => handleRemoveMessage(message.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {renderMessageInput(message)}

                      <div className="pt-2">
                        <Label className="text-sm">Intervalo após esta mensagem</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="number"
                            min="0"
                            value={message.delay}
                            onChange={(e) => handleMessageChange(message.id, "delay", Number.parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">segundos</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button variant="outline" className="w-full gap-2" onClick={handleAddMessage}>
                <Plus className="h-4 w-4" />
                Adicionar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Agendamento */}
          <Card>
            <CardHeader>
              <CardTitle>Agendamento</CardTitle>
              <CardDescription>Configure quando sua campanha será enviada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Data de Início</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={campaign.schedule.startDate}
                    onChange={(e) => handleScheduleChange("startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-time">Horário de Início</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={campaign.schedule.startTime}
                    onChange={(e) => handleScheduleChange("startTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Horário de Pausa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pause-time">Pausar envios às</Label>
                      <Input
                        id="pause-time"
                        type="time"
                        value={campaign.schedule.pauseTime}
                        onChange={(e) => handleScheduleChange("pauseTime", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume-time">Retomar envios às</Label>
                      <Input
                        id="resume-time"
                        type="time"
                        value={campaign.schedule.resumeTime}
                        onChange={(e) => handleScheduleChange("resumeTime", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-interval">Intervalo entre contatos</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="contact-interval"
                        type="number"
                        min="1"
                        value={campaign.schedule.contactInterval}
                        onChange={(e) => handleScheduleChange("contactInterval", Number.parseInt(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">minutos</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-interval">Intervalo entre mensagens</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="message-interval"
                        type="number"
                        min="1"
                        value={campaign.schedule.messageInterval}
                        onChange={(e) => handleScheduleChange("messageInterval", Number.parseInt(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">segundos</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Adicionais</CardTitle>
              <CardDescription>Configure opções adicionais para sua campanha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="send-contact-card" className="text-base">
                    Enviar cartão de contato na primeira interação
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recomendado para que o contato possa salvar seu número facilmente
                  </p>
                </div>
                <Switch
                  id="send-contact-card"
                  checked={campaign.settings.sendContactCard}
                  onCheckedChange={(checked) => handleSettingsChange("sendContactCard", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview e Informações */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Visualize como suas mensagens serão exibidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 space-y-4">
                {campaign.messages.map((message, index) => (
                  <div key={message.id} className="flex flex-col">
                    {index > 0 && (
                      <div className="text-xs text-center text-muted-foreground my-2">
                        {message.delay} segundos depois
                      </div>
                    )}
                    <div className="bg-primary text-primary-foreground self-end rounded-lg p-3 max-w-[80%]">
                      {message.type === "text" ? (
                        <p className="whitespace-pre-wrap">{message.content || "Sua mensagem aqui..."}</p>
                      ) : message.type === "image" ? (
                        <div className="space-y-2">
                          <div className="bg-muted-foreground/20 rounded aspect-video flex items-center justify-center">
                            <Image className="h-8 w-8 text-muted-foreground" />
                          </div>
                          {message.caption && <p className="text-sm">{message.caption}</p>}
                        </div>
                      ) : message.type === "audio" ? (
                        <div className="flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          <span>Mensagem de áudio</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo da Campanha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Grupos selecionados</p>
                <p className="text-sm text-muted-foreground">
                  {campaign.selectedGroups.length > 0
                    ? campaign.selectedGroups
                        .map((groupId) => availableGroups.find((g) => g.id === groupId)?.name)
                        .join(", ")
                    : "Nenhum grupo selecionado"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total de contatos</p>
                <p className="text-sm text-muted-foreground">
                  {campaign.selectedGroups.reduce(
                    (total, groupId) => total + (availableGroups.find((g) => g.id === groupId)?.contactCount || 0),
                    0,
                  )}{" "}
                  contatos
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total de mensagens</p>
                <p className="text-sm text-muted-foreground">{campaign.messages.length} mensagens</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Agendamento</p>
                <p className="text-sm text-muted-foreground">
                  {campaign.schedule.startDate && campaign.schedule.startTime
                    ? `Início em ${new Date(
                        `${campaign.schedule.startDate}T${campaign.schedule.startTime}`,
                      ).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "Não agendado"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Button className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Ativar Campanha
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-500 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Lembrete Importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p>Lembre-se que o WhatsApp possui políticas rigorosas contra spam. Certifique-se de:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Enviar apenas para contatos que deram consentimento</li>
                  <li>Evitar mensagens repetitivas ou excessivas</li>
                  <li>Respeitar os horários de envio</li>
                  <li>Incluir uma forma clara de cancelar o recebimento</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
