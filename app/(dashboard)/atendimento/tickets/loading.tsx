import { Skeleton } from "@/components/ui/skeleton"

export default function TicketsLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Skeleton className="h-7 w-64" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[180px] rounded-md" />
            <Skeleton className="h-10 w-[180px] rounded-md" />
            <Skeleton className="h-10 w-[250px] rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Skeleton className="h-[calc(100%-2rem)] w-full rounded-lg" />
      </div>
    </div>
  )
}
