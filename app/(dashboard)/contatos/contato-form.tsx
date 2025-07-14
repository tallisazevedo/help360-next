"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface ContatoFormProps {
  onClose: () => void
}

// Dados de exemplo para empresas
const empresas = [
  { id: 1, nome: "Empresa ABC Ltda" },
  { id: 2, nome: "Indústrias XYZ S.A." },
  { id: 3, nome: "Comércio Rápido ME" },
  { id: 4, nome: "Consultoria Estratégica" },
  { id: 5, nome: "Distribuidora Nacional" },
]

export function ContatoForm({ onClose }: ContatoFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
    celular: "",
    observacoes: "",
    empresasSelecionadas: [] as number[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmpresaToggle = (empresaId: number) => {
    setFormData((prev) => {
      const empresasSelecionadas = [...prev.empresasSelecionadas]

      if (empresasSelecionadas.includes(empresaId)) {
        return {
          ...prev,
          empresasSelecionadas: empresasSelecionadas.filter((id) => id !== empresaId),
        }
      } else {
        return {
          ...prev,
          empresasSelecionadas: [...empresasSelecionadas, empresaId],
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dados do contato:", formData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Cadastrar Novo Contato</DialogTitle>
          <DialogDescription>
            Preencha os dados do contato. Você pode vincular o contato a uma ou mais empresas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="informacoes" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
              <TabsTrigger value="empresas">Empresas Vinculadas</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" name="email" value={formData.email} onChange={handleChange} type="email" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="celular">Celular</Label>
                    <Input id="celular" name="celular" value={formData.celular} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="empresas" className="space-y-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Selecione uma ou mais empresas para vincular a este contato.
                </div>

                <div className="border rounded-md p-4 space-y-3">
                  {empresas.map((empresa) => (
                    <div key={empresa.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`empresa-${empresa.id}`}
                        checked={formData.empresasSelecionadas.includes(empresa.id)}
                        onCheckedChange={() => handleEmpresaToggle(empresa.id)}
                      />
                      <Label htmlFor={`empresa-${empresa.id}`} className="flex-1 cursor-pointer">
                        {empresa.nome}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.empresasSelecionadas.length > 0 ? (
                    <>
                      <div className="text-sm text-muted-foreground mr-2">Empresas selecionadas:</div>
                      {formData.empresasSelecionadas.map((id) => {
                        const empresa = empresas.find((e) => e.id === id)
                        return empresa ? (
                          <Badge key={id} variant="secondary" className="flex items-center gap-1">
                            {empresa.nome}
                            <button
                              type="button"
                              onClick={() => handleEmpresaToggle(id)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ) : null
                      })}
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">Nenhuma empresa selecionada</div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Contato</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
