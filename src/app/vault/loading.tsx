import { Card } from '@/components/ui'

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2">
        <div className="bg-surface-hover h-8 w-40 animate-pulse rounded-md" />
        <div className="bg-surface-hover h-5 w-60 animate-pulse rounded-md" />
      </div>

      <div className="space-y-6">
        {/* Controls Skeleton */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="bg-surface-hover h-10 w-full flex-1 animate-pulse rounded-md sm:max-w-xs" />
          <div className="flex gap-2">
            <div className="bg-surface-hover h-10 w-24 animate-pulse rounded-md" />
            <div className="bg-surface-hover h-10 w-20 animate-pulse rounded-md" />
          </div>
        </div>

        {/* List Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="flex items-center justify-between gap-4 p-3">
              <div className="flex flex-1 items-center gap-4">
                <div className="bg-surface-hover h-8 w-8 animate-pulse rounded-full" />
                <div className="bg-surface-hover h-10 w-10 animate-pulse rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="bg-surface-hover h-4 w-32 animate-pulse rounded" />
                  <div className="bg-surface-hover h-3 w-48 animate-pulse rounded" />
                </div>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <div className="bg-surface-hover h-8 w-24 animate-pulse rounded" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
