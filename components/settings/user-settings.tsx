"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function UserSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
          <CardDescription>Gerencie suas informações pessoais e preferências</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                Alterar foto
              </Button>
              <Button variant="outline" size="sm">
                Remover foto
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" defaultValue="Maria Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue="maria.silva@empresa.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue="(11) 98765-4321" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input id="department" defaultValue="Qualidade" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input id="position" defaultValue="Gerente de Qualidade" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Input id="language" defaultValue="Português (Brasil)" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferências</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificações por e-mail</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações por e-mail sobre atualizações</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticação de dois fatores</Label>
                  <p className="text-sm text-muted-foreground">Adicionar uma camada extra de segurança à sua conta</p>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo escuro</Label>
                  <p className="text-sm text-muted-foreground">Alternar entre modo claro e escuro</p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
