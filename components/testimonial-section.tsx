"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AnimatedElement } from "@/components/animated-element"

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "A plataforma Help360 transformou nossa gestão de qualidade. Agora temos total controle e visibilidade sobre nossas não conformidades e ações corretivas.",
      author: "Maria Silva",
      role: "Gerente de Qualidade",
      company: "Empresa ABC",
    },
    {
      quote:
        "A conformidade com a LGPD era um grande desafio para nossa empresa. Com o Help360, conseguimos implementar todos os controles necessários de forma simples e eficiente.",
      author: "João Santos",
      role: "Diretor de Compliance",
      company: "Empresa XYZ",
    },
    {
      quote:
        "A rastreabilidade de informações e a segurança dos dados sensíveis são fundamentais para nosso negócio. O Help360 nos proporciona isso com excelência.",
      author: "Ana Oliveira",
      role: "CIO",
      company: "Empresa 123",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-slate-50" />

      <div className="container px-4 md:px-6 relative">
        <AnimatedElement
          animation="slideUp"
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Depoimentos</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="gradient-text">O que nossos clientes dizem</span>
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja como a plataforma Help360 tem ajudado empresas a melhorar sua gestão de qualidade e conformidade.
            </p>
          </div>
        </AnimatedElement>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <AnimatedElement key={index} animation="scale" delay={0.1 + index * 0.1} className="h-full">
              <Card className="overflow-hidden h-full glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{testimonial.author}</p>
                        <p className="text-xs text-gray-500">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">"{testimonial.quote}"</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
