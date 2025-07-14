"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/ui/file-uploader"
import { Separator } from "@/components/ui/separator"

export function NonConformityForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/nao-conformidades")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="informacoes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
              <TabsTrigger value="analise">Análise da Causa</TabsTrigger>
              <TabsTrigger value="acoes">Ações Corretivas</TabsTrigger>
            </TabsList>
            <TabsContent value="informacoes" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Título da não conformidade" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Select required>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Produção</SelectItem>
                      <SelectItem value="quality">Qualidade</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="supply">Suprimentos</SelectItem>
                      <SelectItem value="hr">RH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severidade</Label>
                  <Select required>
                    <SelectTrigger id="severity">
                      <SelectValue placeholder="Selecione a severidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável</Label>
                  <Select required>
                    <SelectTrigger id="responsible">
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Oliveira</SelectItem>
                      <SelectItem value="carlos">Carlos Santos</SelectItem>
                      <SelectItem value="ana">Ana Pereira</SelectItem>
                      <SelectItem value="roberto">Roberto Alves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descreva detalhadamente a não conformidade" rows={5} required />
              </div>
              <div className="space-y-2">
                <Label>Evidências</Label>
                <FileUploader />
              </div>
            </TabsContent>
            <TabsContent value="analise" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cause">Causa Raiz</Label>
                <Textarea id="cause" placeholder="Descreva a causa raiz identificada" rows={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="analysis-method">Método de Análise</Label>
                <Select>
                  <SelectTrigger id="analysis-method">
                    <SelectValue placeholder="Selecione o método de análise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5why">5 Porquês</SelectItem>
                    <SelectItem value="ishikawa">Diagrama de Ishikawa</SelectItem>
                    <SelectItem value="fmea">FMEA</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="analysis-details">Detalhes da Análise</Label>
                <Textarea id="analysis-details" placeholder="Descreva os detalhes da análise realizada" rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Documentos de Análise</Label>
                <FileUploader />
              </div>
            </TabsContent>
            <TabsContent value="acoes" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="action-plan">Plano de Ação</Label>
                <Textarea id="action-plan" placeholder="Descreva as ações corretivas planejadas" rows={5} />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="action-responsible">Responsável pela Ação</Label>
                  <Select>
                    <SelectTrigger id="action-responsible">
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Oliveira</SelectItem>
                      <SelectItem value="carlos">Carlos Santos</SelectItem>
                      <SelectItem value="ana">Ana Pereira</SelectItem>
                      <SelectItem value="roberto">Roberto Alves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Prazo</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verification">Método de Verificação</Label>
                <Textarea id="verification" placeholder="Descreva como será verificada a eficácia das ações" rows={3} />
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.push("/nao-conformidades")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
