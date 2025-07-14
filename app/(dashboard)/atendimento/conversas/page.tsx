import type { Metadata } from "next"
import { ConversationDashboard } from "@/components/atendimento/conversation-dashboard"

export const metadata: Metadata = {
  title: "Central de Conversas | Help360",
  description: "Gestão centralizada de conversas com recursos de LGPD e Qualidade",
}

export default function ConversasPage() {
  return <ConversationDashboard />
}
