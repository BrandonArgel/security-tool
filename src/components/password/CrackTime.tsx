// src/modules/password-generator/components/CrackTime.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { Info } from 'lucide-react'
import { Card, Tooltip } from '@components/ui/'
import { cn } from '@/lib'

const crackTimeVariants = cva('mt-4 transition-all duration-500 border', {
  variants: {
    level: {
      'N/A': 'text-gray-500 bg-gray-500/10 border-gray-500/20',
      low: 'text-security-low bg-security-low/10 border-security-low/20',
      mid: 'text-security-mid bg-security-mid/10 border-security-mid/20',
      high: 'text-security-high bg-security-high/10 border-security-high/20',
      safe: 'text-security-safe bg-security-safe/10 border-security-safe/20'
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
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Time to Crack (2025 Est.)</span>

          <span className="text-xl font-black tracking-tight mt-1 leading-none">{time}</span>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[9px] block font-mono opacity-60 uppercase">Brute Force Rate</span>
          <div className="flex items-center gap-2 text-right justify-end">
            <span className="text-[10px] font-bold block">100B / sec</span>
            <Tooltip content="Calculated based on 100 billion guesses per second (2025 standard)">
              <Info size={12} className="text-current cursor-help hover:opacity-80" />
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  )
}
