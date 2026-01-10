'use client'

import React from 'react'
import { cn } from '@/lib'

interface ToggleProps {
  enabled: boolean
  setEnabled: (_state: boolean) => void
  label?: string
  description?: string
  icon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  id?: string
}

export const Toggle = ({ className, enabled, setEnabled, id, label, description, icon, endIcon }: ToggleProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={cn(
          'focus-visible:ring-primary focus-visible:ring-offset-background relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          enabled ? 'bg-primary' : 'bg-gray-500/50',
          className
        )}
      >
        <span className="sr-only">Toggle setting</span>
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            {label && (
              <label htmlFor={id} className="text-foreground font-medium">
                {label}
              </label>
            )}
            {endIcon && <span className="text-muted-foreground">{endIcon}</span>}
          </div>
          {description && <span className="text-muted-foreground text-sm">{description}</span>}
        </div>
      )}
    </div>
  )
}
