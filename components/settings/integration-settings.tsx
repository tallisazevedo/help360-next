"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, ExternalLink, RefreshCw } from "lucide-react"

export function IntegrationSettings() {
  const [whatsappConnected, setWhatsappConnected] = useState(true)
  const [emailConnected, setEmailConnected] = useState(true)
  const [zapierConnected, setZapierConnected] = useState(false)
  const [slackConnected, setSlackConnected] = useState(false)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="comunicacao">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comunicacao">Comunicação</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="outros">Outros</TabsTrigger>
        </TabsList>

        <TabsContent value="comunicacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business</CardTitle>
              <CardDescription>Conecte sua conta do WhatsApp Business para enviar e receber mensagens.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  {whatsappConnected ? (
                    <div className="flex items-center text-sm text-green-500">
                      <Check className="mr-1 h-4 w-4" />
                      Conectado
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Desconectado</p>
                  )}
                </div>
                <Switch checked={whatsappConnected} onCheckedChange={setWhatsappConnected} />
              </div>

              {whatsappConnected && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">Número de telefone</Label>
                    <Input id="whatsapp-phone" value="+55 11 98765-4321" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-name">Nome do perfil</Label>
                    <Input id="whatsapp-name" value="Empresa ABC Suporte" />
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Informação</AlertTitle>
                    <AlertDescription>
                      Sua conexão com o WhatsApp Business expira em 30 dias. Clique em reconectar para renovar.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {whatsappConnected ? (
                <Button variant="outline" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Reconectar
                </Button>
              ) : (
                <Button>Conectar WhatsApp</Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Configure sua conta de email para enviar notificações e relatórios.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  {emailConnected ? (
                    <div className="flex items-center text-sm text-green-500">
                      <Check className="mr-1 h-4 w-4" />
                      Conectado
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Desconectado</p>
                  )}
                </div>
                <Switch checked={emailConnected} onCheckedChange={setEmailConnected} />
              </div>

              {emailConnected && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-address">Endereço de email</Label>
                    <Input id="email-address" value="suporte@empresaabc.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-server">Servidor SMTP</Label>
                    <Input id="email-server" value="smtp.empresaabc.com.br" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-port">Porta</Label>
                      <Input id="email-port" value="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-security">Segurança</Label>
                      <Input id="email-security" value="TLS" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {emailConnected ? <Button variant="outline">Testar conexão</Button> : <Button>Configurar Email</Button>}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Gerencie suas chaves de API para integração com outros sistemas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave de API</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" value="sk_live_51NzT7rKG8oBXp2vH..." type="password" className="flex-1" />
                  <Button variant="outline">Mostrar</Button>
                  <Button variant="outline">Copiar</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-secret">Chave Secreta</Label>
                <div className="flex space-x-2">
                  <Input id="api-secret" value="whsec_8G5TRwYbZ9X2nVcP..." type="password" className="flex-1" />
                  <Button variant="outline">Mostrar</Button>
                  <Button variant="outline">Copiar</Button>
                </div>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  Nunca compartilhe suas chaves de API. Se você suspeitar que suas chaves foram comprometidas,
                  regenere-as imediatamente.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Regenerar chaves</Button>
              <Button>Salvar alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Configure webhooks para receber notificações em tempo real.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL do Webhook</Label>
                <Input id="webhook-url" placeholder="https://seu-dominio.com/webhook" />
              </div>
              <div className="space-y-2">
                <Label>Eventos</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="event-nc" />
                    <Label htmlFor="event-nc">Não conformidades</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="event-melhorias" />
                    <Label htmlFor="event-melhorias">Melhorias</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="event-planos" />
                    <Label htmlFor="event-planos">Planos de ação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="event-docs" />
                    <Label htmlFor="event-docs">Documentos</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Testar webhook</Button>
              <Button>Salvar configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="outros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zapier</CardTitle>
              <CardDescription>Conecte o Help360 com mais de 3.000 aplicativos através do Zapier.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  {zapierConnected ? (
                    <div className="flex items-center text-sm text-green-500">
                      <Check className="mr-1 h-4 w-4" />
                      Conectado
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Desconectado</p>
                  )}
                </div>
                <Switch checked={zapierConnected} onCheckedChange={setZapierConnected} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                Visitar Zapier
              </Button>
              {zapierConnected ? (
                <Button variant="outline">Gerenciar conexão</Button>
              ) : (
                <Button>Conectar com Zapier</Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Slack</CardTitle>
              <CardDescription>Receba notificações e interaja com o Help360 diretamente no Slack.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  {slackConnected ? (
                    <div className="flex items-center text-sm text-green-500">
                      <Check className="mr-1 h-4 w-4" />
                      Conectado
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Desconectado</p>
                  )}
                </div>
                <Switch checked={slackConnected} onCheckedChange={setSlackConnected} />
              </div>

              {slackConnected && (
                <div className="mt-4 space-y-2">
                  <Label>Canais conectados</Label>
                  <div className="rounded-md border p-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">#qualidade</p>
                        <Button variant="ghost" size="sm">
                          Remover
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">#atendimento</p>
                        <Button variant="ghost" size="sm">
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {slackConnected ? (
                <>
                  <Button variant="outline">Adicionar canal</Button>
                  <Button variant="outline">Desconectar</Button>
                </>
              ) : (
                <Button>Conectar com Slack</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
