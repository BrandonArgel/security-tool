'use client'
import { toast } from 'sonner'
import { Copy, Check } from 'lucide-react'
import { Button, Card, Tooltip } from '@/components/ui'
import { useClipboard } from '@/hooks'

interface HistoryItemProps {
  pw: string
}

export const HistoryItem = ({ pw }: HistoryItemProps) => {
  const { copied, copy } = useClipboard()

  const handleCopy = (text: string) => {
    copy(text)
    toast.success('Copiado al portapapeles')
  }

  return (
    <Card variant="secondary" padding="sm" className="flex justify-between items-center border-white/5 bg-surface/30">
      <span className="font-mono text-sm truncate pr-4 text-gray-300">{pw}</span>

      <Tooltip content="Copy password">
        <Button variant="ghost" size="icon" onClick={() => handleCopy(pw)}>
          {copied ? (
            <Check className="w-4 h-4 text-green-500 animate-check-in" />
          ) : (
            <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
          )}
        </Button>
      </Tooltip>
    </Card>
  )
}
