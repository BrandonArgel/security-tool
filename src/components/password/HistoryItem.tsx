'use client'
import { toast } from 'sonner'
import { Copy, Check } from 'lucide-react'
import { Button, Card, Tooltip } from '@/components/ui'
import { useCopyToClipboard } from '@/hooks'

interface HistoryItemProps {
  pw: string
}

export const HistoryItem = ({ pw }: HistoryItemProps) => {
  const [copied, copy, error] = useCopyToClipboard()

  const handleCopy = async (text: string) => {
    const result = await copy(text)
    if (result) {
      toast.success('Copied to clipboard')
    } else if (error) {
      toast.error(`Error: ${error.message}`)
    }
  }

  return (
    <Card variant="secondary" padding="sm" className="flex justify-between items-center border-white/5 bg-surface/30">
      <span className="font-mono text-sm truncate pr-4 text-gray-300 select-all">{pw}</span>

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
