import type { Metadata } from "next"
import { AgendamentoManager } from "@/components/atendimento/agendamento-manager"

export const metadata: Metadata = {
  title: "Agendamento de Mensagens | Help360",
  description: "Agende mensagens para envio automático",
}

export default function AgendamentoPage() {
  return (
    <div className="container space-y-6 p-6">
      <AgendamentoManager />
    </div>
  )
}
