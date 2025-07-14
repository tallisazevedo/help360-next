"use client"

import { AlertTriangle, CheckCircle, Clock, FileText, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "non-conformity",
    title: "Nova não conformidade registrada",
    description: "Falha no processo de embalagem",
    time: "Há 5 minutos",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
  },
  {
    id: 2,
    type: "action",
    title: "Ação corretiva atualizada",
    description: "Treinamento da equipe de produção",
    time: "Há 30 minutos",
    icon: Clock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: 3,
    type: "improvement",
    title: "Nova oportunidade de melhoria",
    description: "Otimização do fluxo de trabalho",
    time: "Há 1 hora",
    icon: Lightbulb,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: 4,
    type: "document",
    title: "Documento atualizado",
    description: "Manual de procedimentos v2.3",
    time: "Há 2 horas",
    icon: FileText,
    iconColor: "text-gray-500",
    iconBg: "bg-gray-100",
  },
  {
    id: 5,
    type: "completed",
    title: "Ação concluída",
    description: "Calibração de equipamentos",
    time: "Há 3 horas",
    icon: CheckCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas atividades registradas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={cn("rounded-full p-2", activity.iconBg)}>
                <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
