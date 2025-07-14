"use client"

import { useState } from "react"
import {
  Clock,
  MessageCircle,
  Users,
  ArrowUp,
  ArrowDown,
  Percent,
  BarChart3,
  PieChart,
  LineChart,
  Download,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function StatsDashboard() {
  const [period, setPeriod] = useState("today")

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Estatísticas de Atendimento</h2>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Atendimentos</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12.5% em relação ao período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground">-18.2% em relação ao período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% em relação ao período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.3 em relação ao período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="agents">Atendentes</TabsTrigger>
          <TabsTrigger value="queues">Filas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Atendimentos por Hora</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  {/* Placeholder para gráfico */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-2">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Gráfico de Atendimentos por Hora</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Distribuição por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Placeholder para gráfico */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-2">
                      <PieChart className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Gráfico de Distribuição por Canal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Tempo Médio de Resolução</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Placeholder para gráfico */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-2">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Gráfico de Tempo Médio de Resolução</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Principais Motivos de Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">1</Badge>
                      <span>Problemas com entrega</span>
                    </div>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">2</Badge>
                      <span>Dúvidas sobre produtos</span>
                    </div>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">3</Badge>
                      <span>Problemas com pagamento</span>
                    </div>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">4</Badge>
                      <span>Solicitação de reembolso</span>
                    </div>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">5</Badge>
                      <span>Problemas técnicos</span>
                    </div>
                    <span className="font-medium">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">6</Badge>
                      <span>Outros</span>
                    </div>
                    <span className="font-medium">6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">WhatsApp</CardTitle>
                <Badge variant="outline">58%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">745</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>15.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Facebook</CardTitle>
                <Badge variant="outline">18%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">231</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>4.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Instagram</CardTitle>
                <Badge variant="outline">14%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">180</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>8.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">E-mail</CardTitle>
                <Badge variant="outline">10%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>12.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Canal</CardTitle>
              <CardDescription>Tempo médio de resposta e taxa de resolução por canal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">WhatsApp</span>
                    <span className="text-sm text-muted-foreground">3m 12s / 95.2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[95%] rounded-full bg-primary"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Facebook</span>
                    <span className="text-sm text-muted-foreground">4m 45s / 92.8%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[93%] rounded-full bg-primary"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Instagram</span>
                    <span className="text-sm text-muted-foreground">5m 18s / 91.5%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[92%] rounded-full bg-primary"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">E-mail</span>
                    <span className="text-sm text-muted-foreground">2h 34m / 96.1%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[96%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Atendentes</CardTitle>
              <CardDescription>Métricas de produtividade e qualidade por atendente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Carlos Silva</span>
                      <Badge>Top Performer</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">42 atendimentos</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-sm text-muted-foreground">Tempo Médio</span>
                      <p className="font-medium">2m 48s</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Resolução</span>
                      <p className="font-medium">98.2%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Satisfação</span>
                      <p className="font-medium">4.9/5</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Ana Oliveira</span>
                    </div>
                    <span className="text-sm text-muted-foreground">38 atendimentos</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-sm text-muted-foreground">Tempo Médio</span>
                      <p className="font-medium">3m 12s</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Resolução</span>
                      <p className="font-medium">96.5%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Satisfação</span>
                      <p className="font-medium">4.8/5</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pedro Santos</span>
                    </div>
                    <span className="text-sm text-muted-foreground">35 atendimentos</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-sm text-muted-foreground">Tempo Médio</span>
                      <p className="font-medium">3m 45s</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Resolução</span>
                      <p className="font-medium">94.8%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Satisfação</span>
                      <p className="font-medium">4.7/5</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Mariana Costa</span>
                    </div>
                    <span className="text-sm text-muted-foreground">31 atendimentos</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-sm text-muted-foreground">Tempo Médio</span>
                      <p className="font-medium">4m 10s</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Resolução</span>
                      <p className="font-medium">92.3%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Satisfação</span>
                      <p className="font-medium">4.6/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver todos os atendentes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="queues" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suporte</CardTitle>
                <Badge variant="outline">42%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">539</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>8.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Financeiro</CardTitle>
                <Badge variant="outline">24%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">308</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>2.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas</CardTitle>
                <Badge variant="outline">18%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">231</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>12.4%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelamento</CardTitle>
                <Badge variant="outline">16%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">206</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>5.8%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tempo de Espera por Fila</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Suporte</span>
                    <span className="text-sm text-muted-foreground">4m 12s</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[60%] rounded-full bg-yellow-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Financeiro</span>
                    <span className="text-sm text-muted-foreground">6m 45s</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[75%] rounded-full bg-orange-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Vendas</span>
                    <span className="text-sm text-muted-foreground">2m 38s</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[40%] rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Cancelamento</span>
                    <span className="text-sm text-muted-foreground">8m 22s</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[85%] rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
