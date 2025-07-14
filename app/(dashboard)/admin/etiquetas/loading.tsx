import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function EtiquetasLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Skeleton className="h-10 w-full sm:w-96" />
          <div className="flex gap-2 w-full sm:w-auto">
            <Skeleton className="h-10 w-full sm:w-32" />
            <Skeleton className="h-10 w-full sm:w-32" />
          </div>
        </div>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center space-x-4 py-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[80px]" />
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-6 w-[50px]" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-6 w-[50px]" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
