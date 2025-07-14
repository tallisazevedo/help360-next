"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
  { name: "Promotores", value: 70 },
  { name: "Neutros", value: 20 },
  { name: "Detratores", value: 10 },
]

const COLORS = ["#4ade80", "#facc15", "#f87171"]

export function NPSScore() {
  const [period, setPeriod] = useState("month")
  const npsScore = data[0].value - data[2].value // Promotores - Detratores

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">{npsScore}</div>
        <p className="text-sm text-muted-foreground">Pontuação NPS</p>
      </div>

      <Tabs defaultValue="month" onValueChange={setPeriod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mês</TabsTrigger>
          <TabsTrigger value="year">Ano</TabsTrigger>
        </TabsList>
      </Tabs>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="space-y-1">
          <div className="font-medium">{data[0].value}%</div>
          <div className="text-xs text-green-500">Promotores</div>
        </div>
        <div className="space-y-1">
          <div className="font-medium">{data[1].value}%</div>
          <div className="text-xs text-yellow-500">Neutros</div>
        </div>
        <div className="space-y-1">
          <div className="font-medium">{data[2].value}%</div>
          <div className="text-xs text-red-500">Detratores</div>
        </div>
      </div>
    </div>
  )
}
