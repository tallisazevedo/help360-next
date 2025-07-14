"use client"

import { Award, Clock, MessageSquare, Star, Trophy, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const achievements = [
  {
    icon: MessageSquare,
    title: "Comunicador Eficiente",
    description: "Resolveu 50 tickets com alta satisfação",
    progress: 100,
    completed: true,
    date: "15/03/2023",
  },
  {
    icon: Clock,
    title: "Resposta Rápida",
    description: "Manteve tempo médio de resposta abaixo de 5 minutos",
    progress: 100,
    completed: true,
    date: "20/04/2023",
  },
  {
    icon: Star,
    title: "Qualidade 5 Estrelas",
    description: "Recebeu 10 avaliações 5 estrelas consecutivas",
    progress: 80,
    completed: false,
    date: null,
  },
  {
    icon: Users,
    title: "Colaborador do Mês",
    description: "Reconhecido pela equipe por sua contribuição",
    progress: 100,
    completed: true,
    date: "05/05/2023",
  },
  {
    icon: Trophy,
    title: "Especialista em Soluções",
    description: "Criou 5 artigos na base de conhecimento",
    progress: 60,
    completed: false,
    date: null,
  },
]

export function Achievements() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-medium">5/10 Conquistas</span>
        </div>
        <div className="text-sm text-muted-foreground">Nível 3</div>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  achievement.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <achievement.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{achievement.title}</div>
                  {achievement.date && <div className="text-xs text-muted-foreground">{achievement.date}</div>}
                </div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
            </div>
            {!achievement.completed && <Progress value={achievement.progress} className="h-1.5" />}
          </div>
        ))}
      </div>
    </div>
  )
}
