"use client"

import { useState } from "react"
import { Filter, CalendarRange } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

// Lista de canais para filtro
const CHANNELS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "teams", label: "Teams" },
  { id: "telegram", label: "Telegram" },
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "email", label: "Email" },
  { id: "chat", label: "Chat Web" },
]

// Lista de status para filtro
const STATUSES = [
  { id: "open", label: "Aberto" },
  { id: "pending", label: "Pendente" },
  { id: "closed", label: "Finalizado" },
]

// Lista de sentimentos para filtro
const SENTIMENTS = [
  { id: "positive", label: "Positivo" },
  { id: "neutral", label: "Neutro" },
  { id: "negative", label: "Negativo" },
]

export function ConversationListFilters() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>([])
  const [date, setDate] = useState<Date>()

  const toggleChannel = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId) ? prev.filter((id) => id !== channelId) : [...prev, channelId],
    )
  }

  const toggleStatus = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId) ? prev.filter((id) => id !== statusId) : [...prev, statusId],
    )
  }

  const toggleSentiment = (sentimentId: string) => {
    setSelectedSentiments((prev) =>
      prev.includes(sentimentId) ? prev.filter((id) => id !== sentimentId) : [...prev, sentimentId],
    )
  }

  const clearFilters = () => {
    setSelectedChannels([])
    setSelectedStatuses([])
    setSelectedSentiments([])
    setDate(undefined)
  }

  // Contador de filtros ativos
  const activeFiltersCount =
    selectedChannels.length + selectedStatuses.length + selectedSentiments.length + (date ? 1 : 0)

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">{activeFiltersCount}</Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Canais</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {CHANNELS.map((channel) => (
              <DropdownMenuCheckboxItem
                key={channel.id}
                checked={selectedChannels.includes(channel.id)}
                onCheckedChange={() => toggleChannel(channel.id)}
              >
                {channel.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {STATUSES.map((status) => (
              <DropdownMenuCheckboxItem
                key={status.id}
                checked={selectedStatuses.includes(status.id)}
                onCheckedChange={() => toggleStatus(status.id)}
              >
                {status.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Sentimento</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {SENTIMENTS.map((sentiment) => (
              <DropdownMenuCheckboxItem
                key={sentiment.id}
                checked={selectedSentiments.includes(sentiment.id)}
                onCheckedChange={() => toggleSentiment(sentiment.id)}
              >
                {sentiment.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          {activeFiltersCount > 0 && (
            <Button variant="ghost" className="w-full justify-start text-sm font-normal" onClick={clearFilters}>
              Limpar filtros
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarRange className="h-4 w-4" />
            {date ? <span>{date.toLocaleDateString()}</span> : <span>Data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}
