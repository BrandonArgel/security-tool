import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { PasswordSuggestion } from '@/lib/password/types'
import { Tooltip } from '@components/ui'

interface PasswordSuggestionsProps {
  password: string
  suggestions: PasswordSuggestion[]
  defaultMessage: string
}

export const PasswordSuggestions = ({ password, suggestions, defaultMessage }: PasswordSuggestionsProps) => {
  const isComplete = suggestions.length === 0 && password.length > 0

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-text-muted text-xs font-bold tracking-widest uppercase">Recommendations</p>
          <Tooltip content="Don't use personal information such as names (including your pets' names), birth dates, or other easily guessable words.">
            <AlertCircle size={12} className="text-foreground cursor-help hover:opacity-80" />
          </Tooltip>
        </div>
        {isComplete && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-success flex items-center gap-1 text-xs font-medium"
          >
            <CheckCircle2 size={12} /> Optimized
          </motion.span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {suggestions.map(suggestion => (
            <motion.div
              key={suggestion.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="group bg-surface/50 border-border/50 hover:border-warning/30 flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors"
            >
              <AlertCircle size={10} className="text-warning animate-pulse" />
              <span className="text-text-muted group-hover:text-text-primary text-sm transition-colors">
                {suggestion.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {!password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-text-muted/90 bg-text-muted/5 border-text-muted/20 w-full rounded-xl border px-4 py-2 text-center text-sm"
          >
            {defaultMessage}
          </motion.p>
        )}

        {isComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-success/90 bg-success/5 border-success/20 w-full rounded-xl border px-4 py-2 text-center text-sm"
          >
            Excellent! Your password meets all the standards.
          </motion.p>
        )}
      </div>
    </div>
  )
}
