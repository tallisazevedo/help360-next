"use client"

import React from "react"

import { useState, useEffect } from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Settings,
  Shield,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  ClipboardList,
  FileBarChart,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  Award,
  Star,
  Users,
  Headphones,
  BookOpen,
  Layers,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  Building2,
  UserCircle,
  Megaphone,
  Mail,
  DollarSign,
  Wallet,
  CreditCard,
  Receipt,
  BadgeCheck,
  Briefcase,
  UserCog,
  GitMerge,
  Tag,
  Bot,
  Target,
  Lock,
  Eye,
  CheckSquare,
  Link,
  Trello,
  LayoutGrid,
  Kanban,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isMobile = useIsMobile()
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})

  // Função para alternar o estado de expansão de um menu
  const toggleExpand = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }))
  }

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Auto-expand menus based on current path
    const path = pathname.split("/")[1] || ""
    if (path) {
      setExpandedMenus((prev) => ({
        ...prev,
        [path]: true,
      }))
    }
  }, [])

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    }
  }, [isMobile])

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
      badge: null,
    },
    {
      label: "Atendimentos",
      icon: Headphones,
      isExpandable: true,
      expanded: expandedMenus["atendimento"],
      onClick: () => toggleExpand("atendimento"),
      active: pathname.includes("/atendimento"),
      badge: "5",
      children: [
        {
          label: "Conversas",
          icon: MessageSquare,
          href: "/atendimento/conversas",
          active: pathname.includes("/atendimento/conversas"),
        },
        {
          label: "Painel de Tickets",
          icon: Layers,
          href: "/atendimento/tickets",
          active: pathname.includes("/atendimento/tickets"),
        },
        {
          label: "Respostas Rápidas",
          icon: FileText,
          href: "/atendimento/respostas-rapidas",
          active: pathname.includes("/atendimento/respostas-rapidas"),
        },
        {
          label: "Agendar Mensagem",
          icon: Clock,
          href: "/atendimento/agendamento",
          active: pathname.includes("/atendimento/agendamento"),
        },
      ],
    },
    {
      label: "Clientes",
      icon: Users,
      isExpandable: true,
      expanded: expandedMenus["clientes"],
      onClick: () => toggleExpand("clientes"),
      active: pathname.includes("/clientes"),
      badge: null,
      children: [
        {
          label: "Empresas",
          icon: Building2,
          href: "/clientes",
          active: pathname === "/clientes",
        },
        {
          label: "Contatos",
          icon: UserCircle,
          href: "/contatos",
          active: pathname === "/contatos",
        },
      ],
    },
    {
      label: "Demandas",
      icon: Trello,
      isExpandable: true,
      expanded: expandedMenus["demandas"],
      onClick: () => toggleExpand("demandas"),
      active: pathname.includes("/demandas"),
      badge: "Novo",
      children: [
        {
          label: "Meus Quadros",
          icon: Kanban,
          href: "/demandas/quadros",
          active: pathname.includes("/demandas/quadros"),
        },
        {
          label: "Áreas de Trabalho",
          icon: LayoutGrid,
          href: "/demandas/areas",
          active: pathname.includes("/demandas/areas"),
        },
        {
          label: "Todas as Demandas",
          icon: ClipboardList,
          href: "/demandas/todas",
          active: pathname.includes("/demandas/todas"),
        },
      ],
    },
    {
      label: "Wiki",
      icon: BookOpen,
      href: "/wiki",
      active: pathname.includes("/wiki"),
      badge: null,
    },
    {
      label: "Marketing",
      icon: Megaphone,
      isExpandable: true,
      expanded: expandedMenus["marketing"],
      onClick: () => toggleExpand("marketing"),
      active: pathname.includes("/marketing"),
      badge: null,
      children: [
        {
          label: "Grupos de Disparo",
          icon: Users,
          href: "/marketing/grupos",
          active: pathname.includes("/marketing/grupos"),
        },
        {
          label: "Campanhas",
          icon: Mail,
          href: "/marketing/campanhas",
          active: pathname.includes("/marketing/campanhas"),
        },
      ],
    },
    {
      label: "Financeiro",
      icon: DollarSign,
      isExpandable: true,
      expanded: expandedMenus["financeiro"],
      onClick: () => toggleExpand("financeiro"),
      active: pathname.includes("/financeiro"),
      badge: null,
      children: [
        {
          label: "Conta",
          icon: Wallet,
          href: "/financeiro/conta",
          active: pathname.includes("/financeiro/conta"),
        },
        {
          label: "Assinatura",
          icon: CreditCard,
          href: "/financeiro/assinatura",
          active: pathname.includes("/financeiro/assinatura"),
        },
        {
          label: "Fatura",
          icon: Receipt,
          href: "/financeiro/fatura",
          active: pathname.includes("/financeiro/fatura"),
        },
      ],
    },
    {
      label: "Qualidade",
      icon: BadgeCheck,
      isExpandable: true,
      expanded: expandedMenus["qualidade"],
      onClick: () => toggleExpand("qualidade"),
      active: pathname.includes("/qualidade"),
      badge: null,
      children: [
        {
          label: "Não Conformidades",
          icon: AlertTriangle,
          href: "/qualidade/nao-conformidades",
          active: pathname.includes("/qualidade/nao-conformidades"),
          badge: "3",
        },
        {
          label: "Melhorias",
          icon: Lightbulb,
          href: "/qualidade/melhorias",
          active: pathname.includes("/qualidade/melhorias"),
        },
        {
          label: "Planos de Ação",
          icon: ClipboardList,
          href: "/qualidade/planos-acao",
          active: pathname.includes("/qualidade/planos-acao"),
          badge: "5",
        },
        {
          label: "SGI",
          icon: FileBarChart,
          href: "/qualidade/sgi",
          active: pathname.includes("/qualidade/sgi"),
          badge: "Novo",
        },
        {
          label: "Gestão de Processos",
          icon: GitMerge,
          href: "/admin/gestao-sgi",
          active: pathname.includes("/admin/gestao-sgi"),
          badge: "Novo",
        },
      ],
    },
    {
      label: "Documentação",
      icon: FileText,
      href: "/documentacao",
      active: pathname.includes("/documentacao"),
      badge: null,
    },
    {
      label: "Administração",
      icon: Settings,
      isExpandable: true,
      expanded: expandedMenus["admin"],
      onClick: () => toggleExpand("admin"),
      active: pathname.includes("/admin"),
      badge: null,
      children: [
        {
          label: "Usuários",
          icon: Users,
          href: "/admin/usuarios",
          active: pathname.includes("/admin/usuarios"),
        },
        {
          label: "Cargos",
          icon: Briefcase,
          href: "/admin/cargos",
          active: pathname.includes("/admin/cargos"),
        },
        {
          label: "Perfis",
          icon: UserCog,
          href: "/admin/perfis",
          active: pathname.includes("/admin/perfis"),
        },
        {
          label: "Conexões",
          icon: Link,
          href: "/admin/conexoes",
          active: pathname.includes("/admin/conexoes"),
        },
        {
          label: "Filas",
          icon: GitMerge,
          href: "/admin/filas",
          active: pathname.includes("/admin/filas"),
          badge: "Novo",
        },
        {
          label: "Etiquetas",
          icon: Tag,
          href: "/admin/etiquetas",
          active: pathname.includes("/admin/etiquetas"),
        },
        {
          label: "Bots",
          icon: Bot,
          href: "/admin/bots",
          active: pathname.includes("/admin/bots"),
        },
        {
          label: "Metas",
          icon: Target,
          href: "/admin/metas",
          active: pathname.includes("/admin/metas"),
        },
        {
          label: "Conquistas",
          icon: Award,
          href: "/admin/conquistas",
          active: pathname.includes("/admin/conquistas"),
        },
      ],
    },
    {
      label: "Segurança",
      icon: Shield,
      isExpandable: true,
      expanded: expandedMenus["seguranca"],
      onClick: () => toggleExpand("seguranca"),
      active: pathname.includes("/seguranca"),
      badge: null,
      children: [
        {
          label: "Bloqueios",
          icon: Lock,
          href: "/seguranca/bloqueios",
          active: pathname.includes("/seguranca/bloqueios"),
        },
        {
          label: "Privacidade",
          icon: Eye,
          href: "/seguranca/privacidade",
          active: pathname.includes("/seguranca/privacidade"),
        },
      ],
    },
    {
      label: "Relatórios",
      icon: FileBarChart,
      isExpandable: true,
      expanded: expandedMenus["relatorios"],
      onClick: () => toggleExpand("relatorios"),
      active: pathname.includes("/relatorios"),
      badge: null,
      children: [
        {
          label: "Gestão de Equipes",
          icon: Users,
          href: "/relatorios/equipes",
          active: pathname.includes("/relatorios/equipes"),
        },
        {
          label: "Atendimentos Realizados",
          icon: CheckSquare,
          href: "/relatorios/atendimentos",
          active: pathname.includes("/relatorios/atendimentos"),
        },
      ],
    },
  ]

  if (!mounted) return null

  // Mobile sidebar toggle button
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
    >
      {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  )

  // Sidebar content
  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center px-4 border-b">
        <NextLink href="/dashboard" className="flex items-center gap-2 font-semibold">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <div className="mr-2 rounded-md bg-primary p-1">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Help360</span>
            </motion.div>
          )}
          {isCollapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto"
            >
              <div className="rounded-md bg-primary p-1.5">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          )}
        </NextLink>
        {!isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
              <AvatarFallback className="bg-primary/10 text-primary">MS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Maria Silva</span>
              <span className="text-xs text-muted-foreground">Gerente de Qualidade</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Nível 3</span>
              </div>
              <span className="text-xs text-muted-foreground">750/1000 XP</span>
            </div>
            <Progress value={75} className="h-1.5" />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium">125 pontos</span>
            </div>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              Top 10%
            </Badge>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          <TooltipProvider delayDuration={0}>
            {routes.map((route, index) => (
              <React.Fragment key={route.href || `expandable-${index}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {route.isExpandable ? (
                      <div
                        onClick={route.onClick}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative cursor-pointer",
                          route.active ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                          isCollapsed && "justify-center py-3",
                        )}
                      >
                        <route.icon className={cn("h-5 w-5", route.active && "text-primary")} />
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            className="flex-1 truncate"
                          >
                            {route.label}
                          </motion.span>
                        )}
                        {!isCollapsed &&
                          (route.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                        {!isCollapsed && route.badge && (
                          <Badge
                            className={cn(
                              "ml-auto mr-2 text-xs h-5 min-w-5 flex items-center justify-center",
                              route.badge === "Novo" && "bg-green-500",
                            )}
                          >
                            {route.badge}
                          </Badge>
                        )}
                        {isCollapsed && route.badge && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    ) : (
                      <NextLink
                        href={route.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                          route.active ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                          isCollapsed && "justify-center py-3",
                        )}
                      >
                        <route.icon className={cn("h-5 w-5", route.active && "text-primary")} />
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            className="flex-1 truncate"
                          >
                            {route.label}
                          </motion.span>
                        )}
                        {!isCollapsed && route.badge && (
                          <Badge
                            className={cn(
                              "ml-auto text-xs h-5 min-w-5 flex items-center justify-center",
                              route.badge === "Novo" && "bg-green-500",
                            )}
                          >
                            {route.badge}
                          </Badge>
                        )}
                        {isCollapsed && route.badge && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </NextLink>
                    )}
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{route.label}</TooltipContent>}
                </Tooltip>

                {/* Renderiza os itens filhos se o item for expansível e estiver expandido */}
                {!isCollapsed && route.isExpandable && route.expanded && route.children && (
                  <div className="pl-8 space-y-1 mt-1 mb-1">
                    {route.children.map((child) => (
                      <NextLink
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          child.active ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <child.icon className={cn("h-4 w-4", child.active && "text-primary")} />
                        <span className="flex-1 truncate">{child.label}</span>
                        {child.badge && (
                          <Badge
                            className={cn(
                              "ml-auto text-xs h-5 min-w-5 flex items-center justify-center",
                              child.badge === "Novo" && "bg-green-500",
                            )}
                          >
                            {child.badge}
                          </Badge>
                        )}
                      </NextLink>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <div className="mt-auto p-4 border-t">
        <Button variant="outline" className="w-full justify-start gap-2" size="sm">
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Sair</span>}
        </Button>
      </div>
    </>
  )

  return (
    <>
      <MobileToggle />

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen border-r transition-all duration-300",
          isCollapsed ? "w-[80px]" : "w-[280px]",
          className,
          "glass-card",
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <div className="absolute top-0 left-0 bottom-0 w-[280px] border-r flex flex-col glass-card">
              <SidebarContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
