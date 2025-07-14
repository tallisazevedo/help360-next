import type { Metadata } from "next"
import { ChannelSettings } from "@/components/atendimento/channel-settings"

export const metadata: Metadata = {
  title: "Configurações de Atendimento | Help360",
  description: "Configurações de canais e integrações de atendimento Help360",
}

export default function ConfiguracoesPage() {
  return (
    <div className="container space-y-6 p-6">
      <ChannelSettings />
    </div>
  )
}
