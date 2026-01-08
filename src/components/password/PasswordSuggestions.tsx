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
    <div className="space-y-3 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Recommendations</p>
          <Tooltip content="Don't use personal information such as names (including your pets' names), birth dates, or other easily guessable words.">
            <AlertCircle size={12} className="text-current cursor-help hover:opacity-80" />
          </Tooltip>
        </div>
        {isComplete && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] text-success font-medium flex items-center gap-1"
          >
            <CheckCircle2 size={12} /> Optimized
          </motion.span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="group px-3 py-1.5 rounded-full bg-surface/50 border border-border/50 hover:border-warning/30 transition-colors flex items-center gap-2"
            >
              <AlertCircle size={10} className="text-warning animate-pulse" />
              <span className="text-[11px] text-text-muted group-hover:text-text-primary transition-colors">
                {suggestion.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {!password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] text-text-muted/90 bg-text-muted/5 border border-text-muted/20 px-4 py-2 rounded-xl w-full text-center"
          >
            {defaultMessage}
          </motion.p>
        )}

        {isComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] text-success/90 bg-success/5 border border-success/20 px-4 py-2 rounded-xl w-full text-center"
          >
            Excellent! Your password meets all the standards.
          </motion.p>
        )}
      </div>
    </div>
  )
}
