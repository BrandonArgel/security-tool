'use client'
import { Copy, Check } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useClipboard } from '@/hooks'

interface HistoryItemProps {
  pw: string
}

export const HistoryItem = ({ pw }: HistoryItemProps) => {
  const { copied, copy } = useClipboard()

  return (
    <Card variant="secondary" padding="sm" className="flex justify-between items-center border-white/5 bg-surface/30">
      <span className="font-mono text-sm truncate pr-4 text-gray-300">{pw}</span>

      <Button variant="ghost" size="icon" onClick={() => copy(pw)} title="Copy password">
        {copied ? (
          <Check className="w-4 h-4 text-green-500 animate-check-in" />
        ) : (
          <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
      </Button>
    </Card>
  )
}
