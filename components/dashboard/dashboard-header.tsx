"use client"

import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"

export function DashboardHeader() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo(a) de volta, Maria! Aqui está um resumo da sua plataforma.</p>
      </div>
      <Card className="flex items-center gap-2 p-2">
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>Hoje</span>
        </Button>
        <div className="text-sm font-medium">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </Card>
    </div>
  )
}
