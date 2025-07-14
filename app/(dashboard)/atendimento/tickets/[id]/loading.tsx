import { Skeleton } from "@/components/ui/skeleton"

export default function TicketDetailsLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 border-b p-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-1 h-4 w-64" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-10 w-[150px] rounded-md" />
          <Skeleton className="h-10 w-[150px] rounded-md" />
          <Skeleton className="h-10 w-[180px] rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 border-r">
          <div className="border-b">
            <div className="mx-4 my-2">
              <Skeleton className="h-10 w-64 rounded-md" />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <Skeleton className={`h-24 w-[70%] rounded-lg ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-80">
          <div className="p-4 space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
