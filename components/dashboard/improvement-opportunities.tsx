"use client"

import { Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const improvements = [
  {
    id: 1,
    title: "Otimização do fluxo de trabalho",
    status: "Em análise",
    progress: 25,
    department: "Produção",
  },
  {
    id: 2,
    title: "Redução de desperdício de materiais",
    status: "Em implementação",
    progress: 60,
    department: "Operações",
  },
  {
    id: 3,
    title: "Melhoria na comunicação interna",
    status: "Em análise",
    progress: 15,
    department: "RH",
  },
  {
    id: 4,
    title: "Automação de processos manuais",
    status: "Aprovada",
    progress: 40,
    department: "TI",
  },
]

export function ImprovementOpportunities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oportunidades de Melhoria</CardTitle>
        <CardDescription>Acompanhamento das oportunidades de melhoria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {improvements.map((improvement) => (
            <div key={improvement.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-sm">{improvement.title}</span>
                </div>
                <Badge variant="outline">{improvement.status}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={improvement.progress} className="h-2" />
                <span className="text-xs text-muted-foreground">{improvement.progress}%</span>
              </div>
              <div className="text-xs text-muted-foreground">Departamento: {improvement.department}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
