"use client"

import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, FileText, List, PenLine } from "lucide-react"
import { AnimatedElement } from "@/components/animated-element"

export function ProcessFlow() {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "1. Registro",
      description:
        "Usuário identifica uma não conformidade e preenche o formulário com descrição, setor, impacto e evidências.",
    },
    {
      icon: List,
      title: "2. Classificação",
      description: "Definição do nível de criticidade e designação do responsável pela análise.",
    },
    {
      icon: FileSearch,
      title: "3. Análise da Causa",
      description: "Uso de metodologias como 5 Porquês ou Diagrama de Ishikawa para identificar a causa raiz.",
    },
    {
      icon: PenLine,
      title: "4. Definição da Ação Corretiva",
      description:
        "Planejamento das ações para eliminar ou minimizar a recorrência e designação dos responsáveis e prazos.",
    },
    {
      icon: FileText,
      title: "5. Execução e Monitoramento",
      description: "Acompanhamento da implementação das ações corretivas.",
    },
    {
      icon: CheckCircle2,
      title: "6. Validação e Encerramento",
      description: "Verificação da eficácia das ações e registro de lições aprendidas.",
    },
  ]

  return (
    <section id="processo" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent" />

      <div className="container px-4 md:px-6 relative">
        <AnimatedElement
          animation="slideUp"
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Processo</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="gradient-text">Fluxo de Tratativa</span> da Não Conformidade
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Conheça o processo completo de tratamento de não conformidades na plataforma Help360.
            </p>
          </div>
        </AnimatedElement>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <AnimatedElement key={index} animation="scale" delay={0.1 + index * 0.1} className="h-full">
              <div className="relative flex h-full flex-col items-center space-y-4 rounded-2xl glass-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-center text-sm text-gray-500">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block z-10">
                    <ArrowRight className="h-6 w-6 text-primary/70" />
                  </div>
                )}
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
