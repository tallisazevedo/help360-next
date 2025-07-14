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

export function DocumentFilters() {
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
            placeholder="Pesquisar documentos..."
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
                  <h4 className="font-medium">Categoria</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-procedimento" onCheckedChange={() => addFilter("Procedimento")} />
                      <Label htmlFor="category-procedimento">Procedimento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-politica" onCheckedChange={() => addFilter("Política")} />
                      <Label htmlFor="category-politica">Política</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-relatorio" onCheckedChange={() => addFilter("Relatório")} />
                      <Label htmlFor="category-relatorio">Relatório</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-formulario" onCheckedChange={() => addFilter("Formulário")} />
                      <Label htmlFor="category-formulario">Formulário</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="category-plano" onCheckedChange={() => addFilter("Plano")} />
                      <Label htmlFor="category-plano">Plano</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-aprovado" onCheckedChange={() => addFilter("Aprovado")} />
                      <Label htmlFor="status-aprovado">Aprovado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-revisao" onCheckedChange={() => addFilter("Em revisão")} />
                      <Label htmlFor="status-revisao">Em revisão</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-rascunho" onCheckedChange={() => addFilter("Rascunho")} />
                      <Label htmlFor="status-rascunho">Rascunho</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-obsoleto" onCheckedChange={() => addFilter("Obsoleto")} />
                      <Label htmlFor="status-obsoleto">Obsoleto</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Tipo de arquivo</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-pdf" onCheckedChange={() => addFilter("PDF")} />
                      <Label htmlFor="type-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-docx" onCheckedChange={() => addFilter("DOCX")} />
                      <Label htmlFor="type-docx">DOCX</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-xlsx" onCheckedChange={() => addFilter("XLSX")} />
                      <Label htmlFor="type-xlsx">XLSX</Label>
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
