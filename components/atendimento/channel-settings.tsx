"use client"

import { useState } from "react"
import { Copy, Edit, MessageCircle, Facebook, Instagram, Mail, Phone, Trash2, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function ChannelSettings() {
  const [activeTab, setActiveTab] = useState("whatsapp")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações de Canais</h2>
        <p className="text-muted-foreground">Gerencie os canais de atendimento e suas configurações</p>
      </div>

      <Tabs defaultValue="whatsapp" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-500" />
              <span>WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-blue-500" />
              <span>Facebook</span>
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-pink-500" />
              <span>Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-500" />
              <span>E-mail</span>
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>Telefone</span>
            </TabsTrigger>
          </TabsList>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Canal
          </Button>
        </div>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    WhatsApp Business
                  </CardTitle>
                  <CardDescription>Configurações da API do WhatsApp Business</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Número de Telefone</Label>
                  <div className="flex">
                    <Input id="whatsapp-number" value="+55 11 98765-4321" readOnly />
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-name">Nome do Perfil</Label>
                  <Input id="whatsapp-name" value="Suporte Help360" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp-api-key">API Key</Label>
                <div className="flex">
                  <Input id="whatsapp-api-key" type="password" value="••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Mensagens</h3>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-welcome">Mensagem de Boas-vindas</Label>
                  <Textarea
                    id="whatsapp-welcome"
                    value="Olá! Bem-vindo ao atendimento da Help360. Como podemos ajudar você hoje?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-away">Mensagem de Ausência</Label>
                  <Textarea
                    id="whatsapp-away"
                    value="Olá! No momento estamos fora do horário de atendimento. Retornaremos o contato no próximo dia útil. Obrigado pela compreensão!"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-queue">Fila Padrão</Label>
                    <Select defaultValue="support">
                      <SelectTrigger id="whatsapp-queue">
                        <SelectValue placeholder="Selecione uma fila" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Suporte</SelectItem>
                        <SelectItem value="sales">Vendas</SelectItem>
                        <SelectItem value="finance">Financeiro</SelectItem>
                        <SelectItem value="cancel">Cancelamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-timeout">Tempo de Inatividade (minutos)</Label>
                    <Input id="whatsapp-timeout" type="number" value="30" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Opções Avançadas</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="whatsapp-auto-response">Respostas Automáticas</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar respostas automáticas baseadas em palavras-chave
                    </p>
                  </div>
                  <Switch id="whatsapp-auto-response" checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="whatsapp-chatbot">Chatbot Inicial</Label>
                    <p className="text-sm text-muted-foreground">
                      Usar chatbot para triagem inicial antes do atendimento humano
                    </p>
                  </div>
                  <Switch id="whatsapp-chatbot" checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="whatsapp-notification">Notificações</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações para os atendentes sobre novas mensagens
                    </p>
                  </div>
                  <Switch id="whatsapp-notification" checked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar Canal
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Números Adicionais</CardTitle>
              <CardDescription>Gerencie números adicionais do WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">+55 11 91234-5678</p>
                      <p className="text-sm text-muted-foreground">Vendas Help360</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Ativo
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">+55 11 98765-8765</p>
                      <p className="text-sm text-muted-foreground">Financeiro Help360</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        Inativo
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Número
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="facebook" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Facebook className="h-5 w-5 text-blue-500" />
                    Facebook Messenger
                  </CardTitle>
                  <CardDescription>Configurações da API do Facebook Messenger</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-page">Página do Facebook</Label>
                    <Input id="facebook-page" value="Help360 Oficial" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook-id">Page ID</Label>
                    <div className="flex">
                      <Input id="facebook-id" value="123456789012345" readOnly />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook-token">Access Token</Label>
                  <div className="flex">
                    <Input id="facebook-token" type="password" value="••••••••••••••••••••••••••••••" readOnly />
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Conteúdo similar ao do WhatsApp, adaptado para Facebook */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar Canal
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    Instagram Direct
                  </CardTitle>
                  <CardDescription>Configurações da API do Instagram Direct</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="instagram-account">Conta do Instagram</Label>
                    <Input id="instagram-account" value="@help360oficial" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram-id">Account ID</Label>
                    <div className="flex">
                      <Input id="instagram-id" value="987654321098765" readOnly />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram-token">Access Token</Label>
                  <div className="flex">
                    <Input id="instagram-token" type="password" value="••••••••••••••••••••••••••••••" readOnly />
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Conteúdo similar ao do WhatsApp, adaptado para Instagram */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar Canal
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-orange-500" />
                    E-mail
                  </CardTitle>
                  <CardDescription>Configurações de integração com e-mail</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email-address">Endereço de E-mail</Label>
                    <Input id="email-address" value="atendimento@help360.com.br" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-name">Nome de Exibição</Label>
                    <Input id="email-name" value="Atendimento Help360" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email-server">Servidor SMTP</Label>
                    <Input id="email-server" value="smtp.help360.com.br" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-port">Porta</Label>
                    <Input id="email-port" value="587" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email-username">Usuário</Label>
                    <Input id="email-username" value="atendimento@help360.com.br" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-password">Senha</Label>
                    <div className="flex">
                      <Input id="email-password" type="password" value="••••••••••••••••" />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-ssl">Usar SSL/TLS</Label>
                    <p className="text-sm text-muted-foreground">Ativar conexão segura com o servidor de e-mail</p>
                  </div>
                  <Switch id="email-ssl" checked={true} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="email-signature">Assinatura de E-mail</Label>
                  <Textarea
                    id="email-signature"
                    value="Atenciosamente,\n\nEquipe de Atendimento\nHelp360\nwww.help360.com.br\n(11) 3456-7890"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar Canal
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="phone" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    Telefonia
                  </CardTitle>
                  <CardDescription>Configurações de integração com telefonia</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone-provider">Provedor de Telefonia</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger id="phone-provider">
                        <SelectValue placeholder="Selecione um provedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="totalvoice">TotalVoice</SelectItem>
                        <SelectItem value="zenvia">Zenvia</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Número Principal</Label>
                    <Input id="phone-number" value="+55 11 3456-7890" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-api-key">API Key</Label>
                  <div className="flex">
                    <Input id="phone-api-key" type="password" value="••••••••••••••••••••••••••••••" />
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configurações de URA</h3>

                  <div className="space-y-2">
                    <Label htmlFor="phone-greeting">Mensagem de Saudação</Label>
                    <Textarea
                      id="phone-greeting"
                      value="Olá! Você ligou para a Help360. Para suporte técnico, digite 1. Para financeiro, digite 2. Para vendas, digite 3. Para falar com um atendente, digite 0."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone-queue">Fila Padrão</Label>
                      <Select defaultValue="support">
                        <SelectTrigger id="phone-queue">
                          <SelectValue placeholder="Selecione uma fila" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Suporte</SelectItem>
                          <SelectItem value="sales">Vendas</SelectItem>
                          <SelectItem value="finance">Financeiro</SelectItem>
                          <SelectItem value="cancel">Cancelamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-timeout">Tempo Máximo de Espera (segundos)</Label>
                      <Input id="phone-timeout" type="number" value="180" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="phone-recording">Gravação de Chamadas</Label>
                    <p className="text-sm text-muted-foreground">Ativar gravação automática de todas as chamadas</p>
                  </div>
                  <Switch id="phone-recording" checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="phone-voicemail">Caixa Postal</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que clientes deixem mensagens quando não há atendentes disponíveis
                    </p>
                  </div>
                  <Switch id="phone-voicemail" checked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar Canal
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
