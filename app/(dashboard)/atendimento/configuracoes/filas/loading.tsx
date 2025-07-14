import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Skeleton className="h-[500px] w-full" />
        </div>

        <div className="md:col-span-8">
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    </div>
  )
}
