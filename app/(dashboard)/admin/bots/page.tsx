import type { Metadata } from "next"
import { BotList } from "@/components/admin/bot-list"
import { BotFilters } from "@/components/admin/bot-filters"

export const metadata: Metadata = {
  title: "Bots | Help360",
  description: "Gerenciamento de bots da plataforma Help360",
}

export default function BotsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bots</h1>
        <p className="text-muted-foreground">Gerencie os bots de atendimento automatizado</p>
      </div>

      <BotFilters />
      <BotList />
    </div>
  )
}
