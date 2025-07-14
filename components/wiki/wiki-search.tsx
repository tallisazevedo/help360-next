"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function WikiSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Pesquisar na Wiki..." className="w-full bg-background pl-8 shadow-none" />
    </div>
  )
}
