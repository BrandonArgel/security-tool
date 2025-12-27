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
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <AnimatePresence>
          {open && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                asChild
                sideOffset={8}
                className={cn(
                  'z-100 rounded-lg bg-[#1e2536]/90 backdrop-blur-md px-3 py-2 text-xs font-medium text-white shadow-2xl border border-white/10',
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
