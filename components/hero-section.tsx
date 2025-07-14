"use client"

import Image from "next/image"
import Link from "next/link"
import { Shield } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AnimatedElement } from "@/components/animated-element"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
      {/* Background gradient circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-70" />

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <AnimatedElement animation="fadeIn">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                <div className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Segurança e Conformidade LGPD</span>
                </div>
              </div>
            </AnimatedElement>

            <div className="space-y-2">
              <AnimatedElement animation="slideUp" delay={0.1}>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <span className="gradient-text">Help360:</span> Gestão Integrada com Segurança
                </h1>
              </AnimatedElement>

              <AnimatedElement animation="slideUp" delay={0.2}>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Plataforma multi-atendimento corporativo com foco em segurança de dados, conformidade LGPD e gestão de
                  qualidade sem burocracia.
                </p>
              </AnimatedElement>
            </div>

            <AnimatedElement animation="slideUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" asChild>
                  <Link href="/cadastro">Experimente Grátis por 3 Dias</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Saiba Mais</Link>
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fadeIn" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Segurança de Dados</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <span>Conformidade LGPD</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Multi-usuários</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>IA Integrada</span>
                </div>
              </div>
            </AnimatedElement>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative h-[450px] w-full"
            >
              <div className="absolute w-[90%] h-[90%] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-xl top-[5%] left-[5%] z-0"></div>
              <div className="glass-card rounded-3xl p-4 h-full w-full relative z-10 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=450&width=450"
                  alt="Dashboard Help360"
                  fill
                  className="object-contain p-4"
                  priority
                />

                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-primary/20 rounded-xl float"></div>
                <div className="absolute bottom-20 left-10 w-12 h-12 bg-secondary/20 rounded-xl float float-delay-1"></div>
                <div className="absolute top-1/2 right-20 w-8 h-8 bg-amber-500/20 rounded-xl float float-delay-2"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
