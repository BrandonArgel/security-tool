import { Input } from '@/components/ui'
import { Info } from 'lucide-react'
import { Tooltip } from '@components/ui'
import { cn } from '@/lib/cn'

interface LengthControlProps {
  length: number
  minLength: number
  maxLength: number
  isControlDisabled?: boolean
  onChange: (_val: number) => void
}

export const LengthControl = ({ length, minLength, maxLength, isControlDisabled, onChange }: LengthControlProps) => {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Length</span>

            <Tooltip content="Passwords with 16+ characters are significantly harder to crack.">
              <Info size={16} className="text-primary cursor-help hover:text-primary/80" />
            </Tooltip>
          </div>
        </div>
        <div className="w-20">
          <Input
            type="number"
            min={minLength}
            max={maxLength}
            value={length}
            onChange={(e) => onChange(parseInt(e.target.value) || minLength)}
            className="text-center font-mono text-primary text-lg py-1 border-gray-700 focus:border-primary"
            disabled={isControlDisabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative w-full pt-2">
          <input
            type="range"
            min={minLength}
            max={maxLength}
            value={length}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={cn(
              'w-full h-2 bg-border-subtle rounded-lg appearance-none transition-all',
              'accent-primary enabled:cursor-pointer enabled:active:cursor-grabbing',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            disabled={isControlDisabled}
          />
        </div>
        <div className="flex justify-between px-0.5 select-none pointer-events-none">
          <span className="text-[10px] font-bold text-text-muted font-mono">{minLength}</span>
          <span className="text-[10px] font-bold text-text-muted font-mono">{maxLength}</span>
        </div>
      </div>
    </section>
  )
}
