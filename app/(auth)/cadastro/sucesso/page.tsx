import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { TrialPlans } from "@/components/auth/trial-plans"

export default function CadastroSucessoPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-semibold mb-2">Cadastro Realizado com Sucesso!</h1>
      <p className="text-gray-600 mb-8 text-center">
        Sua conta foi criada com sucesso. Agora você pode aproveitar todos os recursos da nossa plataforma.
      </p>
      <div className="flex space-x-4">
        <Link href="/login">
          <Button variant="default">Ir para o Login</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Voltar para a Página Inicial</Button>
        </Link>
      </div>

      <div className="mt-12">
        <TrialPlans />
      </div>
    </div>
  )
}
