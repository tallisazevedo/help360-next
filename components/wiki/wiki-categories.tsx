"use client"

import { useState } from "react"
import { ChevronRight, FolderOpen, Hash, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const categories = [
  {
    id: "favoritos",
    name: "Favoritos",
    icon: Star,
    count: 8,
    subcategories: [],
  },
  {
    id: "processos",
    name: "Processos",
    icon: FolderOpen,
    count: 24,
    subcategories: [
      { id: "atendimento", name: "Atendimento", count: 12 },
      { id: "qualidade", name: "Qualidade", count: 8 },
      { id: "auditoria", name: "Auditoria", count: 4 },
    ],
  },
  {
    id: "produtos",
    name: "Produtos",
    icon: FolderOpen,
    count: 15,
    subcategories: [
      { id: "especificacoes", name: "Especificações", count: 7 },
      { id: "manuais", name: "Manuais", count: 8 },
    ],
  },
  {
    id: "tutoriais",
    name: "Tutoriais",
    icon: FolderOpen,
    count: 18,
    subcategories: [
      { id: "sistema", name: "Sistema", count: 10 },
      { id: "ferramentas", name: "Ferramentas", count: 8 },
    ],
  },
  {
    id: "tags",
    name: "Tags",
    icon: Hash,
    count: 32,
    subcategories: [
      { id: "qualidade", name: "Qualidade", count: 15 },
      { id: "procedimentos", name: "Procedimentos", count: 12 },
      { id: "normas", name: "Normas", count: 8 },
      { id: "iso9001", name: "ISO 9001", count: 10 },
    ],
  },
]

export function WikiCategories() {
  const [openCategories, setOpenCategories] = useState<string[]>(["favoritos"])

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId],
    )
  }

  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-sm font-medium">Categorias</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4 pt-0">
        <div className="space-y-1">
          {categories.map((category) => (
            <Collapsible
              key={category.id}
              open={openCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-between px-2", openCategories.includes(category.id) && "bg-muted")}
                >
                  <div className="flex items-center">
                    <category.icon className="mr-2 h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-1 px-1">
                      {category.count}
                    </Badge>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openCategories.includes(category.id) && "rotate-90",
                      )}
                    />
                  </div>
                </Button>
              </CollapsibleTrigger>
              {category.subcategories.length > 0 && (
                <CollapsibleContent className="ml-4 mt-1 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <Button key={subcategory.id} variant="ghost" className="w-full justify-between px-2">
                      <span className="text-sm">{subcategory.name}</span>
                      <Badge variant="outline" className="px-1 text-xs">
                        {subcategory.count}
                      </Badge>
                    </Button>
                  ))}
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
