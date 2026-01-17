'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib'

// Extendemos para permitir asChild y otras props estándar si fuera necesario
interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  children: ReactNode
  content: ReactNode
  className?: string
  // Si quisieras que el Trigger fuera asChild desde afuera:
  asChild?: boolean 
}

export const Tooltip = ({ children, content, className, ...props }: TooltipProps) => {
  const [open, setOpen] = useState(false)

  const arrowWidth = 12
  const arrowHeight = 6
  const borderWidth = arrowWidth + 2
  const borderHeight = arrowHeight + 1

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      {/* Pasamos las props como defaultOpen, etc. */}
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
        <TooltipPrimitive.Trigger
          asChild
          onPointerDown={e => {
            if (e.pointerType === 'touch') {
              // No prevenimos el default aquí para dejar que el radio se seleccione
              setOpen(prev => !prev)
            }
          }}
          // ELIMINADO: onClick={e => e.preventDefault()} 
          // Este preventDefault era lo que mataba la interacción del RadioGroup
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
                sideOffset={8 + 1}
                collisionPadding={10}
                // Evita que el tooltip se cierre mal en móviles
                onPointerDownOutside={e => {
                  const target = e.target as HTMLElement;
                  if (target?.closest('[data-radix-tooltip-trigger]')) {
                    e.preventDefault()
                  } else {
                    setOpen(false)
                  }
                }}
                className={cn(
                  'bg-surface/95 z-[100] max-w-70 rounded-lg px-3 py-2 backdrop-blur-md',
                  'text-foreground border-border border text-sm font-medium shadow-2xl',
                  className
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  {content}

                  <TooltipPrimitive.Arrow asChild>
                    <svg
                      width={borderWidth}
                      height={borderHeight}
                      viewBox={`0 0 ${borderWidth} ${borderHeight}`}
                      className="fill-border z-0"
                    >
                      <polygon points={`0,0 ${borderWidth},0 ${borderWidth / 2},${borderHeight}`} />
                    </svg>
                  </TooltipPrimitive.Arrow>

                  <TooltipPrimitive.Arrow asChild style={{ marginTop: '-0.75px' }}>
                    <svg
                      width={arrowWidth}
                      height={arrowHeight}
                      viewBox={`0 0 ${arrowWidth} ${arrowHeight}`}
                      className="fill-surface/95 z-10 ml-px"
                    >
                      <polygon points={`0,0 ${arrowWidth},0 ${arrowWidth / 2},${arrowHeight}`} />
                    </svg>
                  </TooltipPrimitive.Arrow>
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}