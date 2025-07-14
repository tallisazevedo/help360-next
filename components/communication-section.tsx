"use client"

import { Bot, MessageSquare, History, ImageIcon, Smartphone, Code } from "lucide-react"

import { AnimatedElement } from "@/components/animated-element"
import { Card, CardContent } from "@/components/ui/card"

export function CommunicationSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Chat Integrado",
      description: "Atendimento em tempo real via chat integrado diretamente na plataforma.",
    },
    {
      icon: Smartphone,
      title: "WhatsApp Business",
      description: "Integração completa com WhatsApp Business API para atendimento multicanal.",
    },
    {
      icon: Bot,
      title: "IA de Atendimento",
      description: "Automatize respostas com nossa IA treinada para resolver problemas comuns.",
    },
    {
      icon: ImageIcon,
      title: "Gestão de Mídias",
      description: "Organize e gerencie todas as mídias compartilhadas nos atendimentos.",
    },
    {
      icon: History,
      title: "Histórico de Revisões",
      description: "Rastreie todas as alterações com histórico completo de revisões.",
    },
    {
      icon: Code,
      title: "API Aberta",
      description: "API totalmente aberta para integração com seus sistemas existentes.",
    },
  ]

  return (
    <section id="integracao" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/3 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-70" />

      <div className="container space-y-12 px-4 md:px-6 relative">
        <AnimatedElement
          animation="slideUp"
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Comunicação & IA
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="gradient-text">Comunicação Inteligente</span>
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Atendimento multicanal com inteligência artificial e integração completa
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedElement key={index} animation="scale" delay={0.1 + index * 0.1} className="h-full">
              <Card className="h-full glass-card gradient-border overflow-hidden group">
                <CardContent className="p-6 flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{feature.title}</h3>
                  <p className="text-center text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="mt-12 text-center">
            <div className="inline-block glass-card p-6 rounded-2xl">
              <p className="text-lg font-medium">
                <span className="gradient-text font-bold">API Totalmente Aberta</span> para integração com seus sistemas
                existentes. Conecte o Help360 com qualquer plataforma através de nossa documentação completa.
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
