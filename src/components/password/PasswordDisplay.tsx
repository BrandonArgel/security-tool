'use client'

import { toast } from 'sonner'
import { Copy, Check, RefreshCcwDot } from 'lucide-react'
import { Button, Card, Tooltip } from '@/components/ui'
import { useClipboard } from '@/hooks'
import { cn } from '@/lib'

interface PasswordDisplayProps {
  password: string
  onRegenerate: () => void
}

export const PasswordDisplay = ({ password, onRegenerate }: PasswordDisplayProps) => {
  const { copied, copy } = useClipboard()

  const handleCopy = (text: string) => {
    if (!text) return
    copy(text)
    toast.success('Password copied to clipboard')
  }

  return (
    <Card variant="secondary" padding="sm" className="mb-6 flex justify-between items-center gap-4 group min-h-16">
      <span
        className={`font-password text-lg break-all ${!password ? 'text-text-muted italic' : 'text-white font-medium'}`}
      >
        {password || 'Select options to generate...'}
      </span>

      <div className="flex items-center gap-2">
        <Tooltip content="Regenerate password">
          <Button variant="ghost" size="icon" onClick={onRegenerate} disabled={!password}>
            <RefreshCcwDot className="w-4 h-4 transition-transform group-hover:rotate-180 duration-250" />
          </Button>
        </Tooltip>

        <Tooltip content="Copy password to clipboard">
          <Button
            variant="ghost"
            size="icon"
            className={cn(copied && 'animate-copy-pop')}
            onClick={() => handleCopy(password)}
            disabled={!password}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500 animate-check-in" />
            ) : (
              <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
            )}
          </Button>
        </Tooltip>
      </div>
    </Card>
  )
}
