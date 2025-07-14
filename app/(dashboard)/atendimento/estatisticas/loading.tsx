import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-10 w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-[400px] w-full lg:col-span-4" />
          <Skeleton className="h-[400px] w-full lg:col-span-3" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-[400px] w-full lg:col-span-3" />
          <Skeleton className="h-[400px] w-full lg:col-span-4" />
        </div>
      </div>
    </div>
  )
}
