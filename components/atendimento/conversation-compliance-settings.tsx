"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ConversationComplianceSettings() {
  const [activeTab, setActiveTab] = useState("geral")
  const [retentionDays, setRetentionDays] = useState(90)
  const [autoDeleteEnabled, setAutoDeleteEnabled] = useState(true)
  const [anonymizationEnabled, setAnonymizationEnabled] = useState(true)
  const [consentRequired, setConsentRequired] = useState(true)
  const [auditLogEnabled, setAuditLogEnabled] = useState(true)
  const [accessLogEnabled, setAccessLogEnabled] = useState(true)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleSaveSettings = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    console.log("Configurações salvas")
    setShowConfirmDialog(true)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="geral" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="retencao">Retenção</TabsTrigger>
          <TabsTrigger value="consentimento">Consentimento</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4 pt-4">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Configurações Gerais LGPD</h3>
            <p className="text-sm text-muted-foreground">
              Configure as opções gerais de conformidade com a LGPD para todas as conversas.
            </p>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Política de Privacidade</Label>
                <p className="text-sm text-muted-foreground">
                  Adicione ou atualize a política de privacidade enviada no início das conversas
                </p>
              </div>
              <Button variant="outline">Gerenciar</Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Requisições de Titulares</Label>
                <p className="text-sm text-muted-foreground">
                  Configure como lidar com solicitações de acesso, correção ou exclusão de dados
                </p>
              </div>
              <Button variant="outline">Configurar</Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Encarregado de Dados (DPO)</Label>
                <p className="text-sm text-muted-foreground">
                  Defina os contatos do encarregado de proteção de dados da empresa
                </p>
              </div>
              <Button variant="outline">Atualizar</Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificação de Incidentes</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure o procedimento para notificação de incidentes de segurança
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="incident-notification" className="sr-only">
                    Notificação automática
                  </Label>
                  <Switch id="incident-notification" checked={true} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="notification-email">Email para notificação</Label>
                  <Input id="notification-email" value="seguranca@empresa.com.br" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="notification-time">Prazo máximo (horas)</Label>
                  <Input id="notification-time" value="24" type="number" className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="retencao" className="space-y-4 pt-4">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Políticas de Retenção</h3>
            <p className="text-sm text-muted-foreground">
              Configure por quanto tempo os dados das conversas serão mantidos antes de serem excluídos ou anonimizados.
            </p>
          </div>

          <div className="rounded-md border p-4">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="retention-period" className="font-medium">
                  Período de retenção padrão
                </Label>
                <span className="font-semibold">{retentionDays} dias</span>
              </div>
              <Slider
                id="retention-period"
                value={[retentionDays]}
                min={30}
                max={365}
                step={30}
                onValueChange={(value) => setRetentionDays(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30 dias</span>
                <span>90 dias</span>
                <span>180 dias</span>
                <span>365 dias</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Exclusão automática</Label>
                <p className="text-sm text-muted-foreground">
                  Excluir automaticamente conversas após o período de retenção
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-delete" checked={autoDeleteEnabled} onCheckedChange={setAutoDeleteEnabled} />
              </div>
            </div>

            {autoDeleteEnabled && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="delete-behavior">Comportamento</Label>
                    <Select defaultValue="anonymize">
                      <SelectTrigger id="delete-behavior" className="mt-1">
                        <SelectValue placeholder="Selecione o comportamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anonymize">Anonimizar dados pessoais</SelectItem>
                        <SelectItem value="full-delete">Exclusão completa</SelectItem>
                        <SelectItem value="archive">Arquivar (acesso restrito)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="delete-notification">Notificação</Label>
                    <Select defaultValue="7days">
                      <SelectTrigger id="delete-notification" className="mt-1">
                        <SelectValue placeholder="Selecione quando notificar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem notificação</SelectItem>
                        <SelectItem value="7days">7 dias antes</SelectItem>
                        <SelectItem value="15days">15 dias antes</SelectItem>
                        <SelectItem value="30days">30 dias antes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md bg-amber-50 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Importante sobre exclusão automática</p>
                      <p className="text-xs text-amber-800">
                        Esta ação é irreversível. Considere fazer um backup dos dados importantes antes da exclusão
                        automática. Conversas relacionadas a processos judiciais ou fiscais podem necessitar de períodos
                        de retenção mais longos.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Anonimização</Label>
                <p className="text-sm text-muted-foreground">
                  Anonimizar automaticamente dados pessoais em conversas antigas
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="anonymization" checked={anonymizationEnabled} onCheckedChange={setAnonymizationEnabled} />
              </div>
            </div>

            {anonymizationEnabled && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="anonymize-after">Anonimizar após</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="anonymize-after" className="mt-1">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="anonymize-fields">Dados a anonimizar</Label>
                  <Select defaultValue="all-pii">
                    <SelectTrigger id="anonymize-fields" className="mt-1">
                      <SelectValue placeholder="Selecione os dados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-pii">Todos os dados pessoais</SelectItem>
                      <SelectItem value="contact">Apenas dados de contato</SelectItem>
                      <SelectItem value="identity">Apenas dados de identificação</SelectItem>
                      <SelectItem value="custom">Configuração personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="consentimento" className="space-y-4 pt-4">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Gerenciamento de Consentimento</h3>
            <p className="text-sm text-muted-foreground">
              Configure como o consentimento para coleta e uso de dados pessoais é obtido e gerenciado.
            </p>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Exigir consentimento</Label>
                <p className="text-sm text-muted-foreground">
                  Solicitar consentimento ativo antes de iniciar a conversa
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="consent-required" checked={consentRequired} onCheckedChange={setConsentRequired} />
              </div>
            </div>
          </div>

          {consentRequired && (
            <>
              <div className="rounded-md border p-4 space-y-3">
                <h4 className="font-medium">Texto de consentimento</h4>
                <textarea
                  className="h-24 w-full rounded-md border p-2 text-sm"
                  defaultValue="Olá! Para fornecer um melhor atendimento, precisamos coletar e processar alguns dos seus dados pessoais. Seus dados serão tratados de acordo com nossa Política de Privacidade. Você concorda com a coleta e o processamento dos seus dados para este atendimento?"
                ></textarea>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="consent-accept-text">Texto botão aceitar</Label>
                    <Input id="consent-accept-text" value="Concordo" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="consent-reject-text">Texto botão recusar</Label>
                    <Input id="consent-reject-text" value="Discordo" className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4 space-y-3">
                <h4 className="font-medium">Rejeição de consentimento</h4>
                <p className="text-sm text-muted-foreground">
                  Configure o comportamento quando o consentimento é recusado
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-limited" />
                    <Label htmlFor="show-limited">Oferecer atendimento limitado (sem coleta de dados)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-alternative" defaultChecked />
                    <Label htmlFor="show-alternative">Mostrar canais alternativos de atendimento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-reason" defaultChecked />
                    <Label htmlFor="show-reason">Solicitar motivo da recusa (opcional)</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reject-message">Mensagem para recusa de consentimento</Label>
                  <textarea
                    id="reject-message"
                    className="mt-1 h-16 w-full rounded-md border p-2 text-sm"
                    defaultValue="Entendemos sua decisão. Infelizmente, não podemos prosseguir com o atendimento sem seu consentimento. Você pode entrar em contato por telefone ou visitar uma de nossas lojas físicas."
                  ></textarea>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Revogação de consentimento</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que o usuário revogue o consentimento durante a conversa
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-revocation" defaultChecked />
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="auditoria" className="space-y-4 pt-4">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Auditoria e Rastreabilidade</h3>
            <p className="text-sm text-muted-foreground">
              Configure logs de auditoria e rastreamento de acesso aos dados.
            </p>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Log de auditoria</Label>
                <p className="text-sm text-muted-foreground">Manter logs de todas as ações de processamento de dados</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="audit-log" checked={auditLogEnabled} onCheckedChange={setAuditLogEnabled} />
              </div>
            </div>

            {auditLogEnabled && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="audit-retention">Período de retenção</Label>
                  <Select defaultValue="365">
                    <SelectTrigger id="audit-retention" className="mt-1">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                      <SelectItem value="730">2 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="audit-level">Nível de detalhamento</Label>
                  <Select defaultValue="complete">
                    <SelectTrigger id="audit-level" className="mt-1">
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico (apenas ações principais)</SelectItem>
                      <SelectItem value="moderate">Moderado (ações e acessos)</SelectItem>
                      <SelectItem value="complete">Completo (todas as interações)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Log de acesso</Label>
                <p className="text-sm text-muted-foreground">
                  Registrar todos os acessos às conversas e dados pessoais
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="access-log" checked={accessLogEnabled} onCheckedChange={setAccessLogEnabled} />
              </div>
            </div>

            {accessLogEnabled && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="access-retention">Período de retenção</Label>
                    <Select defaultValue="180">
                      <SelectTrigger id="access-retention" className="mt-1">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="180">180 dias</SelectItem>
                        <SelectItem value="365">1 ano</SelectItem>
                        <SelectItem value="730">2 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="access-notification">Notificação de acesso</Label>
                    <Select defaultValue="unusual">
                      <SelectTrigger id="access-notification" className="mt-1">
                        <SelectValue placeholder="Selecione quando notificar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem notificação</SelectItem>
                        <SelectItem value="all">Todos os acessos</SelectItem>
                        <SelectItem value="unusual">Apenas acessos suspeitos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Registrar acesso de:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="log-agents" defaultChecked />
                      <Label htmlFor="log-agents">Agentes de atendimento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="log-supervisors" defaultChecked />
                      <Label htmlFor="log-supervisors">Supervisores</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="log-admin" defaultChecked />
                      <Label htmlFor="log-admin">Administradores</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="log-integrations" defaultChecked />
                      <Label htmlFor="log-integrations">Sistemas integrados</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Relatórios de conformidade</Label>
                <p className="text-sm text-muted-foreground">Gerar relatórios periódicos de conformidade com a LGPD</p>
              </div>
              <Button variant="outline">Configurar</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSaveSettings}>Salvar configurações</Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Configurações salvas com sucesso</AlertDialogTitle>
            <AlertDialogDescription>
              As novas configurações de conformidade LGPD foram aplicadas para todas as conversas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
