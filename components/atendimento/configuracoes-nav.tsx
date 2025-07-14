"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Users, Settings, Cog } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const configItems = [
  {
    title: "Canais",
    href: "/atendimento/configuracoes",
    icon: MessageCircle,
  },
  {
    title: "Filas",
    href: "/atendimento/configuracoes/filas",
    icon: Users,
  },
  {
    title: "Automação",
    href: "/atendimento/configuracoes/automacao",
    icon: Cog,
  },
  {
    title: "Geral",
    href: "/atendimento/configuracoes/geral",
    icon: Settings,
  },
]

export function ConfiguracoesNav() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {configItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
