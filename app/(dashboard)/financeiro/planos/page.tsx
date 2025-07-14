"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PlanosPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const features = {
    basic: [
      "Até 5 usuários",
      "Módulo de Atendimento básico",
      "1 canal de atendimento",
      "Armazenamento de 5GB",
      "Suporte por email",
    ],
    pro: [
      "Até 15 usuários",
      "Módulos de Atendimento e Qualidade",
      "3 canais de atendimento",
      "Armazenamento de 20GB",
      "Suporte prioritário",
      "Integrações com WhatsApp e Email",
      "Relatórios avançados",
    ],
    enterprise: [
      "Usuários ilimitados",
      "Todos os módulos",
      "Canais ilimitados",
      "Armazenamento de 100GB",
      "Suporte 24/7",
      "Todas as integrações",
      "API completa",
      "Personalização avançada",
      "Gerenciamento de SLA",
      "Ambiente dedicado",
    ],
  }

  const prices = {
    monthly: {
      basic: 99,
      pro: 199,
      enterprise: 399,
    },
    yearly: {
      basic: 79,
      pro: 159,
      enterprise: 319,
    },
  }

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Planos e Preços</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio. Todos os planos incluem atualizações gratuitas e suporte técnico.
          </p>

          <div className="mt-6">
            <Tabs defaultValue="monthly" className="w-[400px] mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly" onClick={() => setBillingCycle("monthly")}>
                  Mensal
                </TabsTrigger>
                <TabsTrigger value="yearly" onClick={() => setBillingCycle("yearly")}>
                  Anual
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    -20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Plano Básico */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-muted h-full flex flex-col">
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <CardDescription>Para pequenas empresas</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R${prices[billingCycle].basic}</span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mês" : "mês*"}</span>
                  {billingCycle === "yearly" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      *Cobrança anual de R${prices[billingCycle].basic * 12}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {features.basic.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Selecionar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Plano Profissional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-primary relative h-full flex flex-col">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Mais popular
              </div>
              <CardHeader>
                <CardTitle>Profissional</CardTitle>
                <CardDescription>Para empresas em crescimento</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R${prices[billingCycle].pro}</span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mês" : "mês*"}</span>
                  {billingCycle === "yearly" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      *Cobrança anual de R${prices[billingCycle].pro * 12}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {features.pro.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Selecionar</Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Plano Empresarial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-muted h-full flex flex-col">
              <CardHeader>
                <CardTitle>Empresarial</CardTitle>
                <CardDescription>Para grandes organizações</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R${prices[billingCycle].enterprise}</span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mês" : "mês*"}</span>
                  {billingCycle === "yearly" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      *Cobrança anual de R${prices[billingCycle].enterprise * 12}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {features.enterprise.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Selecionar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6 border">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-2 rounded-full shrink-0">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Precisa de um plano personalizado?</h3>
              <p className="text-muted-foreground mb-4">
                Se você tem necessidades específicas ou precisa de mais usuários, entre em contato com nossa equipe de
                vendas para um plano personalizado.
              </p>
              <Button variant="outline">Falar com vendas</Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Posso mudar de plano depois?</h3>
              <p className="text-muted-foreground text-sm">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor
                imediatamente.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Como funciona o período de trial?</h3>
              <p className="text-muted-foreground text-sm">
                Oferecemos um período de trial gratuito de 3 dias com acesso a todas as funcionalidades do plano
                Profissional.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Preciso fornecer cartão de crédito para o trial?</h3>
              <p className="text-muted-foreground text-sm">
                Não, você não precisa fornecer informações de pagamento para iniciar o período de trial gratuito.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Quais formas de pagamento são aceitas?</h3>
              <p className="text-muted-foreground text-sm">
                Aceitamos cartões de crédito, boleto bancário e PIX para pagamentos mensais e anuais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
