import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export const metadata: Metadata = {
  title: "Configurações Gerais | Atendimento | Help360",
  description: "Configurações gerais do sistema de atendimento",
}

export default function ConfiguracoesGeraisPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>Configure as opções gerais do sistema de atendimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Horário de Funcionamento</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="business-hours-start">Horário de Início</Label>
                <Input id="business-hours-start" type="time" value="08:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-hours-end">Horário de Término</Label>
                <Input id="business-hours-end" type="time" value="18:00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dias de Funcionamento</Label>
              <div className="flex flex-wrap gap-2">
                {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input type="checkbox" id={`day-${index}`} className="h-4 w-4" defaultChecked={index < 6} />
                    <Label htmlFor={`day-${index}`} className="text-sm font-normal">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mensagens Padrão</h3>

            <div className="space-y-2">
              <Label htmlFor="away-message">Mensagem de Ausência</Label>
              <Textarea
                id="away-message"
                value="Olá! No momento estamos fora do horário de atendimento. Retornaremos o contato no próximo dia útil. Obrigado pela compreensão!"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transfer-message">Mensagem de Transferência</Label>
              <Textarea
                id="transfer-message"
                value="Seu atendimento está sendo transferido para outro atendente especializado. Por favor, aguarde um momento."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closing-message">Mensagem de Encerramento</Label>
              <Textarea
                id="closing-message"
                value="Obrigado por entrar em contato com a Help360. Esperamos ter ajudado. Tenha um ótimo dia!"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configurações de Atendimento</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="max-concurrent">Máximo de Atendimentos Simultâneos</Label>
                <Input id="max-concurrent" type="number" value="5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inactivity-timeout">Tempo de Inatividade (minutos)</Label>
                <Input id="inactivity-timeout" type="number" value="30" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-queue">Fila Padrão</Label>
              <Select defaultValue="support">
                <SelectTrigger id="default-queue">
                  <SelectValue placeholder="Selecione uma fila" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="support">Suporte</SelectItem>
                  <SelectItem value="sales">Vendas</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                  <SelectItem value="cancel">Cancelamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-distribution">Distribuição Automática</Label>
                <p className="text-sm text-muted-foreground">
                  Distribuir automaticamente novas conversas para atendentes disponíveis
                </p>
              </div>
              <Switch id="auto-distribution" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="satisfaction-survey">Pesquisa de Satisfação</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar pesquisa de satisfação após o encerramento do atendimento
                </p>
              </div>
              <Switch id="satisfaction-survey" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="chat-history">Histórico de Conversas</Label>
                <p className="text-sm text-muted-foreground">Mostrar histórico de conversas anteriores do cliente</p>
              </div>
              <Switch id="chat-history" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
