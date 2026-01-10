'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Input } from '@/components/ui'
import { Info } from 'lucide-react'
import { Tooltip } from '@components/ui'
import { cn } from '@/lib/cn'
import { MIN_LENGTH } from '@/lib/password/types'

interface LengthControlProps {
  length: number
  minLength: number
  maxLength: number
  isControlDisabled?: boolean
  onChange: (_val: number) => void
}

export const LengthControl = ({ length, minLength, maxLength, isControlDisabled, onChange }: LengthControlProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const hasError = isTouched && length < 5

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-text-subtle text-sm font-bold tracking-widest uppercase">Length</span>

            <Tooltip content="Passwords with 16+ characters are significantly harder to crack.">
              <Info size={16} className="text-primary hover:text-primary/80 cursor-help" />
            </Tooltip>
          </div>
        </div>
        <div className="w-25">
          <motion.div
            animate={hasError ? { x: [-2, 2, -2, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            <Input
              type="number"
              min={0}
              max={maxLength}
              value={length === 0 ? '' : length}
              onChange={e => {
                const val = e.target.value === '' ? 0 : parseInt(e.target.value)
                onChange(val)
              }}
              onBlur={() => setIsTouched(true)}
              error={hasError ? `Minimum length is ${MIN_LENGTH}` : undefined}
              className="text-primary py-1 text-center font-mono text-lg"
              disabled={isControlDisabled}
            />
          </motion.div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative w-full pt-2">
          <input
            type="range"
            min={minLength}
            max={maxLength}
            value={length}
            onChange={e => onChange(parseInt(e.target.value) || 0)}
            className={cn(
              'bg-border-strong/25 h-2 w-full appearance-none rounded-lg transition-all',
              'accent-primary enabled:cursor-pointer enabled:active:cursor-grabbing',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            disabled={isControlDisabled}
          />
        </div>
        <div className="pointer-events-none flex justify-between px-0.5 select-none">
          <span className="text-text-muted font-mono text-sm font-bold">{minLength}</span>
          <span className="text-text-muted font-mono text-sm font-bold">{maxLength}</span>
        </div>
      </div>
    </section>
  )
}
