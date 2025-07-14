"use client"

import { useState } from "react"
import { ConversationList } from "@/components/atendimento/conversation-list"
import { MessagePanel } from "@/components/atendimento/message-panel"
import { EmptyState } from "@/components/atendimento/empty-state"

export function AtendimentoInterface() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  return (
    <div className="flex h-full">
      <div className="w-80 flex-shrink-0 overflow-hidden border-r bg-background">
        <ConversationList
          onSelectConversation={setSelectedConversation}
          selectedConversationId={selectedConversation}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        {selectedConversation ? (
          <MessagePanel conversationId={selectedConversation} />
        ) : (
          <EmptyState
            title="Selecione uma conversa"
            description="Escolha uma conversa da lista para iniciar o atendimento"
            icon="message-square"
          />
        )}
      </div>
    </div>
  )
}
