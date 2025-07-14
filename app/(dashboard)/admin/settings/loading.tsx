import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <Skeleton className="h-[50px] w-full" />

      <div className="space-y-4">
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  )
}
