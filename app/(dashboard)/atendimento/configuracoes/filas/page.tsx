import type { Metadata } from "next"
import { QueueSettings } from "@/components/atendimento/queue-settings"

export const metadata: Metadata = {
  title: "Configurações de Filas | Help360",
  description: "Configurações de filas de atendimento Help360",
}

export default function FilasPage() {
  return (
    <div className="container space-y-6 p-6">
      <QueueSettings />
    </div>
  )
}
