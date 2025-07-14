"use client"

import { useState } from "react"
import { CheckCircle2, Clock, FileText, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const tasks = [
  {
    id: "1",
    title: "Responder ao cliente ABC sobre não conformidade",
    priority: "Alta",
    dueTime: "10:30",
    type: "chat",
    completed: false,
  },
  {
    id: "2",
    title: "Revisar relatório de qualidade mensal",
    priority: "Média",
    dueTime: "14:00",
    type: "document",
    completed: false,
  },
  {
    id: "3",
    title: "Atualizar status da ação corretiva PA-2023-004",
    priority: "Alta",
    dueTime: "11:45",
    type: "action",
    completed: false,
  },
  {
    id: "4",
    title: "Agendar reunião com equipe de suporte",
    priority: "Baixa",
    dueTime: "16:30",
    type: "meeting",
    completed: true,
  },
  {
    id: "5",
    title: "Finalizar documentação do novo procedimento",
    priority: "Média",
    dueTime: "15:00",
    type: "document",
    completed: false,
  },
]

export function DailyTasks() {
  const [userTasks, setUserTasks] = useState(tasks)
  const [filter, setFilter] = useState("all")

  const handleTaskToggle = (taskId: string) => {
    setUserTasks(userTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const filteredTasks = userTasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "document":
        return <FileText className="h-4 w-4 text-amber-500" />
      case "action":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "meeting":
        return <Clock className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "Média":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "Baixa":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todas ({userTasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendentes ({userTasks.filter((t) => !t.completed).length})</TabsTrigger>
          <TabsTrigger value="completed">Concluídas ({userTasks.filter((t) => t.completed).length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
            Nenhuma tarefa encontrada
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn("flex items-start gap-2 rounded-lg border p-3", task.completed && "bg-muted/50")}
            >
              <Checkbox checked={task.completed} onCheckedChange={() => handleTaskToggle(task.id)} className="mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div className={cn("font-medium", task.completed && "text-muted-foreground line-through")}>
                    {task.title}
                  </div>
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{task.dueTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTaskIcon(task.type)}
                    <span>
                      {task.type === "chat"
                        ? "Chat"
                        : task.type === "document"
                          ? "Documento"
                          : task.type === "action"
                            ? "Ação"
                            : "Reunião"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Button variant="outline" className="w-full">
        <Clock className="mr-2 h-4 w-4" />
        Ver todas as tarefas
      </Button>
    </div>
  )
}
