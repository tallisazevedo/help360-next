import { Skeleton } from "@/components/ui/skeleton"

export default function SecurityLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}
