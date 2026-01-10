import { motion, AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Button, Tooltip } from '@/components/ui'
import { HistoryItem } from './HistoryItem'

interface HistoryLogProps {
  history: string[]
  onClear: () => void
}

export const HistoryLog = ({ history, onClear }: HistoryLogProps) => {
  const hasHistory = history.length > 0
  const items = history.slice(0, 5)

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-text-muted text-xs leading-8 font-bold tracking-[0.2em] uppercase">Recent Passwords</h3>

        <AnimatePresence>
          {hasHistory && (
            <motion.div
              key="btn-trash"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Tooltip content="Clear history">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClear}
                  className="text-text-muted p-0 transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="overflow-hidden rounded-xl">
        <ul className="relative flex flex-col gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {hasHistory ? (
              items.map(pw => (
                <motion.li
                  key={pw}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: 20,
                    transition: { duration: 0.15 }
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                    mass: 1
                  }}
                >
                  <HistoryItem pw={pw} />
                </motion.li>
              ))
            ) : (
              <motion.li
                key="empty-state"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.1 }
                }}
                className="text-text-muted list-none py-4 text-center text-sm"
              >
                History is empty
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
