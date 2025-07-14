"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  GitMerge,
  Calendar,
  Clock,
  FileText,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  FileBarChart,
  Layers,
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
  Info,
  FileCheck,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"

// Tipos para os processos
type ProcessStatus = "Ativo" | "Em revisão" | "Inativo" | "Obsoleto"
type ProcessType = "Estratégico" | "Tático" | "Operacional" | "Suporte"
type ProcessCategory = "Primário" | "Suporte" | "Gestão"

interface Indicator {
  id: string
  name: string
  description?: string
}

interface Document {
  id: string
  code: string
  name: string
  type: string
  url: string
}

interface Risk {
  id: string
  name: string
  impact: "Baixo" | "Médio" | "Alto" | "Crítico"
  probability: "Baixa" | "Média" | "Alta" | "Muito Alta"
}

interface Process {
  id: string
  codigo: string
  nome: string
  descricao: string
  tipo: ProcessType
  categoria: ProcessCategory
  status: ProcessStatus
  responsavel: {
    nome: string
    avatar: string
    iniciais: string
  }
  departamento: string
  dataCriacao: string
  dataRevisao: string
  proximaRevisao: string
  versao: string
  indicadores: string[]
  documentos: Document[]
  riscos: string[]
  subprocessos: Process[]
  parentId?: string
}

// Dados de exemplo para documentos
const documentosMock: Document[] = [
  {
    id: "doc1",
    code: "PO-COM-001",
    name: "Política de Atendimento ao Cliente",
    type: "Política",
    url: "/documentos/po-com-001.pdf",
  },
  {
    id: "doc2",
    code: "IT-COM-002",
    name: "Instrução de Trabalho - Atendimento",
    type: "Instrução",
    url: "/documentos/it-com-002.pdf",
  },
  {
    id: "doc3",
    code: "IT-COM-003",
    name: "Instrução de Trabalho - Triagem",
    type: "Instrução",
    url: "/documentos/it-com-003.pdf",
  },
  {
    id: "doc4",
    code: "IT-SUP-001",
    name: "Instrução de Trabalho - Suporte",
    type: "Instrução",
    url: "/documentos/it-sup-001.pdf",
  },
  { id: "doc5", code: "PO-VEN-001", name: "Política de Vendas", type: "Política", url: "/documentos/po-ven-001.pdf" },
  {
    id: "doc6",
    code: "IT-VEN-003",
    name: "Instrução de Trabalho - Prospecção",
    type: "Instrução",
    url: "/documentos/it-ven-003.pdf",
  },
  {
    id: "doc7",
    code: "PO-RH-001",
    name: "Política de Recrutamento",
    type: "Política",
    url: "/documentos/po-rh-001.pdf",
  },
  {
    id: "doc8",
    code: "IT-RH-002",
    name: "Instrução de Trabalho - Seleção",
    type: "Instrução",
    url: "/documentos/it-rh-002.pdf",
  },
  { id: "doc9", code: "PO-FIN-001", name: "Política Financeira", type: "Política", url: "/documentos/po-fin-001.pdf" },
  {
    id: "doc10",
    code: "IT-FIN-003",
    name: "Instrução de Trabalho - Pagamentos",
    type: "Instrução",
    url: "/documentos/it-fin-003.pdf",
  },
  { id: "doc11", code: "MQ-001", name: "Manual da Qualidade", type: "Manual", url: "/documentos/mq-001.pdf" },
  {
    id: "doc12",
    code: "PO-QUA-001",
    name: "Política da Qualidade",
    type: "Política",
    url: "/documentos/po-qua-001.pdf",
  },
]

// Dados de exemplo para indicadores
const indicadoresMock: Indicator[] = [
  { id: "ind1", name: "Tempo médio de atendimento", description: "Tempo médio entre o início e o fim do atendimento" },
  {
    id: "ind2",
    name: "Índice de satisfação do cliente",
    description: "Percentual de clientes satisfeitos com o atendimento",
  },
  { id: "ind3", name: "Taxa de conversão", description: "Percentual de leads convertidos em clientes" },
  { id: "ind4", name: "Ticket médio", description: "Valor médio das vendas" },
  { id: "ind5", name: "Ciclo de vendas", description: "Tempo médio do ciclo de vendas" },
  {
    id: "ind6",
    name: "Tempo médio de contratação",
    description: "Tempo médio entre a abertura da vaga e a contratação",
  },
  {
    id: "ind7",
    name: "Qualidade das contratações",
    description: "Percentual de contratações que passam do período de experiência",
  },
  { id: "ind8", name: "Fluxo de caixa", description: "Saldo de caixa no período" },
  { id: "ind9", name: "Margem de lucro", description: "Percentual de lucro sobre as vendas" },
  { id: "ind10", name: "ROI", description: "Retorno sobre o investimento" },
  { id: "ind11", name: "Índice de não conformidades", description: "Número de não conformidades por período" },
  { id: "ind12", name: "Eficácia de ações corretivas", description: "Percentual de ações corretivas eficazes" },
  { id: "ind13", name: "Tempo de triagem", description: "Tempo médio para triagem de atendimentos" },
  {
    id: "ind14",
    name: "Precisão do direcionamento",
    description: "Percentual de atendimentos direcionados corretamente",
  },
  {
    id: "ind15",
    name: "Taxa de resolução no primeiro contato",
    description: "Percentual de problemas resolvidos no primeiro contato",
  },
  { id: "ind16", name: "Tempo médio de resolução", description: "Tempo médio para resolução de problemas" },
]

// Dados de exemplo para riscos
const riscosMock = [
  { id: "risk1", name: "Falha no sistema de atendimento", impact: "Alto", probability: "Média" },
  { id: "risk2", name: "Indisponibilidade de atendentes", impact: "Médio", probability: "Baixa" },
  { id: "risk3", name: "Classificação incorreta", impact: "Médio", probability: "Média" },
  { id: "risk4", name: "Problemas complexos sem solução imediata", impact: "Alto", probability: "Média" },
  { id: "risk5", name: "Perda de oportunidades", impact: "Alto", probability: "Média" },
  { id: "risk6", name: "Concorrência agressiva", impact: "Alto", probability: "Alta" },
  { id: "risk7", name: "Escassez de candidatos qualificados", impact: "Alto", probability: "Alta" },
  { id: "risk8", name: "Alta rotatividade", impact: "Médio", probability: "Média" },
  { id: "risk9", name: "Inadimplência", impact: "Alto", probability: "Média" },
  { id: "risk10", name: "Variação cambial", impact: "Médio", probability: "Alta" },
  { id: "risk11", name: "Falhas no controle de qualidade", impact: "Alto", probability: "Baixa" },
  { id: "risk12", name: "Não conformidades recorrentes", impact: "Alto", probability: "Média" },
]

// Dados de exemplo para processos
const processosMock: Process[] = [
  {
    id: "P001",
    codigo: "PRO-COM-001",
    nome: "Atendimento ao Cliente",
    descricao: "Processo de atendimento e suporte ao cliente via canais digitais",
    tipo: "Operacional",
    categoria: "Primário",
    status: "Ativo",
    responsavel: {
      nome: "Carlos Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "CS",
    },
    departamento: "Comercial",
    dataCriacao: "10/01/2023",
    dataRevisao: "10/05/2023",
    proximaRevisao: "10/05/2024",
    versao: "1.2",
    indicadores: ["Tempo médio de atendimento", "Índice de satisfação do cliente"],
    documentos: [
      {
        id: "doc1",
        code: "PO-COM-001",
        name: "Política de Atendimento ao Cliente",
        type: "Política",
        url: "/documentos/po-com-001.pdf",
      },
      {
        id: "doc2",
        code: "IT-COM-002",
        name: "Instrução de Trabalho - Atendimento",
        type: "Instrução",
        url: "/documentos/it-com-002.pdf",
      },
    ],
    riscos: ["Falha no sistema de atendimento", "Indisponibilidade de atendentes"],
    subprocessos: [
      {
        id: "P001-S001",
        codigo: "PRO-COM-001-S001",
        nome: "Triagem de Atendimento",
        descricao: "Classificação e direcionamento inicial do atendimento",
        tipo: "Operacional",
        categoria: "Primário",
        status: "Ativo",
        responsavel: {
          nome: "Ana Costa",
          avatar: "/placeholder.svg?height=32&width=32",
          iniciais: "AC",
        },
        departamento: "Comercial",
        dataCriacao: "15/01/2023",
        dataRevisao: "15/05/2023",
        proximaRevisao: "15/05/2024",
        versao: "1.1",
        indicadores: ["Tempo de triagem", "Precisão do direcionamento"],
        documentos: [
          {
            id: "doc3",
            code: "IT-COM-003",
            name: "Instrução de Trabalho - Triagem",
            type: "Instrução",
            url: "/documentos/it-com-003.pdf",
          },
        ],
        riscos: ["Classificação incorreta"],
        subprocessos: [],
        parentId: "P001",
      },
      {
        id: "P001-S002",
        codigo: "PRO-COM-001-S002",
        nome: "Resolução de Problemas",
        descricao: "Atendimento e resolução de problemas reportados",
        tipo: "Operacional",
        categoria: "Primário",
        status: "Ativo",
        responsavel: {
          nome: "Pedro Alves",
          avatar: "/placeholder.svg?height=32&width=32",
          iniciais: "PA",
        },
        departamento: "Suporte",
        dataCriacao: "20/01/2023",
        dataRevisao: "20/05/2023",
        proximaRevisao: "20/05/2024",
        versao: "1.0",
        indicadores: ["Taxa de resolução no primeiro contato", "Tempo médio de resolução"],
        documentos: [
          {
            id: "doc4",
            code: "IT-SUP-001",
            name: "Instrução de Trabalho - Suporte",
            type: "Instrução",
            url: "/documentos/it-sup-001.pdf",
          },
        ],
        riscos: ["Problemas complexos sem solução imediata"],
        subprocessos: [],
        parentId: "P001",
      },
    ],
  },
  {
    id: "P002",
    codigo: "PRO-VEN-001",
    nome: "Vendas e Prospecção",
    descricao: "Processo de prospecção, qualificação e conversão de leads em clientes",
    tipo: "Operacional",
    categoria: "Primário",
    status: "Ativo",
    responsavel: {
      nome: "Mariana Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "MS",
    },
    departamento: "Vendas",
    dataCriacao: "05/02/2023",
    dataRevisao: "05/06/2023",
    proximaRevisao: "05/06/2024",
    versao: "1.3",
    indicadores: ["Taxa de conversão", "Ticket médio", "Ciclo de vendas"],
    documentos: [
      {
        id: "doc5",
        code: "PO-VEN-001",
        name: "Política de Vendas",
        type: "Política",
        url: "/documentos/po-ven-001.pdf",
      },
      {
        id: "doc6",
        code: "IT-VEN-003",
        name: "Instrução de Trabalho - Prospecção",
        type: "Instrução",
        url: "/documentos/it-ven-003.pdf",
      },
    ],
    riscos: ["Perda de oportunidades", "Concorrência agressiva"],
    subprocessos: [],
  },
  {
    id: "P003",
    codigo: "PRO-RH-001",
    nome: "Recrutamento e Seleção",
    descricao: "Processo de captação, seleção e contratação de novos colaboradores",
    tipo: "Suporte",
    categoria: "Suporte",
    status: "Em revisão",
    responsavel: {
      nome: "Juliana Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "JM",
    },
    departamento: "Recursos Humanos",
    dataCriacao: "15/03/2023",
    dataRevisao: "15/07/2023",
    proximaRevisao: "15/07/2024",
    versao: "2.0",
    indicadores: ["Tempo médio de contratação", "Qualidade das contratações"],
    documentos: [
      {
        id: "doc7",
        code: "PO-RH-001",
        name: "Política de Recrutamento",
        type: "Política",
        url: "/documentos/po-rh-001.pdf",
      },
      {
        id: "doc8",
        code: "IT-RH-002",
        name: "Instrução de Trabalho - Seleção",
        type: "Instrução",
        url: "/documentos/it-rh-002.pdf",
      },
    ],
    riscos: ["Escassez de candidatos qualificados", "Alta rotatividade"],
    subprocessos: [],
  },
  {
    id: "P004",
    codigo: "PRO-FIN-001",
    nome: "Gestão Financeira",
    descricao: "Processo de planejamento, execução e controle financeiro",
    tipo: "Estratégico",
    categoria: "Gestão",
    status: "Ativo",
    responsavel: {
      nome: "Roberto Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "RO",
    },
    departamento: "Financeiro",
    dataCriacao: "20/04/2023",
    dataRevisao: "20/08/2023",
    proximaRevisao: "20/08/2024",
    versao: "1.1",
    indicadores: ["Fluxo de caixa", "Margem de lucro", "ROI"],
    documentos: [
      {
        id: "doc9",
        code: "PO-FIN-001",
        name: "Política Financeira",
        type: "Política",
        url: "/documentos/po-fin-001.pdf",
      },
      {
        id: "doc10",
        code: "IT-FIN-003",
        name: "Instrução de Trabalho - Pagamentos",
        type: "Instrução",
        url: "/documentos/it-fin-003.pdf",
      },
    ],
    riscos: ["Inadimplência", "Variação cambial"],
    subprocessos: [],
  },
  {
    id: "P005",
    codigo: "PRO-QUA-001",
    nome: "Gestão da Qualidade",
    descricao: "Processo de garantia da qualidade e melhoria contínua",
    tipo: "Tático",
    categoria: "Gestão",
    status: "Ativo",
    responsavel: {
      nome: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      iniciais: "AC",
    },
    departamento: "Qualidade",
    dataCriacao: "10/05/2023",
    dataRevisao: "10/09/2023",
    proximaRevisao: "10/09/2024",
    versao: "1.0",
    indicadores: ["Índice de não conformidades", "Eficácia de ações corretivas"],
    documentos: [
      { id: "doc11", code: "MQ-001", name: "Manual da Qualidade", type: "Manual", url: "/documentos/mq-001.pdf" },
      {
        id: "doc12",
        code: "PO-QUA-001",
        name: "Política da Qualidade",
        type: "Política",
        url: "/documentos/po-qua-001.pdf",
      },
    ],
    riscos: ["Falhas no controle de qualidade", "Não conformidades recorrentes"],
    subprocessos: [],
  },
]

// Componente para estatísticas
const StatsCard = ({
  title,
  value,
  icon,
  description,
  color,
}: { title: string; value: string; icon: React.ReactNode; description?: string; color?: string }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className={`p-3 rounded-full ${color || "bg-primary/10"}`}>{icon}</div>
      </div>
    </CardContent>
  </Card>
)

// Componente para o formulário de processo
const ProcessForm = ({
  process,
  onSubmit,
  isSubprocess = false,
  parentProcess = null,
}: {
  process?: Process
  onSubmit: (data: any) => void
  isSubprocess?: boolean
  parentProcess?: Process | null
}) => {
  const isEditing = !!process
  const title = isEditing ? "Editar Processo" : isSubprocess ? "Criar Subprocesso" : "Criar Novo Processo"

  const description = isEditing
    ? "Atualize as informações do processo existente."
    : isSubprocess
      ? `Adicione um novo subprocesso para "${parentProcess?.nome}".`
      : "Preencha as informações para criar um novo processo."

  const [selectedTab, setSelectedTab] = useState("informacoes")
  const [selectedIndicadores, setSelectedIndicadores] = useState<string[]>(process?.indicadores || [])
  const [selectedDocumentos, setSelectedDocumentos] = useState<Document[]>(process?.documentos || [])
  const [selectedRiscos, setSelectedRiscos] = useState<string[]>(process?.riscos || [])
  const [indicadorSearchTerm, setIndicadorSearchTerm] = useState("")
  const [documentoSearchTerm, setDocumentoSearchTerm] = useState("")
  const [riscoSearchTerm, setRiscoSearchTerm] = useState("")

  // Filtrar indicadores com base no termo de pesquisa
  const filteredIndicadores = indicadoresMock.filter((indicador) =>
    indicador.name.toLowerCase().includes(indicadorSearchTerm.toLowerCase()),
  )

  // Filtrar documentos com base no termo de pesquisa
  const filteredDocumentos = documentosMock.filter(
    (documento) =>
      documento.code.toLowerCase().includes(documentoSearchTerm.toLowerCase()) ||
      documento.name.toLowerCase().includes(documentoSearchTerm.toLowerCase()),
  )

  // Filtrar riscos com base no termo de pesquisa
  const filteredRiscos = riscosMock.filter((risco) => risco.name.toLowerCase().includes(riscoSearchTerm.toLowerCase()))

  // Alternar a seleção de um indicador
  const toggleIndicador = (indicadorName: string) => {
    setSelectedIndicadores((prev) =>
      prev.includes(indicadorName) ? prev.filter((i) => i !== indicadorName) : [...prev, indicadorName],
    )
  }

  // Alternar a seleção de um documento
  const toggleDocumento = (documento: Document) => {
    setSelectedDocumentos((prev) => {
      const isSelected = prev.some((d) => d.id === documento.id)
      return isSelected ? prev.filter((d) => d.id !== documento.id) : [...prev, documento]
    })
  }

  // Alternar a seleção de um risco
  const toggleRisco = (riscoName: string) => {
    setSelectedRiscos((prev) => (prev.includes(riscoName) ? prev.filter((r) => r !== riscoName) : [...prev, riscoName]))
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="informacoes">
            <Info className="h-4 w-4 mr-2" />
            Informações
          </TabsTrigger>
          <TabsTrigger value="indicadores">
            <FileBarChart className="h-4 w-4 mr-2" />
            Indicadores
          </TabsTrigger>
          <TabsTrigger value="documentos">
            <FileCheck className="h-4 w-4 mr-2" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="riscos">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Riscos
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[60vh] pr-4">
          <TabsContent value="informacoes" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="codigo">Código</Label>
                  <Input
                    id="codigo"
                    defaultValue={process?.codigo || (isSubprocess && parentProcess ? `${parentProcess.codigo}-S` : "")}
                    placeholder="PRO-XXX-000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="versao">Versão</Label>
                  <Input id="versao" defaultValue={process?.versao || "1.0"} placeholder="1.0" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Processo</Label>
                <Input id="nome" defaultValue={process?.nome || ""} placeholder="Nome do processo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  defaultValue={process?.descricao || ""}
                  placeholder="Descreva o processo e seu objetivo"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select defaultValue={process?.tipo || "Operacional"}>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Estratégico">Estratégico</SelectItem>
                      <SelectItem value="Tático">Tático</SelectItem>
                      <SelectItem value="Operacional">Operacional</SelectItem>
                      <SelectItem value="Suporte">Suporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select defaultValue={process?.categoria || "Primário"}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primário">Primário</SelectItem>
                      <SelectItem value="Suporte">Suporte</SelectItem>
                      <SelectItem value="Gestão">Gestão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <Select defaultValue={process?.departamento || ""}>
                    <SelectTrigger id="departamento">
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Vendas">Vendas</SelectItem>
                      <SelectItem value="Suporte">Suporte</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                      <SelectItem value="Qualidade">Qualidade</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Select defaultValue={process?.responsavel?.nome || ""}>
                    <SelectTrigger id="responsavel">
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carlos Silva">Carlos Silva</SelectItem>
                      <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                      <SelectItem value="Pedro Alves">Pedro Alves</SelectItem>
                      <SelectItem value="Mariana Santos">Mariana Santos</SelectItem>
                      <SelectItem value="Juliana Mendes">Juliana Mendes</SelectItem>
                      <SelectItem value="Roberto Oliveira">Roberto Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dataRevisao">Data da Revisão</Label>
                  <Input
                    id="dataRevisao"
                    type="date"
                    defaultValue={
                      process?.dataRevisao
                        ? process.dataRevisao.split("/").reverse().join("-")
                        : new Date().toISOString().split("T")[0]
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="proximaRevisao">Próxima Revisão</Label>
                  <Input
                    id="proximaRevisao"
                    type="date"
                    defaultValue={
                      process?.proximaRevisao
                        ? process.proximaRevisao.split("/").reverse().join("-")
                        : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <RadioGroup defaultValue={process?.status || "Ativo"}>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ativo" id="status-ativo" />
                      <Label htmlFor="status-ativo" className="cursor-pointer">
                        Ativo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Em revisão" id="status-revisao" />
                      <Label htmlFor="status-revisao" className="cursor-pointer">
                        Em revisão
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Inativo" id="status-inativo" />
                      <Label htmlFor="status-inativo" className="cursor-pointer">
                        Inativo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Obsoleto" id="status-obsoleto" />
                      <Label htmlFor="status-obsoleto" className="cursor-pointer">
                        Obsoleto
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="indicadores" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Indicadores Relacionados</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar indicadores..."
                    className="pl-9 mb-2"
                    value={indicadorSearchTerm}
                    onChange={(e) => setIndicadorSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedIndicadores.map((indicador) => (
                    <Badge key={indicador} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                      <span>{indicador}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 ml-1"
                        onClick={() => toggleIndicador(indicador)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {selectedIndicadores.length === 0 && (
                    <p className="text-sm text-muted-foreground">Nenhum indicador selecionado</p>
                  )}
                </div>

                <div className="border rounded-md">
                  <ScrollArea className="h-[300px]">
                    <div className="p-2">
                      {filteredIndicadores.length === 0 ? (
                        <p className="text-center py-4 text-sm text-muted-foreground">Nenhum indicador encontrado</p>
                      ) : (
                        filteredIndicadores.map((indicador) => (
                          <div
                            key={indicador.id}
                            className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                            onClick={() => toggleIndicador(indicador.name)}
                          >
                            <Checkbox
                              id={`indicador-${indicador.id}`}
                              checked={selectedIndicadores.includes(indicador.name)}
                              onCheckedChange={() => toggleIndicador(indicador.name)}
                            />
                            <div>
                              <Label htmlFor={`indicador-${indicador.id}`} className="cursor-pointer font-medium">
                                {indicador.name}
                              </Label>
                              {indicador.description && (
                                <p className="text-xs text-muted-foreground">{indicador.description}</p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documentos" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Documentos Relacionados</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar documentos por código ou nome..."
                    className="pl-9 mb-2"
                    value={documentoSearchTerm}
                    onChange={(e) => setDocumentoSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDocumentos.map((documento) => (
                    <Badge key={documento.id} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                      <FileText className="h-3 w-3 mr-1" />
                      <span>{documento.code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 ml-1"
                        onClick={() => toggleDocumento(documento)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {selectedDocumentos.length === 0 && (
                    <p className="text-sm text-muted-foreground">Nenhum documento selecionado</p>
                  )}
                </div>

                <div className="border rounded-md">
                  <ScrollArea className="h-[300px]">
                    <div className="p-2">
                      {filteredDocumentos.length === 0 ? (
                        <p className="text-center py-4 text-sm text-muted-foreground">Nenhum documento encontrado</p>
                      ) : (
                        filteredDocumentos.map((documento) => (
                          <div
                            key={documento.id}
                            className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                            onClick={() => toggleDocumento(documento)}
                          >
                            <Checkbox
                              id={`documento-${documento.id}`}
                              checked={selectedDocumentos.some((d) => d.id === documento.id)}
                              onCheckedChange={() => toggleDocumento(documento)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <Label htmlFor={`documento-${documento.id}`} className="cursor-pointer font-medium">
                                  {documento.code}
                                </Label>
                                <a
                                  href={documento.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center text-xs"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Visualizar
                                </a>
                              </div>
                              <p className="text-xs">{documento.name}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {documento.type}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="riscos" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Riscos Associados</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar riscos..."
                    className="pl-9 mb-2"
                    value={riscoSearchTerm}
                    onChange={(e) => setRiscoSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRiscos.map((risco) => (
                    <Badge key={risco} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 bg-red-50">
                      <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
                      <span>{risco}</span>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 ml-1" onClick={() => toggleRisco(risco)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {selectedRiscos.length === 0 && (
                    <p className="text-sm text-muted-foreground">Nenhum risco selecionado</p>
                  )}
                </div>

                <div className="border rounded-md">
                  <ScrollArea className="h-[300px]">
                    <div className="p-2">
                      {filteredRiscos.length === 0 ? (
                        <p className="text-center py-4 text-sm text-muted-foreground">Nenhum risco encontrado</p>
                      ) : (
                        filteredRiscos.map((risco) => (
                          <div
                            key={risco.id}
                            className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                            onClick={() => toggleRisco(risco.name)}
                          >
                            <Checkbox
                              id={`risco-${risco.id}`}
                              checked={selectedRiscos.includes(risco.name)}
                              onCheckedChange={() => toggleRisco(risco.name)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={`risco-${risco.id}`} className="cursor-pointer font-medium">
                                {risco.name}
                              </Label>
                              <div className="flex gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${risco.impact === "Alto" || risco.impact === "Crítico" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                                >
                                  Impacto: {risco.impact}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${risco.probability === "Alta" || risco.probability === "Muito Alta" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                                >
                                  Probabilidade: {risco.probability}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button
          type="submit"
          onClick={() =>
            onSubmit({
              indicadores: selectedIndicadores,
              documentos: selectedDocumentos,
              riscos: selectedRiscos,
            })
          }
        >
          {isEditing ? "Salvar Alterações" : "Criar Processo"}
        </Button>
      </DialogFooter>
    </>
  )
}

// Componente para visualizar detalhes do processo
const ProcessDetails = ({ process }: { process: Process }) => {
  const [activeTab, setActiveTab] = useState("geral")

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <GitMerge className="h-5 w-5" />
          {process.nome}
        </DialogTitle>
        <DialogDescription>
          <Badge className="mr-2">{process.codigo}</Badge>
          <Badge variant="outline">Versão {process.versao}</Badge>
        </DialogDescription>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="geral">
            <Info className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="indicadores">
            <FileBarChart className="h-4 w-4 mr-2" />
            Indicadores
          </TabsTrigger>
          <TabsTrigger value="documentos">
            <FileCheck className="h-4 w-4 mr-2" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="riscos">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Riscos
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[60vh] pr-4">
          <TabsContent value="geral" className="mt-0">
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Descrição</h4>
                <p className="text-sm text-muted-foreground">{process.descricao}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Tipo</h4>
                  <Badge variant="outline">{process.tipo}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Categoria</h4>
                  <Badge variant="outline">{process.categoria}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Departamento</h4>
                  <p className="text-sm">{process.departamento}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Responsável</h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={process.responsavel.avatar} alt={process.responsavel.nome} />
                      <AvatarFallback>{process.responsavel.iniciais}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{process.responsavel.nome}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Data de Criação</h4>
                  <p className="text-sm">{process.dataCriacao}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Última Revisão</h4>
                  <p className="text-sm">{process.dataRevisao}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Próxima Revisão</h4>
                  <p className="text-sm">{process.proximaRevisao}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                {process.status === "Ativo" && <Badge className="bg-green-500">Ativo</Badge>}
                {process.status === "Em revisão" && <Badge className="bg-amber-500">Em revisão</Badge>}
                {process.status === "Inativo" && <Badge className="bg-red-500">Inativo</Badge>}
                {process.status === "Obsoleto" && <Badge className="bg-gray-500">Obsoleto</Badge>}
              </div>

              {process.subprocessos.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Subprocessos</h4>
                  <div className="space-y-2">
                    {process.subprocessos.map((subprocesso) => (
                      <Card key={subprocesso.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{subprocesso.nome}</div>
                              <div className="text-xs text-muted-foreground">{subprocesso.codigo}</div>
                            </div>
                            <Badge variant="outline">{subprocesso.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="indicadores" className="mt-0">
            <div className="grid gap-4 py-4">
              <h4 className="text-sm font-medium mb-2">Indicadores Relacionados</h4>
              {process.indicadores.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum indicador relacionado</p>
              ) : (
                <div className="space-y-2">
                  {process.indicadores.map((indicador) => {
                    const indicadorInfo = indicadoresMock.find((i) => i.name === indicador)
                    return (
                      <Card key={indicador}>
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <FileBarChart className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium">{indicador}</div>
                              {indicadorInfo?.description && (
                                <div className="text-xs text-muted-foreground">{indicadorInfo.description}</div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documentos" className="mt-0">
            <div className="grid gap-4 py-4">
              <h4 className="text-sm font-medium mb-2">Documentos Relacionados</h4>
              {process.documentos.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum documento relacionado</p>
              ) : (
                <div className="space-y-2">
                  {process.documentos.map((documento) => (
                    <Card key={documento.id}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium">{documento.code}</div>
                              <div className="text-xs">{documento.name}</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {documento.type}
                              </Badge>
                            </div>
                          </div>
                          <a
                            href={documento.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center text-xs"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visualizar
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="riscos" className="mt-0">
            <div className="grid gap-4 py-4">
              <h4 className="text-sm font-medium mb-2">Riscos Associados</h4>
              {process.riscos.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum risco associado</p>
              ) : (
                <div className="space-y-2">
                  {process.riscos.map((risco) => {
                    const riscoInfo = riscosMock.find((r) => r.name === risco)
                    return (
                      <Card key={risco}>
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <div className="flex-1">
                              <div className="font-medium">{risco}</div>
                              {riscoInfo && (
                                <div className="flex gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${riscoInfo.impact === "Alto" || riscoInfo.impact === "Crítico" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                                  >
                                    Impacto: {riscoInfo.impact}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${riscoInfo.probability === "Alta" || riscoInfo.probability === "Muito Alta" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                                  >
                                    Probabilidade: {riscoInfo.probability}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <DialogFooter>
        <DialogClose asChild>
          <Button>Fechar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

// Componente para confirmar exclusão
const DeleteConfirmation = ({ process, onConfirm }: { process: Process; onConfirm: () => void }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Excluir Processo</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir o processo "{process.nome}"? Esta ação não pode ser desfeita.
          {process.subprocessos.length > 0 && (
            <div className="mt-2 text-red-500">
              Atenção: Este processo possui {process.subprocessos.length} subprocesso(s) que também serão excluídos.
            </div>
          )}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2 sm:gap-0">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button variant="destructive" onClick={onConfirm}>
          Excluir Processo
        </Button>
      </DialogFooter>
    </>
  )
}

export default function GestaoProcessosPage() {
  const router = useRouter()
  const [processos, setProcessos] = useState<Process[]>(processosMock)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [sortColumn, setSortColumn] = useState<string>("nome")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [activeTab, setActiveTab] = useState("todos")
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null)
  const [dialogType, setDialogType] = useState<"create" | "edit" | "view" | "delete" | "createSub">("view")
  const [expandedProcesses, setExpandedProcesses] = useState<Record<string, boolean>>({})

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleProcessExpand = (processId: string) => {
    setExpandedProcesses((prev) => ({
      ...prev,
      [processId]: !prev[processId],
    }))
  }

  // Filtrar processos
  const processosFiltrados = processos.filter(
    (processo) =>
      (filtroTipo === "todos" || processo.tipo === filtroTipo) &&
      (filtroStatus === "todos" || processo.status === filtroStatus) &&
      (activeTab === "todos" ||
        (activeTab === "estrategicos" && processo.tipo === "Estratégico") ||
        (activeTab === "operacionais" && processo.tipo === "Operacional")) &&
      (processo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.descricao.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Ordenar processos
  const processosOrdenados = [...processosFiltrados].sort((a, b) => {
    if (sortColumn === "nome") {
      return sortDirection === "asc" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome)
    } else if (sortColumn === "codigo") {
      return sortDirection === "asc" ? a.codigo.localeCompare(b.codigo) : b.codigo.localeCompare(a.codigo)
    } else if (sortColumn === "tipo") {
      return sortDirection === "asc" ? a.tipo.localeCompare(b.tipo) : b.tipo.localeCompare(a.tipo)
    } else if (sortColumn === "status") {
      return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    } else if (sortColumn === "departamento") {
      return sortDirection === "asc"
        ? a.departamento.localeCompare(b.departamento)
        : b.departamento.localeCompare(a.departamento)
    } else if (sortColumn === "dataRevisao") {
      // Converter datas para comparação
      const dateA = new Date(a.dataRevisao.split("/").reverse().join("-"))
      const dateB = new Date(b.dataRevisao.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }
    return 0
  })

  // Estatísticas
  const stats = {
    totalProcessos: processos.length,
    processosAtivos: processos.filter((p) => p.status === "Ativo").length,
    processosRevisao: processos.filter((p) => p.status === "Em revisão").length,
    subprocessos: processos.reduce((acc, curr) => acc + curr.subprocessos.length, 0),
  }

  const handleCreateProcess = (data: any) => {
    // Lógica para criar um novo processo
    console.log("Criando novo processo:", data)
    // Aqui você adicionaria o novo processo ao estado
  }

  const handleEditProcess = (data: any) => {
    // Lógica para editar um processo existente
    console.log("Editando processo:", selectedProcess?.id, data)
    // Aqui você atualizaria o processo no estado
  }

  const handleCreateSubprocess = (data: any) => {
    // Lógica para criar um subprocesso
    console.log("Criando subprocesso para:", selectedProcess?.id, data)
    // Aqui você adicionaria o subprocesso ao processo pai no estado
  }

  const handleDeleteProcess = () => {
    // Lógica para excluir um processo
    console.log("Excluindo processo:", selectedProcess?.id)
    // Aqui você removeria o processo do estado
    if (selectedProcess) {
      setProcessos((prev) => prev.filter((p) => p.id !== selectedProcess.id))
    }
  }

  const openDialog = (type: "create" | "edit" | "view" | "delete" | "createSub", process?: Process) => {
    setSelectedProcess(process || null)
    setDialogType(type)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Processos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog("create")} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Processo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
            {dialogType === "edit" && selectedProcess && (
              <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
            )}
            {dialogType === "view" && selectedProcess && <ProcessDetails process={selectedProcess} />}
            {dialogType === "delete" && selectedProcess && (
              <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
            )}
            {dialogType === "createSub" && selectedProcess && (
              <ProcessForm isSubprocess={true} parentProcess={selectedProcess} onSubmit={handleCreateSubprocess} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Processos"
          value={stats.totalProcessos.toString()}
          icon={<GitMerge className="h-5 w-5 text-primary" />}
          description="Processos mapeados"
        />
        <StatsCard
          title="Processos Ativos"
          value={stats.processosAtivos.toString()}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          description="Em execução"
          color="bg-green-100"
        />
        <StatsCard
          title="Em Revisão"
          value={stats.processosRevisao.toString()}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          description="Processos sendo atualizados"
          color="bg-amber-100"
        />
        <StatsCard
          title="Subprocessos"
          value={stats.subprocessos.toString()}
          icon={<Layers className="h-5 w-5 text-blue-500" />}
          description="Processos derivados"
          color="bg-blue-100"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <GitMerge className="h-5 w-5 text-primary" />
            Mapa de Processos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="todos">Todos os Processos</TabsTrigger>
              <TabsTrigger value="estrategicos">Estratégicos</TabsTrigger>
              <TabsTrigger value="operacionais">Operacionais</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar processos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="Estratégico">Estratégico</SelectItem>
                  <SelectItem value="Tático">Tático</SelectItem>
                  <SelectItem value="Operacional">Operacional</SelectItem>
                  <SelectItem value="Suporte">Suporte</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Em revisão">Em revisão</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Obsoleto">Obsoleto</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Mais Filtros
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("nome")}>
                    <div className="flex items-center gap-1">
                      Nome
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("codigo")}>
                    <div className="flex items-center gap-1">
                      Código
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("tipo")}>
                    <div className="flex items-center gap-1">
                      Tipo
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("departamento")}>
                    <div className="flex items-center gap-1">
                      Departamento
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("dataRevisao")}>
                    <div className="flex items-center gap-1">
                      Revisão
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processosOrdenados.map((processo) => (
                  <React.Fragment key={processo.id}>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {processo.subprocessos.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleProcessExpand(processo.id)}
                            >
                              {expandedProcesses[processo.id] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                          <div>
                            <div className="font-medium">{processo.nome}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">{processo.descricao}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{processo.codigo}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-primary/5">
                          {processo.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {processo.status === "Ativo" && <Badge className="bg-green-500">Ativo</Badge>}
                        {processo.status === "Em revisão" && <Badge className="bg-amber-500">Em revisão</Badge>}
                        {processo.status === "Inativo" && <Badge className="bg-red-500">Inativo</Badge>}
                        {processo.status === "Obsoleto" && <Badge className="bg-gray-500">Obsoleto</Badge>}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{processo.departamento}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{processo.dataRevisao}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openDialog("view", processo)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                              {dialogType === "edit" && selectedProcess && (
                                <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                              )}
                              {dialogType === "view" && selectedProcess && <ProcessDetails process={selectedProcess} />}
                              {dialogType === "delete" && selectedProcess && (
                                <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                              )}
                              {dialogType === "createSub" && selectedProcess && (
                                <ProcessForm
                                  isSubprocess={true}
                                  parentProcess={selectedProcess}
                                  onSubmit={handleCreateSubprocess}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      openDialog("edit", processo)
                                    }}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                                  {dialogType === "edit" && selectedProcess && (
                                    <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                                  )}
                                  {dialogType === "view" && selectedProcess && (
                                    <ProcessDetails process={selectedProcess} />
                                  )}
                                  {dialogType === "delete" && selectedProcess && (
                                    <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                                  )}
                                  {dialogType === "createSub" && selectedProcess && (
                                    <ProcessForm
                                      isSubprocess={true}
                                      parentProcess={selectedProcess}
                                      onSubmit={handleCreateSubprocess}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      openDialog("createSub", processo)
                                    }}
                                  >
                                    <Layers className="h-4 w-4 mr-2" />
                                    Adicionar Subprocesso
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                                  {dialogType === "edit" && selectedProcess && (
                                    <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                                  )}
                                  {dialogType === "view" && selectedProcess && (
                                    <ProcessDetails process={selectedProcess} />
                                  )}
                                  {dialogType === "delete" && selectedProcess && (
                                    <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                                  )}
                                  {dialogType === "createSub" && selectedProcess && (
                                    <ProcessForm
                                      isSubprocess={true}
                                      parentProcess={selectedProcess}
                                      onSubmit={handleCreateSubprocess}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuSeparator />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      openDialog("delete", processo)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                                  {dialogType === "edit" && selectedProcess && (
                                    <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                                  )}
                                  {dialogType === "view" && selectedProcess && (
                                    <ProcessDetails process={selectedProcess} />
                                  )}
                                  {dialogType === "delete" && selectedProcess && (
                                    <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                                  )}
                                  {dialogType === "createSub" && selectedProcess && (
                                    <ProcessForm
                                      isSubprocess={true}
                                      parentProcess={selectedProcess}
                                      onSubmit={handleCreateSubprocess}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedProcesses[processo.id] &&
                      processo.subprocessos.map((subprocesso) => (
                        <TableRow key={subprocesso.id} className="bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-2 pl-8">
                              <div>
                                <div className="font-medium">{subprocesso.nome}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-xs">
                                  {subprocesso.descricao}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{subprocesso.codigo}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline" className="bg-primary/5">
                              {subprocesso.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {subprocesso.status === "Ativo" && <Badge className="bg-green-500">Ativo</Badge>}
                            {subprocesso.status === "Em revisão" && <Badge className="bg-amber-500">Em revisão</Badge>}
                            {subprocesso.status === "Inativo" && <Badge className="bg-red-500">Inativo</Badge>}
                            {subprocesso.status === "Obsoleto" && <Badge className="bg-gray-500">Obsoleto</Badge>}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{subprocesso.departamento}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{subprocesso.dataRevisao}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => openDialog("view", subprocesso)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                                  {dialogType === "edit" && selectedProcess && (
                                    <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                                  )}
                                  {dialogType === "view" && selectedProcess && (
                                    <ProcessDetails process={selectedProcess} />
                                  )}
                                  {dialogType === "delete" && selectedProcess && (
                                    <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                                  )}
                                  {dialogType === "createSub" && selectedProcess && (
                                    <ProcessForm
                                      isSubprocess={true}
                                      parentProcess={selectedProcess}
                                      onSubmit={handleCreateSubprocess}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => {
                                          e.preventDefault()
                                          openDialog("edit", subprocesso)
                                        }}
                                      >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Editar
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                      {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                                      {dialogType === "edit" && selectedProcess && (
                                        <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                                      )}
                                      {dialogType === "view" && selectedProcess && (
                                        <ProcessDetails process={selectedProcess} />
                                      )}
                                      {dialogType === "delete" && selectedProcess && (
                                        <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                                      )}
                                      {dialogType === "createSub" && selectedProcess && (
                                        <ProcessForm
                                          isSubprocess={true}
                                          parentProcess={selectedProcess}
                                          onSubmit={handleCreateSubprocess}
                                        />
                                      )}
                                    </DialogContent>
                                  </Dialog>
                                  <DropdownMenuSeparator />
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onSelect={(e) => {
                                          e.preventDefault()
                                          openDialog("delete", subprocesso)
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Excluir
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                      {dialogType === "create" && <ProcessForm onSubmit={handleCreateProcess} />}
                                      {dialogType === "edit" && selectedProcess && (
                                        <ProcessForm process={selectedProcess} onSubmit={handleEditProcess} />
                                      )}
                                      {dialogType === "view" && selectedProcess && (
                                        <ProcessDetails process={selectedProcess} />
                                      )}
                                      {dialogType === "delete" && selectedProcess && (
                                        <DeleteConfirmation process={selectedProcess} onConfirm={handleDeleteProcess} />
                                      )}
                                      {dialogType === "createSub" && selectedProcess && (
                                        <ProcessForm
                                          isSubprocess={true}
                                          parentProcess={selectedProcess}
                                          onSubmit={handleCreateSubprocess}
                                        />
                                      )}
                                    </DialogContent>
                                  </Dialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
