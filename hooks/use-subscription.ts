"use client"

import { useState, useEffect } from "react"

export type SubscriptionStatus = "active" | "trial" | "canceled" | "expired"

export interface SubscriptionData {
  status: SubscriptionStatus
  plan: string
  startDate: Date
  endDate: Date
  trialEndsAt: Date | null
  isPro: boolean
  features: string[]
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    status: "trial",
    plan: "Trial",
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias a partir de agora
    trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias a partir de agora
    isPro: false,
    features: ["Atendimento básico", "Gestão de tickets", "Relatórios básicos"],
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados de assinatura
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Calcula dias restantes no trial
  const trialDaysRemaining = subscription.trialEndsAt
    ? Math.max(0, Math.ceil((subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  // Verifica se o trial está ativo
  const isTrialActive = subscription.status === "trial" && trialDaysRemaining > 0

  // Total de dias do trial (assumindo 3 dias para este exemplo)
  const totalTrialDays = 3

  return {
    subscription,
    loading,
    isTrialActive,
    trialDaysRemaining,
    totalTrialDays,
    isPro: subscription.isPro,
  }
}
