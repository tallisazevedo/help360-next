"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    naoConformidades: 12,
    acoesCorretivas: 8,
  },
  {
    name: "Fev",
    naoConformidades: 8,
    acoesCorretivas: 5,
  },
  {
    name: "Mar",
    naoConformidades: 15,
    acoesCorretivas: 12,
  },
  {
    name: "Abr",
    naoConformidades: 10,
    acoesCorretivas: 8,
  },
  {
    name: "Mai",
    naoConformidades: 7,
    acoesCorretivas: 6,
  },
  {
    name: "Jun",
    naoConformidades: 9,
    acoesCorretivas: 7,
  },
  {
    name: "Jul",
    naoConformidades: 12,
    acoesCorretivas: 10,
  },
]

export function Overview() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" stroke="#888888" tickLine={false} axisLine={false} />
          <YAxis
            className="text-xs"
            stroke="#888888"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar
            dataKey="naoConformidades"
            stackId="a"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
          <Bar
            dataKey="acoesCorretivas"
            stackId="a"
            fill="hsl(var(--secondary))"
            radius={[4, 4, 0, 0]}
            className="fill-secondary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
