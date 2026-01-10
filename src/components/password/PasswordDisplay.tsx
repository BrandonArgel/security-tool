'use client'

import { toast } from 'sonner'
import { Copy, Check, RefreshCcwDot } from 'lucide-react'
import { Button, Card, Tooltip } from '@/components/ui'
import { useCopyToClipboard } from '@/hooks'
import { cn } from '@/lib'

interface PasswordDisplayProps {
  password: string
  onRegenerate: () => void
}

export const PasswordDisplay = ({ password, onRegenerate }: PasswordDisplayProps) => {
  const [copied, copy, error] = useCopyToClipboard()

  const handleCopy = async (text: string) => {
    if (!text) return
    const result = await copy(text)
    if (result) {
      toast.success('Password copied to clipboard')
    } else if (error) {
      toast.error(`Error: ${error.message}`)
    }
  }

  return (
    <Card
      variant="secondary"
      padding="sm"
      className="mb-6 flex items-center justify-between gap-4"
      disabled={!password}
    >
      <span
        className={`font-password text-lg break-all select-all ${!password ? 'text-foreground/50 italic' : 'text-foreground font-medium'}`}
      >
        {password || 'Select options...'}
      </span>

      <div className="flex items-center gap-2">
        <Tooltip content="Regenerate password">
          <Button variant="ghost" size="icon" onClick={onRegenerate} disabled={!password}>
            <RefreshCcwDot className="h-4 w-4 transition-transform duration-250 group-hover:rotate-180" />
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
              <Check className="animate-check-in h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
            )}
          </Button>
        </Tooltip>
      </div>
    </Card>
  )
}
