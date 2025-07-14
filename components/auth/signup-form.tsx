"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, ArrowLeft, Building, User, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

// Esquemas de validação para cada etapa
const step1Schema = z.object({
  accountType: z.enum(["personal", "business"], {
    required_error: "Por favor, selecione um tipo de conta",
  }),
})

const step2Schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
})

const step3Schema = z
  .object({
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
    terms: z.literal(true, {
      invalid_type_error: "Você deve aceitar os termos e condições",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

// Tipo para os dados do formulário completo
type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>

interface SignupFormProps {
  step: number
  setStep: (step: number) => void
  totalSteps: number
}

export function SignupForm({ step, setStep, totalSteps }: SignupFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<FormData>>({
    accountType: "business",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  // Formulário para a etapa 1
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      accountType: (formData.accountType as "personal" | "business") || "business",
    },
  })

  // Formulário para a etapa 2
  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
    },
  })

  // Formulário para a etapa 3
  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
      terms: formData.terms || false,
    },
  })

  // Manipuladores para cada etapa
  const onSubmitStep1 = (data: z.infer<typeof step1Schema>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(2)
  }

  const onSubmitStep2 = (data: z.infer<typeof step2Schema>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(3)
  }

  const onSubmitStep3 = async (data: z.infer<typeof step3Schema>) => {
    setIsLoading(true)

    // Combinar todos os dados do formulário
    const completeFormData = {
      ...formData,
      ...data,
    }

    // Simulação de envio para API
    try {
      // Aqui seria a chamada real para a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Cadastro iniciado com sucesso!",
        description: "Redirecionando para a página de confirmação...",
      })

      // Redirecionar para a página de sucesso
      router.push("/cadastro/sucesso")
    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Renderizar o formulário apropriado para a etapa atual
  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(onSubmitStep1)} className="space-y-6">
              <FormField
                control={step1Form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de conta</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value="personal" className="sr-only" />
                            </FormControl>
                            <User className="mb-3 h-6 w-6" />
                            Pessoal
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value="business" className="sr-only" />
                            </FormControl>
                            <Building className="mb-3 h-6 w-6" />
                            Empresarial
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12">
                Continuar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        )
      case 2:
        return (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(onSubmitStep2)} className="space-y-6">
              <FormField
                control={step2Form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome {formData.accountType === "business" ? "da empresa" : "completo"}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formData.accountType === "business" ? "Nome da empresa" : "Seu nome completo"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step2Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step2Form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1 h-12">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar
                </Button>
                <Button type="submit" className="flex-1 h-12">
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        )
      case 3:
        return (
          <Form {...step3Form}>
            <form onSubmit={step3Form.handleSubmit(onSubmitStep3)} className="space-y-6">
              <FormField
                control={step3Form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Crie uma senha forte" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step3Form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite a senha novamente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step3Form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Eu concordo com os{" "}
                          <a href="#" className="text-primary underline">
                            termos de serviço
                          </a>{" "}
                          e{" "}
                          <a href="#" className="text-primary underline">
                            política de privacidade
                          </a>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1 h-12">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar
                </Button>
                <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processando...
                    </>
                  ) : (
                    <>
                      Concluir Cadastro
                      <Check className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )
      default:
        return null
    }
  }

  return <div className="space-y-6">{renderStepForm()}</div>
}
