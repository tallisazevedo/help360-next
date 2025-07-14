import type { Metadata } from "next"
import DocumentPageClient from "./DocumentPageClient"

export const metadata: Metadata = {
  title: "Documentação | Help360",
  description: "Gestão de documentos na plataforma Help360",
}

export default function DocumentPage() {
  return <DocumentPageClient />
}
