import { Skeleton } from "@/components/ui/skeleton"

export default function GerenciadorLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Skeleton className="h-7 w-64" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[180px] rounded-md" />
            <Skeleton className="h-10 w-[250px] rounded-md" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="flex-1">
        <div className="border-b">
          <div className="mx-4 my-2">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
