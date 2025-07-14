"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSubscription } from "@/hooks/use-subscription"

export function TrialBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { isTrialActive, trialDaysRemaining, totalTrialDays } = useSubscription()

  const progress = ((totalTrialDays - trialDaysRemaining) / totalTrialDays) * 100

  if (dismissed || !isTrialActive) {
    return null
  }

  return (
    <Alert className="mb-6 border-primary/50 bg-primary/10">
      <AlertCircle className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <AlertTitle className="text-primary">Período de avaliação gratuito</AlertTitle>
          <Button variant="ghost" size="icon" onClick={() => setDismissed(true)} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <AlertDescription className="mt-1">
          <div className="space-y-2">
            <p>
              Você tem <span className="font-bold">{trialDaysRemaining} dias</span> restantes no seu período de
              avaliação gratuito.
            </p>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center gap-2 pt-1">
              <Button asChild size="sm" variant="default">
                <Link href="/financeiro/planos">Ver planos</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/financeiro/assinatura">Assinar agora</Link>
              </Button>
            </div>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  )
}
