"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function UserFilters() {
  const [filters, setFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter))
  }

  const clearFilters = () => {
    setFilters([])
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar usuários..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Cargo</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-admin" onCheckedChange={() => addFilter("Administrador")} />
                      <Label htmlFor="role-admin">Administrador</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-manager" onCheckedChange={() => addFilter("Gerente")} />
                      <Label htmlFor="role-manager">Gerente</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-analyst" onCheckedChange={() => addFilter("Analista")} />
                      <Label htmlFor="role-analyst">Analista</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-agent" onCheckedChange={() => addFilter("Agente")} />
                      <Label htmlFor="role-agent">Agente</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-active" onCheckedChange={() => addFilter("Ativo")} />
                      <Label htmlFor="status-active">Ativo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-inactive" onCheckedChange={() => addFilter("Inativo")} />
                      <Label htmlFor="status-inactive">Inativo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-pending" onCheckedChange={() => addFilter("Pendente")} />
                      <Label htmlFor="status-pending">Pendente</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Departamento</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-quality" onCheckedChange={() => addFilter("Qualidade")} />
                      <Label htmlFor="dept-quality">Qualidade</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-support" onCheckedChange={() => addFilter("Suporte")} />
                      <Label htmlFor="dept-support">Suporte</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-operations" onCheckedChange={() => addFilter("Operações")} />
                      <Label htmlFor="dept-operations">Operações</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-it" onCheckedChange={() => addFilter("TI")} />
                      <Label htmlFor="dept-it">TI</Label>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={clearFilters} disabled={filters.length === 0 && !searchQuery}>
            Limpar
          </Button>
        </div>
      </div>

      {filters.length > 0 && (
        <Card className="flex flex-wrap gap-2 p-2">
          {filters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => removeFilter(filter)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </Card>
      )}
    </div>
  )
}
