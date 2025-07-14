import { Loader2 } from "lucide-react"

export default function PlanosLoading() {
  return (
    <div className="container py-10 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium">Carregando planos...</p>
      </div>
    </div>
  )
}
