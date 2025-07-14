import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-8 w-16 mt-2" />
                  <Skeleton className="h-3 w-32 mt-2" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <Skeleton className="h-10 w-72" />

            <div className="flex flex-wrap gap-2 items-center">
              <Skeleton className="h-10 w-44" />
              <Skeleton className="h-10 w-44" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="p-1">
              <div className="bg-muted/50 p-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24 hidden md:block" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-32 hidden md:block" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16 ml-auto" />
                </div>
              </div>

              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t p-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-64" />
                      <div className="flex gap-1 mt-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
