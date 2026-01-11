import { Loader } from '@/components/ui/Loader'

export default function Loading() {
  return (
    <div className="animate-in fade-in flex min-h-[50dvh] w-full flex-col items-center justify-center duration-500">
      <div className="flex flex-col items-center gap-4">
        <Loader size="icon" className="text-primary animate-spin" />
        <p className="text-text-muted animate-pulse text-sm">Loading...</p>
      </div>
    </div>
  )
}
