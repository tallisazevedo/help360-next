"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { SignupForm } from "@/components/auth/signup-form"
import { Button } from "@/components/ui/button"

export default function CadastroPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Lado esquerdo - Imagem/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/90 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        {/* Círculos decorativos */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/20 rounded-full blur-xl"></div>

        <div className="relative z-20 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Image
              src="https://app.helpdesk360.com.br/static/media/logo_white.e9e9eb9a5d9b1c7f2f2e5b5b5b5b5b5b.svg"
              alt="Help360 Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-bold mb-4"
          >
            Experimente o Help360
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white/80 text-center max-w-md"
          >
            Teste gratuitamente por 3 dias nossa plataforma multi-atendimento com foco em segurança de dados e gestão de
            qualidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-12 space-y-6 w-full max-w-md"
          >
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">O que você ganha no trial:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-300 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Acesso completo a todos os módulos</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-300 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Suporte técnico durante o período</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-300 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sem necessidade de cartão de crédito</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-300 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Até 5 usuários durante o trial</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Image
                src="https://app.helpdesk360.com.br/static/media/logo_color.cd67e9c711ddcaef62031842d33ac9d4.svg"
                alt="Help360 Logo"
                width={150}
                height={45}
                className="h-10 w-auto"
              />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Cadastre-se</h2>
            <p className="text-muted-foreground">Crie sua conta e experimente o Help360 gratuitamente por 3 dias</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm text-muted-foreground">
                Etapa {step} de {totalSteps}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <SignupForm step={step} setStep={setStep} totalSteps={totalSteps} />

          <p className="text-center text-sm text-muted-foreground mt-8">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Faça login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
