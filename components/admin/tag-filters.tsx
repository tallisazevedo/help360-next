"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { TagCreateDialog } from "./tag-create-dialog"

export function TagFilters() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar etiquetas..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full sm:w-auto">
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
          <TagCreateDialog />
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="ticket">Tickets</SelectItem>
                    <SelectItem value="document">Documentos</SelectItem>
                    <SelectItem value="client">Clientes</SelectItem>
                    <SelectItem value="product">Produtos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usage">Uso</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="usage">
                    <SelectValue placeholder="Selecione o uso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="high">Alto uso</SelectItem>
                    <SelectItem value="medium">Médio uso</SelectItem>
                    <SelectItem value="low">Baixo uso</SelectItem>
                    <SelectItem value="unused">Não utilizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativa</SelectItem>
                    <SelectItem value="inactive">Inativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Limpar filtros</Button>
              <Button>Aplicar filtros</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
