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
    <Card variant="secondary" padding="sm" className="bg-surface/30 flex items-center justify-between border-white/5">
      <span className="text-text-subtle truncate pr-4 font-mono text-sm select-all">{pw}</span>

      <Tooltip content="Copy password">
        <Button variant="ghost" size="icon" onClick={() => handleCopy(pw)}>
          {copied ? (
            <Check className="animate-check-in h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
          )}
        </Button>
      </Tooltip>
    </Card>
  )
}
