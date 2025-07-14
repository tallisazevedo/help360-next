import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-10 w-64 mb-1" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="flex-shrink-0 w-80">
            <div className="bg-muted rounded-t-md p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-8" />
              </div>
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            <div className="rounded-b-md border bg-background p-3 space-y-3 h-[calc(100vh-280px)]">
              {[...Array(3)].map((_, cardIndex) => (
                <Card key={cardIndex} className="p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />

                  <div className="flex flex-wrap gap-1 mb-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                </Card>
              ))}
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}

        <div className="flex-shrink-0 w-80">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
