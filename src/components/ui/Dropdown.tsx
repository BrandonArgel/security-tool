'use client'

import React, { useState, useRef, useContext, createContext, ReactNode } from 'react'
import { Button } from '@/components/ui'
import { createPortal } from 'react-dom'
import { useClickOutside } from '@/hooks'
import { cn } from '@/lib'

interface DropdownContextType {
  isOpen: boolean
  coords: { top: number; left: number; width: number }
  triggerRef: React.RefObject<HTMLButtonElement | null>
  dropdownRef: React.RefObject<HTMLDivElement | null>
  toggle: () => void
  close: () => void
}

interface DropdownProps {
  children: ReactNode
  className?: string
}

import { Slot } from '@radix-ui/react-slot'

interface DropdownTriggerProps {
  children: ReactNode
  className?: string
  asChild?: boolean
}

interface DropdownContentProps {
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
}

interface DropdownItemProps {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

interface DropdownSectionProps {
  children: ReactNode
  borderTop?: boolean
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

const useDropdownContext = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within a <Dropdown> provider')
  }
  return context
}

export const Dropdown = ({ children, className = '' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const toggle = () => {
    if (triggerRef.current && !isOpen) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX,
        width: rect.width
      })
    }
    setIsOpen((prev) => !prev)
  }

  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  const close = () => {
    setIsOpen(false)
  }

  useClickOutside<HTMLElement>([dropdownRef, triggerRef], handleClickOutside)

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef, coords, dropdownRef }}>
      <div className={cn(className)}>{children}</div>
    </DropdownContext.Provider>
  )
}

export const DropdownTrigger = ({ children, className = '', asChild = false }: DropdownTriggerProps) => {
  const { toggle, triggerRef } = useDropdownContext()
  const Comp = asChild ? Slot : Button

  return (
    <Comp
      ref={triggerRef}
      onClick={toggle}
      className={cn('cursor-pointer hover:bg-transparent', className, !asChild && 'bg-transparent text-current')}
    >
      {children}
    </Comp>
  )
}

export const DropdownContent = ({ children, className = '' }: DropdownContentProps) => {
  const { isOpen, coords, dropdownRef } = useDropdownContext()

  if (!isOpen) return null

  return createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        transform: 'translateX(-100%)'
      }}
      className={cn(
        'bg-surface border-border z-50 rounded-lg border shadow-xl',
        'origin-top-right overflow-hidden',
        'animate-in fade-in zoom-in-95 duration-100',
        className
      )}
    >
      {children}
    </div>,
    document.body
  )
}

export const DropdownItem = ({ children, icon, onClick, className = '', disabled = false }: DropdownItemProps) => {
  const { close } = useDropdownContext()

  const handleClick = (_e: React.MouseEvent) => {
    if (disabled) return
    if (onClick) onClick()
    close()
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${disabled ? 'cursor-not-allowed text-text-muted opacity-50' : 'text-foreground hover:bg-surface-hover hover:text-foreground'} ${className}`}
    >
      {icon && <span className={`${disabled ? 'text-text-muted' : 'text-text-subtle'}`}>{icon}</span>}
      {children}
    </button>
  )
}

export const DropdownSection = ({ children, borderTop = false }: DropdownSectionProps) => (
  <div className={`${borderTop ? 'border-t border-border' : ''}`}>{children}</div>
)
