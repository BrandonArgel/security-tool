import { cva, type VariantProps } from 'class-variance-authority'
import { Info } from 'lucide-react'
import { Card, Tooltip } from '@components/ui/'
import { cn } from '@/lib'

const crackTimeVariants = cva('mt-4 transition-all duration-500 border', {
  variants: {
    level: {
      'N/A': 'text-text-muted bg-surface-hover border-border',
      low: 'text-security-low bg-security-low/5 border-security-low/20',
      mid: 'text-security-mid bg-security-mid/5 border-security-mid/20',
      high: 'text-security-high bg-security-high/5 border-security-high/20',
      safe: 'text-security-safe bg-security-safe/5 border-security-safe/20'
    }
  },
  defaultVariants: {
    level: 'low'
  }
})

interface CrackTimeProps extends VariantProps<typeof crackTimeVariants> {
  time: string
}

export const CrackTime = ({ time, level }: CrackTimeProps) => {
  return (
    <Card variant="ghost" padding="sm" className={cn(crackTimeVariants({ level }))}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-wide">Time to Crack (2026 Est.)</span>

          <span className="mt-1 text-xl leading-none font-black tracking-tight">{time}</span>
        </div>

        <div className="shrink-0 text-right">
          <span className="block font-mono text-sm">Brute Force Rate</span>
          <div className="flex items-center justify-end gap-2 text-right">
            <span className="block text-sm font-bold">1T / sec</span>
            <Tooltip content="Calculated based on 1 trillion guesses per second.">
              <Info size={12} className="cursor-help text-current hover:opacity-80" />
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  )
}
