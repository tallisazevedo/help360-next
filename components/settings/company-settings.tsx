"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/ui/file-uploader"

const companyFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome da empresa deve ter pelo menos 2 caracteres.",
  }),
  cnpj: z.string().min(14, {
    message: "CNPJ inválido.",
  }),
  address: z.string().min(5, {
    message: "Endereço deve ter pelo menos 5 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Telefone inválido.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  website: z
    .string()
    .url({
      message: "URL inválida.",
    })
    .optional(),
  description: z.string().optional(),
})

type CompanyFormValues = z.infer<typeof companyFormSchema>

const defaultValues: Partial<CompanyFormValues> = {
  name: "Empresa ABC Ltda",
  cnpj: "12.345.678/0001-90",
  address: "Av. Paulista, 1000, São Paulo - SP",
  phone: "(11) 3456-7890",
  email: "contato@empresaabc.com.br",
  website: "https://www.empresaabc.com.br",
  description: "Empresa especializada em soluções de qualidade e gestão.",
}

export function CompanySettings() {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
  })

  function onSubmit(data: CompanyFormValues) {
    console.log(data)
    // Implementar lógica de salvamento
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
                    <img
                      src="/placeholder.svg?height=160&width=160"
                      alt="Logo da empresa"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <FileUploader accept="image/*" onChange={(files) => console.log(files)} className="w-full">
                    Alterar logo
                  </FileUploader>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="00.000.000/0000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 0000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva sua empresa" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>Uma breve descrição da sua empresa.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Salvar alterações</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
