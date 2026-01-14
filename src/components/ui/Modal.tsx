'use client'

import { ReactNode, useEffect, useEffectEvent, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib'
import { Button } from '@/components/ui'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export const Modal = ({ isOpen, onClose, children, title, description, className }: ModalProps) => {
  const [mounted, setMounted] = useState(false)

  const handleMounted = useEffectEvent(() => {
    setMounted(true)
  })

  useEffect(() => {
    handleMounted()

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div
              className={cn(
                'bg-surface relative max-h-[90dvh] w-full overflow-hidden overflow-y-auto rounded-2xl border border-white/10 shadow-2xl',
                className
              )}
            >
              <div className="border-border-subtle flex items-center justify-between border-b p-6">
                <div>
                  {title && <h2 className="text-foreground text-xl font-semibold">{title}</h2>}
                  {description && <p className="text-text-muted mt-1 text-sm">{description}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-muted hover:text-foreground h-8 w-8 rounded-full"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
