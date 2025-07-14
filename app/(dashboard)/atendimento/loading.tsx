import { Skeleton } from "@/components/ui/skeleton"

export default function AtendimentoLoading() {
  return (
    <div className="flex h-full">
      {/* Sidebar de conversas */}
      <div className="flex w-80 flex-col border-r">
        <div className="flex items-center justify-between p-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
        <div className="px-4 py-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3 p-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área principal */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-1 h-3 w-48" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <Skeleton className={`h-24 w-[70%] rounded-lg ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Painel lateral */}
      <div className="w-80 border-l">
        <div className="p-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="p-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="mt-4 h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
