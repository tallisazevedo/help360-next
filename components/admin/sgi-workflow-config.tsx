"use client"

import { useState } from "react"
import { Edit, Plus, Save, Trash, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// Exemplo de fluxos de trabalho
const workflowsExample = [
  {
    id: "wf-1",
    name: "Tratamento de Não Conformidade",
    description: "Fluxo para tratamento de não conformidades identificadas",
    status: "Ativo",
    process: "Gestão de Não Conformidades",
    steps: [
      {
        id: "step-1",
        name: "Identificação e Registro",
        description: "Registro inicial da não conformidade",
        responsible: "Atendentes",
        approvalRequired: false,
        notifyOnComplete: true,
        timeLimit: 1,
        timeLimitUnit: "dias",
      },
      {
        id: "step-2",
        name: "Análise de Causa",
        description: "Análise da causa raiz da não conformidade",
        responsible: "Analistas de Qualidade",
        approvalRequired: true,
        notifyOnComplete: true,
        timeLimit: 3,
        timeLimitUnit: "dias",
      },
      {
        id: "step-3",
        name: "Definição de Ação Corretiva",
        description: "Definição das ações para corrigir a não conformidade",
        responsible: "Analistas de Qualidade",
        approvalRequired: true,
        notifyOnComplete: true,
        timeLimit: 2,
        timeLimitUnit: "dias",
      },
      {
        id: "step-4",
        name: "Implementação",
        description: "Implementação das ações corretivas",
        responsible: "Equipes Designadas",
        approvalRequired: false,
        notifyOnComplete: true,
        timeLimit: 5,
        timeLimitUnit: "dias",
      },
      {
        id: "step-5",
        name: "Verificação de Eficácia",
        description: "Verificação da eficácia das ações implementadas",
        responsible: "Gerentes de Qualidade",
        approvalRequired: true,
        notifyOnComplete: true,
        timeLimit: 3,
        timeLimitUnit: "dias",
      },
    ],
    expanded: true,
  },
  {
    id: "wf-2",
    name: "Implementação de Melhoria",
    description: "Fluxo para implementação de melhorias identificadas",
    status: "Ativo",
    process: "Gestão de Melhorias",
    steps: [
      {
        id: "step-6",
        name: "Registro da Oportunidade",
        description: "Registro inicial da oportunidade de melhoria",
        responsible: "Todos os Departamentos",
        approvalRequired: false,
        notifyOnComplete: true,
        timeLimit: 1,
        timeLimitUnit: "dias",
      },
      {
        id: "step-7",
        name: "Análise de Viabilidade",
        description: "Análise da viabilidade da melhoria proposta",
        responsible: "Gerentes de Qualidade",
        approvalRequired: true,
        notifyOnComplete: true,
        timeLimit: 5,
        timeLimitUnit: "dias",
      },
      {
        id: "step-8",
        name: "Planejamento",
        description: "Planejamento da implementação da melhoria",
        responsible: "Gerentes de Qualidade",
        approvalRequired: true,
        notifyOnComplete: true,
        timeLimit: 3,
        timeLimitUnit: "dias",
      },
      {
        id: "step-9",
        name: "Implementação",
        description: "Implementação da melhoria",
        responsible: "Equipes Designadas",
        approvalRequired: false,
        notifyOnComplete: true,
        timeLimit: 10,
        timeLimitUnit: "dias",
      },
      {
        id: "step-10",
        name: "Avaliação de Resultados",
        description: "Avaliação dos resultados obtidos com a melhoria",
        responsible: "Gerentes de Qualidade",
        approvalRequired: true,
        notifyOnComplete: true,
        timeLimit: 5,
        timeLimitUnit: "dias",
      },
    ],
    expanded: false,
  },
]

export function SGIWorkflowConfig() {
  const [workflows, setWorkflows] = useState(workflowsExample)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>("wf-1")
  const [editingStep, setEditingStep] = useState<string | null>(null)

  const toggleWorkflowExpand = (workflowId: string) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === workflowId ? { ...workflow, expanded: !workflow.expanded } : workflow,
      ),
    )
  }

  const selectWorkflow = (workflowId: string) => {
    setSelectedWorkflow(workflowId)
    setEditingStep(null)
  }

  const startEditStep = (stepId: string) => {
    setEditingStep(stepId)
  }

  const cancelEditStep = () => {
    setEditingStep(null)
  }

  const selectedWorkflowData = workflows.find((wf) => wf.id === selectedWorkflow)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="lg:w-1/3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Fluxos de Trabalho</h3>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Novo Fluxo
            </Button>
          </div>
          <div className="space-y-2">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-muted/50",
                  selectedWorkflow === workflow.id && "border-primary",
                )}
                onClick={() => selectWorkflow(workflow.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{workflow.name}</div>
                      <div className="text-sm text-muted-foreground">{workflow.process}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        workflow.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {selectedWorkflowData && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{selectedWorkflowData.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedWorkflowData.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash className="mr-1 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Etapas do Fluxo</h4>
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    Nova Etapa
                  </Button>
                </div>

                <div className="space-y-3">
                  {selectedWorkflowData.steps.map((step, index) => (
                    <Card key={step.id}>
                      {editingStep === step.id ? (
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="stepName">Nome da Etapa</Label>
                                <Input id="stepName" defaultValue={step.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="stepResponsible">Responsável</Label>
                                <Select defaultValue={step.responsible}>
                                  <SelectTrigger id="stepResponsible">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Atendentes">Atendentes</SelectItem>
                                    <SelectItem value="Analistas de Qualidade">Analistas de Qualidade</SelectItem>
                                    <SelectItem value="Gerentes de Qualidade">Gerentes de Qualidade</SelectItem>
                                    <SelectItem value="Equipes Designadas">Equipes Designadas</SelectItem>
                                    <SelectItem value="Todos os Departamentos">Todos os Departamentos</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="stepDescription">Descrição</Label>
                                <Input id="stepDescription" defaultValue={step.description} />
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="stepTimeLimit">Prazo</Label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      id="stepTimeLimit"
                                      type="number"
                                      defaultValue={step.timeLimit}
                                      className="w-20"
                                    />
                                    <Select defaultValue={step.timeLimitUnit}>
                                      <SelectTrigger className="w-24">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="horas">Horas</SelectItem>
                                        <SelectItem value="dias">Dias</SelectItem>
                                        <SelectItem value="semanas">Semanas</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex h-10 items-center">
                                  <div className="flex items-center space-x-2">
                                    <Switch defaultChecked={step.approvalRequired} id="approval" />
                                    <Label htmlFor="approval">Requer aprovação</Label>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch defaultChecked={step.notifyOnComplete} id="notify" />
                                  <Label htmlFor="notify">Notificar ao concluir</Label>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={cancelEditStep}>
                                <X className="mr-1 h-4 w-4" />
                                Cancelar
                              </Button>
                              <Button size="sm" onClick={cancelEditStep}>
                                <Save className="mr-1 h-4 w-4" />
                                Salvar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      ) : (
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium">{step.name}</div>
                                <div className="text-sm text-muted-foreground">{step.description}</div>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                                  <Badge variant="outline">Responsável: {step.responsible}</Badge>
                                  <Badge variant="outline">
                                    Prazo: {step.timeLimit} {step.timeLimitUnit}
                                  </Badge>
                                  {step.approvalRequired && (
                                    <Badge className="bg-blue-100 text-blue-800">Requer aprovação</Badge>
                                  )}
                                  {step.notifyOnComplete && (
                                    <Badge className="bg-green-100 text-green-800">Notificar ao concluir</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => startEditStep(step.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {index < selectedWorkflowData.steps.length - 1 && (
                            <div className="ml-3 mt-2 flex items-center">
                              <div className="h-6 w-0.5 bg-muted"></div>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Fluxo de Trabalho
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
