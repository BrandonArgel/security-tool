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
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-text" onClick={handleIconClick}>
      {startIcon}
    </div>
  ) : null

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
          {label}
        </label>
      )}

      <div className="relative group">
        {StartIcon}

        <input
          id={id}
          ref={handleRef}
          type={inputType}
          className={cn(
            'w-full bg-surface border border-gray-700 rounded-md p-2 text-sm',
            'transition-all duration-200 outline-none',
            'select-none',
            'focus:ring-1 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            startIcon && 'pl-9',
            (isPassword || endIcon) && 'pr-10',
            error && 'focus:ring-red-500 border-red-500 text-red-500',
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
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-white"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </Button>
          </Tooltip>
        ) : endIcon ? (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-text"
            onClick={handleIconClick}
          >
            {endIcon}
          </div>
        ) : null}
      </div>

      {error && <span className="text-[10px] text-red-500 font-medium italic px-1">{error}</span>}
    </div>
  )
}
