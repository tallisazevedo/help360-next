"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificações por Email</CardTitle>
          <CardDescription>Configure quais notificações você deseja receber por email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-nao-conformidades">Não Conformidades</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações quando uma nova não conformidade for registrada.
                </p>
              </div>
              <Switch id="email-nao-conformidades" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-melhorias">Melhorias</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre novas oportunidades de melhoria.
                </p>
              </div>
              <Switch id="email-melhorias" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-planos-acao">Planos de Ação</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre atualizações em planos de ação.
                </p>
              </div>
              <Switch id="email-planos-acao" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-documentos">Documentos</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre novos documentos ou atualizações.
                </p>
              </div>
              <Switch id="email-documentos" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-wiki">Wiki</Label>
                <p className="text-sm text-muted-foreground">Receba notificações sobre novos artigos na Wiki.</p>
              </div>
              <Switch id="email-wiki" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Salvar preferências</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações no Sistema</CardTitle>
          <CardDescription>Configure quais notificações você deseja receber dentro do sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-atendimentos">Atendimentos</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre novos atendimentos e mensagens.
                </p>
              </div>
              <Switch id="system-atendimentos" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-tarefas">Tarefas</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre novas tarefas atribuídas a você.
                </p>
              </div>
              <Switch id="system-tarefas" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-prazos">Prazos</Label>
                <p className="text-sm text-muted-foreground">Receba lembretes sobre prazos próximos do vencimento.</p>
              </div>
              <Switch id="system-prazos" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-atualizacoes">Atualizações do Sistema</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre novas funcionalidades e atualizações.
                </p>
              </div>
              <Switch id="system-atualizacoes" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Salvar preferências</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
