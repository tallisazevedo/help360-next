"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const weeklyData = [
  { name: "Seg", "Tempo Médio": 8, "Taxa de Resolução": 92 },
  { name: "Ter", "Tempo Médio": 6, "Taxa de Resolução": 95 },
  { name: "Qua", "Tempo Médio": 9, "Taxa de Resolução": 88 },
  { name: "Qui", "Tempo Médio": 7, "Taxa de Resolução": 90 },
  { name: "Sex", "Tempo Médio": 5, "Taxa de Resolução": 96 },
  { name: "Sáb", "Tempo Médio": 4, "Taxa de Resolução": 98 },
  { name: "Dom", "Tempo Médio": 3, "Taxa de Resolução": 99 },
]

const monthlyData = [
  { name: "Jan", "Tempo Médio": 7, "Taxa de Resolução": 93 },
  { name: "Fev", "Tempo Médio": 6, "Taxa de Resolução": 94 },
  { name: "Mar", "Tempo Médio": 8, "Taxa de Resolução": 91 },
  { name: "Abr", "Tempo Médio": 5, "Taxa de Resolução": 96 },
  { name: "Mai", "Tempo Médio": 7, "Taxa de Resolução": 92 },
  { name: "Jun", "Tempo Médio": 6, "Taxa de Resolução": 95 },
]

export function ServiceMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Taxa de resolução no primeiro contato</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">6.2 min</div>
            <p className="text-xs text-muted-foreground">Tempo médio de resposta</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tempo Médio" fill="hsl(var(--primary))" />
              <Bar dataKey="Taxa de Resolução" fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="monthly" className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tempo Médio" fill="hsl(var(--primary))" />
              <Bar dataKey="Taxa de Resolução" fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
