import { cn } from '@/lib'
import { SecurityLevel } from '@features/password-generator/utils/metrics'

interface StrengthMeterProps {
  level: SecurityLevel
  score: number
}

const levelConfig: Record<SecurityLevel, { label: string; color: string }> = {
  'N/A': { label: 'N/A', color: 'bg-gray-500' },
  low: { label: 'Weak', color: 'bg-security-low' },
  mid: { label: 'Moderate', color: 'bg-security-mid' },
  high: { label: 'Strong', color: 'bg-security-high' },
  safe: { label: 'Very Strong', color: 'bg-security-safe' }
}

export const StrengthMeter = ({ level, score }: StrengthMeterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
        <span>Strength</span>
        <span className={cn('transition-colors', levelConfig[level].color.replace('bg-', 'text-'))}>
          {levelConfig[level].label}
        </span>
      </div>
      <div className="flex gap-1.5 h-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 rounded-full transition-all duration-500',
              i < score ? levelConfig[level].color : 'bg-white/5'
            )}
          />
        ))}
      </div>
    </div>
  )
}
