"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, Pie } from "@/components/ui/charts"

export function ConversationQualityMetrics() {
  const [period, setPeriod] = useState("30d")

  // Dados de exemplo para os gráficos
  const satisfactionData = {
    labels: ["Excelente", "Bom", "Regular", "Ruim", "Péssimo"],
    datasets: [
      {
        label: "Avaliações",
        data: [45, 30, 15, 7, 3],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(250, 204, 21, 0.6)",
          "rgba(249, 115, 22, 0.6)",
          "rgba(239, 68, 68, 0.6)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(250, 204, 21)",
          "rgb(249, 115, 22)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const timelineData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Tempo de resposta (min)",
        data: [4.3, 3.8, 3.5, 4.1, 3.2, 2.8],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Duração média (min)",
        data: [12.5, 11.8, 13.2, 10.5, 9.8, 8.9],
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.5)",
      },
    ],
  }

  const channelsData = {
    labels: ["WhatsApp", "Teams", "Facebook", "Instagram", "Email", "Chat"],
    datasets: [
      {
        label: "Satisfação por Canal",
        data: [4.8, 4.3, 3.9, 4.5, 4.1, 4.7],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(79, 70, 229, 0.6)",
          "rgba(219, 39, 119, 0.6)",
          "rgba(249, 115, 22, 0.6)",
          "rgba(100, 116, 139, 0.6)",
        ],
      },
    ],
  }

  const sentimentData = {
    labels: ["Positivo", "Neutro", "Negativo"],
    datasets: [
      {
        label: "Sentimento detectado",
        data: [65, 25, 10],
        backgroundColor: ["rgba(34, 197, 94, 0.6)", "rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.6)"],
        borderColor: ["rgb(34, 197, 94)", "rgb(59, 130, 246)", "rgb(239, 68, 68)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Métricas de Qualidade</h3>
          <Badge variant="outline">Beta</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="period-select" className="text-sm">
            Período:
          </Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger id="period-select" className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="180d">Últimos 180 dias</SelectItem>
              <SelectItem value="365d">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Média de Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3/5.0</div>
            <p className="text-xs text-muted-foreground">+0.2 em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 48s</div>
            <p className="text-xs text-muted-foreground">-15s em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">+3.5% em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sentimento Positivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="satisfaction">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          <TabsTrigger value="time">Tempo</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
        </TabsList>

        <TabsContent value="satisfaction" className="space-y-4 pt-4">
          <div className="rounded-md border">
            <div className="p-6">
              <h4 className="mb-4 text-lg font-semibold">Distribuição de Avaliações</h4>
              <div className="h-80">
                <BarChart data={satisfactionData} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Melhores Avaliações por Operador</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Ana Silva</span>
                    <div className="flex">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-medium">4.9</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Carlos Oliveira</span>
                    <div className="flex">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-medium">4.8</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Mariana Souza</span>
                    <div className="flex">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-medium">4.7</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Melhores Avaliações por Assunto</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Suporte técnico</span>
                    <div className="flex">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-medium">4.7</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Dúvidas de uso</span>
                    <div className="flex">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-medium">4.6</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Vendas</span>
                    <div className="flex">
                      <span className="text-yellow-500">★★★★</span>
                      <span className="ml-2 font-medium">4.3</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border p-4">
            <h4 className="mb-2 font-medium">Limiares de Alerta</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Configure os valores mínimos aceitáveis para avaliação de qualidade
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Avaliação mínima aceitável</Label>
                  <span className="font-medium">3.5</span>
                </div>
                <Slider defaultValue={[3.5]} min={1} max={5} step={0.1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Meta de avaliação</Label>
                  <span className="font-medium">4.5</span>
                </div>
                <Slider defaultValue={[4.5]} min={1} max={5} step={0.1} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="alert-low-ratings" defaultChecked />
                <Label htmlFor="alert-low-ratings">Alertar sobre avaliações abaixo do mínimo</Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4 pt-4">
          <div className="rounded-md border">
            <div className="p-6">
              <h4 className="mb-4 text-lg font-semibold">Métricas de Tempo</h4>
              <div className="h-80">
                <LineChart data={timelineData} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tempo de Primeira Resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1m 32s</div>
                <p className="text-xs text-muted-foreground">-25s em relação ao período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tempo Médio de Resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 48s</div>
                <p className="text-xs text-muted-foreground">-15s em relação ao período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Duração Média de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8m.9s</div>
                <p className="text-xs text-muted-foreground">-2m 12s em relação ao período anterior</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border p-4">
            <h4 className="mb-2 font-medium">Métricas de SLA</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Configure os acordos de nível de serviço para tempos de resposta
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>SLA para primeira resposta</Label>
                  <span className="font-medium">2 minutos</span>
                </div>
                <Slider defaultValue={[2]} min={0.5} max={10} step={0.5} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>SLA para resolução</Label>
                  <span className="font-medium">15 minutos</span>
                </div>
                <Slider defaultValue={[15]} min={5} max={60} step={5} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="alert-sla" defaultChecked />
                <Label htmlFor="alert-sla">Alertar quando SLA estiver próximo de ser excedido</Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border">
              <div className="p-6">
                <h4 className="mb-4 text-lg font-semibold">Satisfação por Canal</h4>
                <div className="h-80">
                  <BarChart data={channelsData} />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="p-6">
                <h4 className="mb-4 text-lg font-semibold">Volume por Canal</h4>
                <div className="h-80">
                  <Pie
                    data={{
                      labels: ["WhatsApp", "Teams", "Facebook", "Instagram", "Email", "Chat"],
                      datasets: [
                        {
                          label: "Conversas",
                          data: [45, 25, 10, 8, 7, 5],
                          backgroundColor: [
                            "rgba(34, 197, 94, 0.6)",
                            "rgba(59, 130, 246, 0.6)",
                            "rgba(79, 70, 229, 0.6)",
                            "rgba(219, 39, 119, 0.6)",
                            "rgba(249, 115, 22, 0.6)",
                            "rgba(100, 116, 139, 0.6)",
                          ],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comparativo de Métricas por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Canal</th>
                      <th className="pb-2 text-center font-medium">Volume</th>
                      <th className="pb-2 text-center font-medium">Satisfação</th>
                      <th className="pb-2 text-center font-medium">Tempo Médio</th>
                      <th className="pb-2 text-center font-medium">Taxa Resolução</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">WhatsApp</td>
                      <td className="py-2 text-center">45%</td>
                      <td className="py-2 text-center">4.8</td>
                      <td className="py-2 text-center">2m 12s</td>
                      <td className="py-2 text-center">94%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Teams</td>
                      <td className="py-2 text-center">25%</td>
                      <td className="py-2 text-center">4.3</td>
                      <td className="py-2 text-center">3m 05s</td>
                      <td className="py-2 text-center">91%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Facebook</td>
                      <td className="py-2 text-center">10%</td>
                      <td className="py-2 text-center">3.9</td>
                      <td className="py-2 text-center">4m 35s</td>
                      <td className="py-2 text-center">88%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Instagram</td>
                      <td className="py-2 text-center">8%</td>
                      <td className="py-2 text-center">4.5</td>
                      <td className="py-2 text-center">3m 22s</td>
                      <td className="py-2 text-center">90%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Email</td>
                      <td className="py-2 text-center">7%</td>
                      <td className="py-2 text-center">4.1</td>
                      <td className="py-2 text-center">5h 15m</td>
                      <td className="py-2 text-center">95%</td>
                    </tr>
                    <tr>
                      <td className="py-2">Chat Web</td>
                      <td className="py-2 text-center">5%</td>
                      <td className="py-2 text-center">4.7</td>
                      <td className="py-2 text-center">1m 48s</td>
                      <td className="py-2 text-center">93%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border">
              <div className="p-6">
                <h4 className="mb-4 text-lg font-semibold">Análise de Sentimento</h4>
                <div className="h-80">
                  <Pie data={sentimentData} />
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Detalhamento de Sentimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-medium text-green-600">Positivo (65%)</span>
                      <span>812 conversas</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 w-[65%] rounded-full bg-green-500"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Principais tópicos: elogios, gratidão, problemas solucionados
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-medium text-blue-600">Neutro (25%)</span>
                      <span>312 conversas</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 w-[25%] rounded-full bg-blue-500"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Principais tópicos: informações, dúvidas simples, processos
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-medium text-red-600">Negativo (10%)</span>
                      <span>124 conversas</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 w-[10%] rounded-full bg-red-500"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Principais tópicos: reclamações, falhas técnicas, demora no atendimento
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Palavras-chave por Sentimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="mb-2 font-medium text-green-600">Positivo</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-800">excelente</Badge>
                    <Badge className="bg-green-100 text-green-800">obrigado</Badge>
                    <Badge className="bg-green-100 text-green-800">resolvido</Badge>
                    <Badge className="bg-green-100 text-green-800">ótimo</Badge>
                    <Badge className="bg-green-100 text-green-800">rápido</Badge>
                    <Badge className="bg-green-100 text-green-800">eficiente</Badge>
                    <Badge className="bg-green-100 text-green-800">satisfeito</Badge>
                    <Badge className="bg-green-100 text-green-800">perfeito</Badge>
                    <Badge className="bg-green-100 text-green-800">recomendo</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-blue-600">Neutro</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800">como</Badge>
                    <Badge className="bg-blue-100 text-blue-800">quando</Badge>
                    <Badge className="bg-blue-100 text-blue-800">onde</Badge>
                    <Badge className="bg-blue-100 text-blue-800">qual</Badge>
                    <Badge className="bg-blue-100 text-blue-800">preço</Badge>
                    <Badge className="bg-blue-100 text-blue-800">informação</Badge>
                    <Badge className="bg-blue-100 text-blue-800">entendo</Badge>
                    <Badge className="bg-blue-100 text-blue-800">verificar</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-red-600">Negativo</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-red-100 text-red-800">problema</Badge>
                    <Badge className="bg-red-100 text-red-800">erro</Badge>
                    <Badge className="bg-red-100 text-red-800">ruim</Badge>
                    <Badge className="bg-red-100 text-red-800">falha</Badge>
                    <Badge className="bg-red-100 text-red-800">péssimo</Badge>
                    <Badge className="bg-red-100 text-red-800">demora</Badge>
                    <Badge className="bg-red-100 text-red-800">insatisfeito</Badge>
                    <Badge className="bg-red-100 text-red-800">cancelar</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md border p-4">
            <h4 className="mb-2 font-medium">Configurações de Análise de Sentimento</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Configure como as análises de sentimento são realizadas
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Análise automática de sentimento</Label>
                  <p className="text-xs text-muted-foreground">
                    Analisar automaticamente o sentimento em todas as conversas
                  </p>
                </div>
                <Switch id="auto-sentiment" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Alerta para sentimento negativo</Label>
                  <p className="text-xs text-muted-foreground">
                    Alertar supervisores sobre conversas com sentimento negativo
                  </p>
                </div>
                <Switch id="negative-sentiment-alert" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Palavras-chave personalizadas</Label>
                  <p className="text-xs text-muted-foreground">
                    Usar palavras-chave personalizadas para melhorar a detecção
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Exportar relatório</Button>
        <Button>Fechar</Button>
      </div>
    </div>
  )
}
