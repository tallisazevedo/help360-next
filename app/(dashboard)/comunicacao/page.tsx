import type { Metadata } from "next"
import { ChatInterface } from "@/components/communication/chat-interface"
import { TicketList } from "@/components/communication/ticket-list"

export const metadata: Metadata = {
  title: "Atendimento | Help360",
  description: "Sistema de atendimento integrado da plataforma Help360",
}

export default function CommunicationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Central de Atendimento</h1>
        <p className="text-muted-foreground">Sistema de atendimento integrado com chat, WhatsApp e e-mail</p>
      </div>

      <div className="flex flex-1 gap-4 h-full overflow-hidden">
        <div className="w-80 h-full overflow-hidden border rounded-lg bg-background">
          <TicketList />
        </div>
        <div className="flex-1 border rounded-lg bg-background overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}
