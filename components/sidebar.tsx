"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  BookOpen,
  Building,
  Calendar,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  FileText,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  PieChart,
  Settings,
  Shield,
  Users,
  Zap,
  MessageCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    sgi: false,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const isActive = (path: string) => pathname === path

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Help360</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/inbox")}>
                  <Link href="/inbox">
                    <Inbox className="h-4 w-4" />
                    <span>Caixa de Entrada</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/calendar")}>
                  <Link href="/calendar">
                    <Calendar className="h-4 w-4" />
                    <span>Calendário</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/nao-conformidades")}>
                  <Link href="/nao-conformidades">
                    <ClipboardList className="h-4 w-4" />
                    <span>Não Conformidades</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/planos-acao")}>
                  <Link href="/planos-acao">
                    <CheckSquare className="h-4 w-4" />
                    <span>Planos de Ação</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/melhorias")}>
                  <Link href="/melhorias">
                    <Zap className="h-4 w-4" />
                    <span>Melhorias</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/documentacao")}>
                  <Link href="/documentacao">
                    <FileText className="h-4 w-4" />
                    <span>Documentação</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/relatorios")}>
                  <Link href="/relatorios">
                    <BarChart className="h-4 w-4" />
                    <span>Relatórios</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Novo grupo para SGI */}
        <SidebarGroup>
          <SidebarGroupLabel
            className="flex cursor-pointer items-center justify-between"
            onClick={() => toggleGroup("sgi")}
          >
            <span>Sistema de Gestão Integrado</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openGroups.sgi ? "rotate-180" : "")} />
          </SidebarGroupLabel>
          {openGroups.sgi && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/gestao-sgi")}>
                    <Link href="/admin/gestao-sgi">
                      <Settings className="h-4 w-4" />
                      <span>Gestão do SGI</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/gestao-sgi?tab=processes")}>
                    <Link href="/admin/gestao-sgi?tab=processes">
                      <ClipboardList className="h-4 w-4" />
                      <span>Processos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/gestao-sgi?tab=workflows")}>
                    <Link href="/admin/gestao-sgi?tab=workflows">
                      <Zap className="h-4 w-4" />
                      <span>Fluxos de Trabalho</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/gestao-sgi?tab=documents")}>
                    <Link href="/admin/gestao-sgi?tab=documents">
                      <FileText className="h-4 w-4" />
                      <span>Documentos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/gestao-sgi?tab=indicators")}>
                    <Link href="/admin/gestao-sgi?tab=indicators">
                      <PieChart className="h-4 w-4" />
                      <span>Indicadores</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/gestao-sgi?tab=audits")}>
                    <Link href="/admin/gestao-sgi?tab=audits">
                      <ClipboardList className="h-4 w-4" />
                      <span>Auditorias</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Comunicação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/chat")}>
                  <Link href="/chat">
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/wiki")}>
                  <Link href="/wiki">
                    <BookOpen className="h-4 w-4" />
                    <span>Wiki</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/help")}>
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Ajuda</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Atendimento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/atendimento")}>
                  <Link href="/atendimento">
                    <MessageCircle className="h-4 w-4" />
                    <span>Central de Atendimento</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/atendimento/gerenciador")}>
                  <Link href="/atendimento/gerenciador">
                    <Users className="h-4 w-4" />
                    <span>Gerenciador</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/atendimento/tickets")}>
                  <Link href="/atendimento/tickets">
                    <FileText className="h-4 w-4" />
                    <span>Tickets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/atendimento/conversas")}>
                  <Link href="/atendimento/conversas">
                    <MessageCircle className="h-4 w-4" />
                    <span>Central de Conversas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/clients")}>
                  <Link href="/admin/clients">
                    <Building className="h-4 w-4" />
                    <span>Clientes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/usuarios")}>
                  <Link href="/admin/usuarios">
                    <Users className="h-4 w-4" />
                    <span>Usuários</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/security")}>
                  <Link href="/admin/security">
                    <Shield className="h-4 w-4" />
                    <span>Segurança</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
