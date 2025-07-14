"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function ClientFilters() {
  const [filters, setFilters] = useState<{
    status: string
    segment: string
    plan: string
  }>({
    status: "",
    segment: "",
    plan: "",
  })

  const clearFilters = () => {
    setFilters({
      status: "",
      segment: "",
      plan: "",
    })
  }

  const hasFilters = filters.status || filters.segment || filters.plan

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar clientes..." className="pl-8" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.segment} onValueChange={(value) => setFilters({ ...filters, segment: value })}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
              <SelectItem value="manufatura">Manufatura</SelectItem>
              <SelectItem value="consultoria">Consultoria</SelectItem>
              <SelectItem value="quimica">Química</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.plan} onValueChange={(value) => setFilters({ ...filters, plan: value })}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Filtros:</div>
          <div className="flex flex-wrap gap-2">
            {filters.status && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Status: {filters.status === "active" ? "Ativo" : filters.status === "inactive" ? "Inativo" : "Pendente"}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => setFilters({ ...filters, status: "" })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.segment && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Segmento: {filters.segment}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => setFilters({ ...filters, segment: "" })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.plan && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Plano: {filters.plan}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => setFilters({ ...filters, plan: "" })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
