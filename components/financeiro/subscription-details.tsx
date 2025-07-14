"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog"
import { CreditCard, Calendar, CheckCircle, PlusCircle, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

export function SubscriptionDetails() {
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Dados de exemplo da assinatura
  const subscription = {
    plan: "Business",
    status: "Ativo",
    price: "R$ 299,90",
    billingCycle: "Mensal",
    nextBilling: "15/04/2025",
    startDate: "15/01/2023",
    users: 10,
    usersLimit: 15,
  }

  // Dados de exemplo dos cartões
  const paymentMethods = [
    {
      id: 1,
      type: "credit_card",
      last4: "4242",
      brand: "visa",
      holderName: "MARIA SILVA",
      expiryDate: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "credit_card",
      last4: "5555",
      brand: "mastercard",
      holderName: "MARIA SILVA",
      expiryDate: "10/25",
      isDefault: false,
    },
  ]

  // Mapeamento de bandeiras para imagens
  const cardBrandImages = {
    visa: "/card-brands/visa.svg",
    mastercard: "/card-brands/mastercard.svg",
    amex: "/card-brands/amex.svg",
    elo: "/card-brands/elo.svg",
    hipercard: "/card-brands/hipercard.svg",
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Assinatura</CardTitle>
          <CardDescription>Informações sobre seu plano atual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Plano</p>
              <p className="text-2xl font-bold">{subscription.plan}</p>
            </div>
            <Badge className="bg-green-500 hover:bg-green-600">{subscription.status}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Valor</p>
              <p className="text-lg">{subscription.price}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Ciclo de cobrança</p>
              <p className="text-lg">{subscription.billingCycle}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Próxima cobrança</p>
              <p className="text-lg">{subscription.nextBilling}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Data de início</p>
              <p className="text-lg">{subscription.startDate}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Usuários</p>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(subscription.users / subscription.usersLimit) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {subscription.users}/{subscription.usersLimit}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Alterar plano</Button>
          <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
            Cancelar assinatura
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Formas de Pagamento</CardTitle>
            <CardDescription>Gerencie seus cartões de crédito</CardDescription>
          </div>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar cartão
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((card) => (
              <div key={card.id} className="flex items-start p-4 border rounded-lg relative">
                <div className="h-10 w-14 mr-4 relative">
                  {card.brand in cardBrandImages ? (
                    <Image
                      src={cardBrandImages[card.brand] || "/placeholder.svg"}
                      alt={card.brand}
                      width={56}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <CreditCard className="h-10 w-14" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium">•••• •••• •••• {card.last4}</p>
                    {card.isDefault && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                        Principal
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{card.holderName}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Expira em {card.expiryDate}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!card.isDefault && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CancelSubscriptionDialog open={showCancelDialog} onOpenChange={setShowCancelDialog} />
    </div>
  )
}
