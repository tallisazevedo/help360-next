"use client"

import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "@/components/animated-element"

export function PricingSection() {
  const plans = [
    {
      name: "Básico",
      description: "Para pequenas empresas que estão começando com gestão de qualidade.",
      price: "R$ 999,99",
      period: "/mês",
      features: [
        "Até 5 usuários",
        "Gestão de Não Conformidades",
        "Planos de Ação",
        "Documentação básica",
        "Suporte por e-mail",
      ],
      cta: "Começar Agora",
      popular: false,
    },
    {
      name: "Profissional",
      description: "Para empresas em crescimento que precisam de recursos avançados.",
      price: "R$ 999,99",
      period: "/mês",
      features: [
        "Até 20 usuários",
        "Todos os recursos do plano Básico",
        "Dashboard analítico",
        "Oportunidades de Melhoria",
        "Relatórios avançados",
        "Suporte prioritário",
      ],
      cta: "Escolher Plano",
      popular: true,
    },
    {
      name: "Empresarial",
      description: "Para grandes empresas com necessidades complexas de conformidade.",
      price: "R$ 999,99",
      period: "/mês",
      features: [
        "Usuários ilimitados",
        "Todos os recursos do plano Profissional",
        "Personalização avançada",
        "API para integração",
        "Suporte 24/7",
        "Gerente de conta dedicado",
      ],
      cta: "Fale Conosco",
      popular: false,
    },
  ]

  return (
    <section id="planos" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent" />

      <div className="container px-4 md:px-6 relative">
        <AnimatedElement
          animation="slideUp"
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Planos</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="gradient-text">Escolha o plano ideal</span> para sua empresa
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Oferecemos planos flexíveis que se adaptam às necessidades do seu negócio.
            </p>
          </div>
        </AnimatedElement>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {plans.map((plan, index) => (
            <AnimatedElement key={index} animation="scale" delay={0.1 + index * 0.1} className="h-full">
              <Card className={`flex flex-col h-full glass-card ${plan.popular ? "gradient-border shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute right-4 top-0 rounded-b-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full" variant={plan.popular ? "default" : "outline"} asChild>
                    <Link href="#contato">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
