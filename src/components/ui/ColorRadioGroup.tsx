'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { ThemeColor } from '@/hooks/useThemeColor'
import { cn } from '@/lib'
import { Tooltip } from '@components/ui'

export interface ColorOption {
  value: ThemeColor
  label: string
  colorClass: string
}

interface ColorRadioGroupProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {
  options: ColorOption[]
}

export function ColorRadioGroup({ className, options, ref, ...props }: ColorRadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
      {options.map(option => (
        <Tooltip key={option.value} content={option.label}>
          <RadioGroupPrimitive.Item
            key={option.value}
            value={option.value}
            aria-label={option.label}
            className={cn(
              'group relative flex h-8 w-8 items-center justify-center rounded-full transition-all outline-none',
              option.colorClass,
              'hover:ring-border/50 ring-offset-background ring-1 ring-transparent',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
              'data-[state=checked]:ring-primary data-[state=checked]:ring-2 data-[state=checked]:ring-offset-2'
            )}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <div className="anim-scale-in h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
        </Tooltip>
      ))}
    </RadioGroupPrimitive.Root>
  )
}
