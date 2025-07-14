import type { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

type EmptyStateProps = {
  title: string
  description: string
  icon: string
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  const Icon = Icons[icon as keyof typeof Icons] as LucideIcon

  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-muted p-3">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
