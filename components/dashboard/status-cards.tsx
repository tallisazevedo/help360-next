"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

export function StatusCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Não Conformidades</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+2.5%</span>
            <span className="ml-1">desde o último mês</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ações Corretivas</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="ml-1">desde o último mês</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Melhorias</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+8.1%</span>
            <span className="ml-1">desde o último mês</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-red-500 rotate-180" />
            <span className="text-red-500 font-medium">-5.2%</span>
            <span className="ml-1">desde o último mês</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
