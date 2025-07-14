"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquare, BarChart2, Settings, Ticket, Zap, CalendarClock } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

export const atendimentoNavItems = [
  {
    title: "Conversas",
    href: "/atendimento",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    title: "Tickets",
    href: "/atendimento/tickets",
    icon: <Ticket className="mr-2 h-4 w-4" />,
  },
  {
    title: "Estatísticas",
    href: "/atendimento/estatisticas",
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Respostas Rápidas",
    href: "/atendimento/respostas-rapidas",
    icon: <Zap className="mr-2 h-4 w-4" />,
  },
  {
    title: "Agendamento",
    href: "/atendimento/agendamento",
    icon: <CalendarClock className="mr-2 h-4 w-4" />,
  },
  {
    title: "Configurações",
    href: "/atendimento/configuracoes",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]
