import type React from "react"
import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { ConfiguracoesNav } from "@/components/atendimento/configuracoes-nav"

export const metadata: Metadata = {
  title: "Configurações de Atendimento | Help360",
  description: "Gerencie as configurações do sistema de atendimento",
}

interface ConfiguracoesLayoutProps {
  children: React.ReactNode
}

export default function ConfiguracoesLayout({ children }: ConfiguracoesLayoutProps) {
  return (
    <div className="container space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as configurações do sistema de atendimento</p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <ConfiguracoesNav />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
