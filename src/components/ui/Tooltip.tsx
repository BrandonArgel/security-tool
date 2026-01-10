'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  className?: string
}

export const Tooltip = ({ children, content, className }: TooltipProps) => {
  const [open, setOpen] = useState(false)

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen} disableHoverableContent>
        <TooltipPrimitive.Trigger
          asChild
          onTouchStart={() => setOpen(true)}
          onPointerDown={(e) => {
            if (e.pointerType === 'touch') setOpen(!open)
          }}
        >
          {children}
        </TooltipPrimitive.Trigger>

        <AnimatePresence>
          {open && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                asChild
                side="top"
                align="center"
                sideOffset={8}
                collisionPadding={10}
                onPointerDownOutside={() => {
                  setOpen(false)
                }}
                className={cn(
                  'bg-surface/95 z-100 max-w-70 rounded-lg px-3 py-2 backdrop-blur-md',
                  'text-foreground border border-border text-sm font-medium shadow-2xl',
                  className
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                >
                  {content}
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
