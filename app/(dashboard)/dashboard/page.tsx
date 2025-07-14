import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatusCards } from "@/components/dashboard/status-cards"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NonConformityChart } from "@/components/dashboard/non-conformity-chart"
import { ImprovementOpportunities } from "@/components/dashboard/improvement-opportunities"
import { ServiceMetrics } from "@/components/dashboard/service-metrics"
import { NPSScore } from "@/components/dashboard/nps-score"
import { Achievements } from "@/components/dashboard/achievements"
import { DailyTasks } from "@/components/dashboard/daily-tasks"
import { TicketStatus } from "@/components/dashboard/ticket-status"
import { TrialBanner } from "@/components/dashboard/trial-banner"

export const metadata: Metadata = {
  title: "Dashboard | Help360",
  description: "Visão geral da plataforma Help360",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <TrialBanner />
      <DashboardHeader />
      <StatusCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Acompanhamento de não conformidades e ações corretivas nos últimos 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Não Conformidades por Categoria</CardTitle>
            <CardDescription>Distribuição por tipo de não conformidade</CardDescription>
          </CardHeader>
          <CardContent>
            <NonConformityChart />
          </CardContent>
        </Card>
      </div>

      {/* Novas métricas de atendimento */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Atendimento</CardTitle>
            <CardDescription>Desempenho dos atendimentos nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceMetrics />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NPS</CardTitle>
            <CardDescription>Net Promoter Score atual</CardDescription>
          </CardHeader>
          <CardContent>
            <NPSScore />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
            <CardDescription>Suas conquistas recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <Achievements />
          </CardContent>
        </Card>
      </div>

      {/* Status de tickets e tarefas */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demandas do Dia</CardTitle>
            <CardDescription>Tarefas que precisam ser resolvidas hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <DailyTasks />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status de Tickets</CardTitle>
            <CardDescription>Tickets que requerem sua atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <TicketStatus />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ImprovementOpportunities />
        <RecentActivity />
      </div>
    </div>
  )
}
