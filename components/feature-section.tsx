"use client"

import { BarChart3, FileText, Lock, MessageSquare, Shield, Users } from "lucide-react"
import { AnimatedElement } from "@/components/animated-element"

export function FeatureSection() {
  const features = [
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção de dados sensíveis com criptografia e controles de acesso rigorosos.",
    },
    {
      icon: Users,
      title: "Multi-usuários",
      description: "Suporte a múltiplos usuários com diferentes níveis de permissão e acesso.",
    },
    {
      icon: Lock,
      title: "Conformidade LGPD",
      description: "Ferramentas para garantir o cumprimento da Lei Geral de Proteção de Dados.",
    },
    {
      icon: BarChart3,
      title: "Gestão Integrada",
      description: "Sistema de Gestão Integrada (SGI) para controle de qualidade sem burocracia.",
    },
    {
      icon: MessageSquare,
      title: "Multi-atendimento",
      description: "Plataforma de atendimento corporativo integrada e centralizada.",
    },
    {
      icon: FileText,
      title: "Rastreabilidade",
      description: "Rastreamento completo de informações e ações realizadas no sistema.",
    },
  ]

  return (
    <section id="recursos" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-slate-50" />

      <div className="container space-y-12 px-4 md:px-6 relative">
        <AnimatedElement
          animation="slideUp"
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Recursos</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="gradient-text">Recursos Principais</span>
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A plataforma Help360 oferece uma solução completa para gestão de qualidade, segurança de dados e
              conformidade.
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedElement key={index} animation="slideUp" delay={0.1 + index * 0.1}>
              <div className="flex flex-col items-center space-y-4 rounded-2xl border p-6 shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-gray-500">{feature.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
