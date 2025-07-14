"use client"

import { useState } from "react"
import { Mail, MessageSquare, Phone, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedElement } from "@/components/animated-element"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        company: "",
        phone: "",
        interest: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <section id="contato" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-slate-50" />

      <div className="container px-4 md:px-6 relative">
        <AnimatedElement
          animation="slideUp"
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Contato</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="gradient-text">Entre em contato</span> conosco
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Estamos prontos para ajudar sua empresa a melhorar sua gestão de qualidade e conformidade.
            </p>
          </div>
        </AnimatedElement>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {[
            {
              icon: Phone,
              title: "Telefone",
              description: "Entre em contato por telefone",
              primary: "(28) 3199-1533",
              secondary: "Segunda a Sexta, 8h às 18h",
            },
            {
              icon: Mail,
              title: "E-mail",
              description: "Envie-nos um e-mail",
              primary: "comercial@stratplan.com.br",
              secondary: "Respondemos em até 24 horas",
            },
            {
              icon: MessageSquare,
              title: "Chat",
              description: "Chat ao vivo",
              primary: "Chat Online",
              secondary: "Disponível 24/7 para clientes",
            },
          ].map((item, index) => (
            <AnimatedElement key={index} animation="scale" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{item.primary}</p>
                  <p className="text-sm text-gray-500">{item.secondary}</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement animation="slideUp" delay={0.4} className="mx-auto max-w-3xl mt-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Solicite uma demonstração</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para solicitar uma demonstração personalizada da plataforma Help360.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <div className="rounded-full bg-green-100 p-3">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Solicitação enviada com sucesso!</h3>
                  <p className="text-center text-gray-500">
                    Obrigado pelo seu interesse. Nossa equipe entrará em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interest">Interesse principal</Label>
                    <Select value={formState.interest} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="interest" className="rounded-lg">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gestao-nao-conformidades">Gestão de Não Conformidades</SelectItem>
                        <SelectItem value="oportunidades-melhoria">Oportunidades de Melhoria</SelectItem>
                        <SelectItem value="planos-acao">Planos de Ação</SelectItem>
                        <SelectItem value="documentacao">Documentação e Evidências</SelectItem>
                        <SelectItem value="relatorios">Relatórios e Indicadores</SelectItem>
                        <SelectItem value="configuracoes">Configurações e Permissões</SelectItem>
                        <SelectItem value="chat-whatsapp">Chat e WhatsApp</SelectItem>
                        <SelectItem value="ia-atendimento">IA de Atendimento</SelectItem>
                        <SelectItem value="api-integracao">API e Integração</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="rounded-lg"
                      placeholder="Descreva suas necessidades e como podemos ajudar"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Solicitar Demonstração"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </AnimatedElement>
      </div>
    </section>
  )
}
