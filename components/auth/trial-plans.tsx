import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function TrialPlans() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Escolha seu plano após o período de trial</h3>
        <p className="text-muted-foreground">
          Seu trial gratuito termina em 3 dias. Escolha um plano para continuar usando o Help360.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Básico</CardTitle>
            <CardDescription>Para pequenas empresas</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$99</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Até 5 usuários</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Módulo de Atendimento</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Suporte por email</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Selecionar
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Popular
          </div>
          <CardHeader>
            <CardTitle>Profissional</CardTitle>
            <CardDescription>Para empresas em crescimento</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$199</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Até 15 usuários</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Todos os módulos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Suporte prioritário</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Integrações avançadas</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Selecionar</Button>
          </CardFooter>
        </Card>

        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Empresarial</CardTitle>
            <CardDescription>Para grandes organizações</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$399</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Usuários ilimitados</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Todos os módulos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Suporte 24/7</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Personalização avançada</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>API completa</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Selecionar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
