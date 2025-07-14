import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Atendimento | Help360",
  description: "Central de atendimento ao cliente Help360",
}

export default function AtendimentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex h-full flex-col">{children}</div>
}
