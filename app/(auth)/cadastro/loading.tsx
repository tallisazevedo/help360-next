import { Loader2 } from "lucide-react"

export default function CadastroLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium">Carregando...</p>
      </div>
    </div>
  )
}
