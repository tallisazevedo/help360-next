"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Info, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SGIParametersConfig() {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Help360 Tecnologia",
    sgiVersion: "1.2.0",
    implementationDate: "2023-01-15",
    lastReviewDate: "2023-05-10",
    nextReviewDate: "2023-11-10",
    scope: "Desenvolvimento e suporte de software para gestão da qualidade",
    standards: ["ISO 9001:2015", "ISO 14001:2015"],
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemNotifications: true,
    reminderDays: "7",
    notifyResponsible: true,
    notifyManager: true,
    notifyQualityTeam: true,
    dailySummary: false,
  })

  const [workflowSettings, setWorkflowSettings] = useState({
    requireApproval: true,
    autoCloseCompleted: true,
    escalationEnabled: true,
    escalationDays: "3",
    allowDelegation: true,
    trackChanges: true,
    auditTrail: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    accessControl: "role-based",
    documentSecurity: "restricted",
    dataRetention: "1-year",
    auditLogging: true,
    sensitiveDataMasking: true,
  })

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">Geral</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
        <TabsTrigger value="workflow">Fluxo de Trabalho</TabsTrigger>
        <TabsTrigger value="security">Seguran��a</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sgiVersion">Versão do SGI</Label>
                <Input
                  id="sgiVersion"
                  value={generalSettings.sgiVersion}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, sgiVersion: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="implementationDate">Data de Implementação</Label>
                <Input
                  id="implementationDate"
                  type="date"
                  value={generalSettings.implementationDate}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, implementationDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastReviewDate">Última Revisão</Label>
                <Input
                  id="lastReviewDate"
                  type="date"
                  value={generalSettings.lastReviewDate}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, lastReviewDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextReviewDate">Próxima Revisão</Label>
                <Input
                  id="nextReviewDate"
                  type="date"
                  value={generalSettings.nextReviewDate}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, nextReviewDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="standards">Normas Aplicáveis</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as normas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ISO 9001:2015">ISO 9001:2015</SelectItem>
                    <SelectItem value="ISO 14001:2015">ISO 14001:2015</SelectItem>
                    <SelectItem value="ISO 45001:2018">ISO 45001:2018</SelectItem>
                    <SelectItem value="ISO 27001:2013">ISO 27001:2013</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="scope">Escopo do SGI</Label>
                <Textarea
                  id="scope"
                  value={generalSettings.scope}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, scope: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações por Email</Label>
                  <div className="text-sm text-muted-foreground">Enviar notificações por email para os usuários</div>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações no Sistema</Label>
                  <div className="text-sm text-muted-foreground">Exibir notificações no sistema para os usuários</div>
                </div>
                <Switch
                  checked={notificationSettings.systemNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      systemNotifications: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="reminderDays">Dias de Antecedência para Lembretes</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="reminderDays"
                    type="number"
                    min="1"
                    max="30"
                    value={notificationSettings.reminderDays}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        reminderDays: e.target.value,
                      })
                    }
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">dias</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Destinatários das Notificações</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyResponsible"
                      checked={notificationSettings.notifyResponsible}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifyResponsible: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="notifyResponsible" className="text-sm font-normal">
                      Responsáveis diretos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyManager"
                      checked={notificationSettings.notifyManager}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifyManager: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="notifyManager" className="text-sm font-normal">
                      Gerentes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyQualityTeam"
                      checked={notificationSettings.notifyQualityTeam}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifyQualityTeam: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="notifyQualityTeam" className="text-sm font-normal">
                      Equipe de Qualidade
                    </Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label className="text-base">Resumo Diário</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Envia um resumo diário com todas as atividades pendentes</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-sm text-muted-foreground">Enviar um resumo diário das atividades pendentes</div>
                </div>
                <Switch
                  checked={notificationSettings.dailySummary}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, dailySummary: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="workflow" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Aprovação Obrigatória</Label>
                  <div className="text-sm text-muted-foreground">
                    Exigir aprovação para alterações em documentos e processos
                  </div>
                </div>
                <Switch
                  checked={workflowSettings.requireApproval}
                  onCheckedChange={(checked) => setWorkflowSettings({ ...workflowSettings, requireApproval: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Fechamento Automático</Label>
                  <div className="text-sm text-muted-foreground">
                    Fechar automaticamente itens quando todas as ações forem concluídas
                  </div>
                </div>
                <Switch
                  checked={workflowSettings.autoCloseCompleted}
                  onCheckedChange={(checked) =>
                    setWorkflowSettings({ ...workflowSettings, autoCloseCompleted: checked })
                  }
                />
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Escalação Automática</Label>
                    <div className="text-sm text-muted-foreground">
                      Escalar automaticamente itens atrasados para níveis superiores
                    </div>
                  </div>
                  <Switch
                    checked={workflowSettings.escalationEnabled}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, escalationEnabled: checked })
                    }
                  />
                </div>
                {workflowSettings.escalationEnabled && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="escalationDays">Dias para Escalação</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="escalationDays"
                        type="number"
                        min="1"
                        max="30"
                        value={workflowSettings.escalationDays}
                        onChange={(e) =>
                          setWorkflowSettings({
                            ...workflowSettings,
                            escalationDays: e.target.value,
                          })
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">dias</span>
                    </div>
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Permitir Delegação</Label>
                  <div className="text-sm text-muted-foreground">
                    Permitir que usuários deleguem tarefas para outros
                  </div>
                </div>
                <Switch
                  checked={workflowSettings.allowDelegation}
                  onCheckedChange={(checked) => setWorkflowSettings({ ...workflowSettings, allowDelegation: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Rastreamento de Alterações</Label>
                  <div className="text-sm text-muted-foreground">
                    Rastrear todas as alterações feitas em documentos e registros
                  </div>
                </div>
                <Switch
                  checked={workflowSettings.trackChanges}
                  onCheckedChange={(checked) => setWorkflowSettings({ ...workflowSettings, trackChanges: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Trilha de Auditoria</Label>
                  <div className="text-sm text-muted-foreground">
                    Manter registro detalhado de todas as ações realizadas no sistema
                  </div>
                </div>
                <Switch
                  checked={workflowSettings.auditTrail}
                  onCheckedChange={(checked) => setWorkflowSettings({ ...workflowSettings, auditTrail: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Controle de Acesso</Label>
                <RadioGroup
                  value={securitySettings.accessControl}
                  onValueChange={(value) => setSecuritySettings({ ...securitySettings, accessControl: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="role-based" id="role-based" />
                    <Label htmlFor="role-based" className="font-normal">
                      Baseado em Perfis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attribute-based" id="attribute-based" />
                    <Label htmlFor="attribute-based" className="font-normal">
                      Baseado em Atributos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="font-normal">
                      Personalizado
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Segurança de Documentos</Label>
                <RadioGroup
                  value={securitySettings.documentSecurity}
                  onValueChange={(value) => setSecuritySettings({ ...securitySettings, documentSecurity: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open" className="font-normal">
                      Aberto (Todos podem acessar)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="restricted" id="restricted" />
                    <Label htmlFor="restricted" className="font-normal">
                      Restrito (Baseado em permissões)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="confidential" id="confidential" />
                    <Label htmlFor="confidential" className="font-normal">
                      Confidencial (Acesso limitado)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Retenção de Dados</Label>
                <Select
                  value={securitySettings.dataRetention}
                  onValueChange={(value) => setSecuritySettings({ ...securitySettings, dataRetention: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-months">6 meses</SelectItem>
                    <SelectItem value="1-year">1 ano</SelectItem>
                    <SelectItem value="2-years">2 anos</SelectItem>
                    <SelectItem value="5-years">5 anos</SelectItem>
                    <SelectItem value="indefinite">Indefinido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Registro de Auditoria</Label>
                  <div className="text-sm text-muted-foreground">Registrar todas as ações de segurança no sistema</div>
                </div>
                <Switch
                  checked={securitySettings.auditLogging}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mascaramento de Dados Sensíveis</Label>
                  <div className="text-sm text-muted-foreground">
                    Ocultar dados sensíveis para usuários sem permissão
                  </div>
                </div>
                <Switch
                  checked={securitySettings.sensitiveDataMasking}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({ ...securitySettings, sensitiveDataMasking: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
