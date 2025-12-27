'use client'

import { InputHTMLAttributes, Ref, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button, Tooltip } from '@/components/ui'
import { cn } from '@/lib'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  ref?: Ref<HTMLInputElement>
}

export const Input = ({ label, error, className, type = 'text', ref, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">{label}</label>}

      <div className="relative group">
        <input
          ref={ref}
          type={inputType}
          className={cn(
            'w-full bg-[#1e2536] border border-gray-700 rounded-md p-2 text-sm',
            'transition-all duration-200 outline-none',
            'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isPassword && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />

        {isPassword && (
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
        )}
      </div>

      {error && <span className="text-[10px] text-red-500 font-medium italic px-1">{error}</span>}
    </div>
  )
}
