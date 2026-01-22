'use client'

import { InputHTMLAttributes, Ref, useState, useRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button, Tooltip } from '@/components/ui'
import { cn } from '@/lib'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  ref?: Ref<HTMLInputElement>
}

export const Input = ({
  id,
  label,
  error,
  className,
  type = 'text',
  startIcon,
  endIcon,
  ref,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const internalRef = useRef<HTMLInputElement>(null)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  // Combine refs
  const handleRef = (node: HTMLInputElement) => {
    internalRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
  }

  const handleIconClick = () => {
    internalRef.current?.focus()
  }

  const StartIcon = startIcon ? (
    <div className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2 cursor-text" onClick={handleIconClick}>
      {startIcon}
    </div>
  ) : null

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-text-subtle px-1 text-sm font-bold tracking-wider uppercase">
          {label}
        </label>
      )}

      <div className="group relative">
        {StartIcon}

        <input
          id={id}
          ref={handleRef}
          type={inputType}
          className={cn(
            'bg-surface border-border w-full rounded-md border p-2 text-sm',
            'transition-all duration-200 outline-none',
            'select-none',
            'focus:ring-1 focus:ring-primary focus:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            startIcon && 'pl-9',
            (isPassword || endIcon) && 'pr-10',
            error && 'border-red-500 text-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />

        {isPassword ? (
          <Tooltip content={showPassword ? 'Hide password' : 'Show password'}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-muted hover:text-foreground absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </Button>
          </Tooltip>
        ) : endIcon ? (
          <div
            className="text-text-muted absolute top-1/2 right-3 -translate-y-1/2 cursor-text"
            onClick={handleIconClick}
          >
            {endIcon}
          </div>
        ) : null}
      </div>

      {error && <span className="px-1 text-xs font-medium text-red-500 italic">{error}</span>}
    </div>
  )
}
