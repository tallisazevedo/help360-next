import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Automação | Configurações de Atendimento | Help360",
  description: "Configure automações e fluxos de atendimento",
}

export default function AutomacaoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Automação de Atendimento</h3>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Automação
        </Button>
      </div>

      <Tabs defaultValue="chatbots">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
          <TabsTrigger value="respostas">Respostas Automáticas</TabsTrigger>
          <TabsTrigger value="fluxos">Fluxos de Trabalho</TabsTrigger>
        </TabsList>

        <TabsContent value="chatbots" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot de Boas-vindas</CardTitle>
              <CardDescription>Chatbot para triagem inicial de atendimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">
                  Este chatbot é ativado quando um novo cliente inicia uma conversa. Ele coleta informações iniciais e
                  direciona para a fila adequada.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Editar Fluxo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chatbot de Suporte Técnico</CardTitle>
              <CardDescription>Chatbot para resolução de problemas comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">
                  Este chatbot ajuda a resolver problemas técnicos comuns antes de encaminhar para um atendente humano.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Editar Fluxo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="respostas" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Respostas Rápidas</CardTitle>
              <CardDescription>Respostas automáticas baseadas em palavras-chave</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Horário de Funcionamento</p>
                      <p className="text-sm text-muted-foreground">
                        Palavras-chave: horário, funcionamento, expediente
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Prazo de Entrega</p>
                      <p className="text-sm text-muted-foreground">Palavras-chave: prazo, entrega, quando chega</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Formas de Pagamento</p>
                      <p className="text-sm text-muted-foreground">Palavras-chave: pagamento, pagar, boleto, cartão</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fluxos" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Fluxos de Trabalho</CardTitle>
              <CardDescription>Automações baseadas em eventos e condições</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transferência Automática</p>
                      <p className="text-sm text-muted-foreground">
                        Transfere conversas inativas por mais de 10 minutos para outro atendente
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificação de Supervisor</p>
                      <p className="text-sm text-muted-foreground">
                        Notifica supervisor quando cliente menciona palavras como "reclamação" ou "insatisfeito"
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pesquisa de Satisfação</p>
                      <p className="text-sm text-muted-foreground">
                        Envia pesquisa de satisfação 5 minutos após o encerramento do atendimento
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
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
