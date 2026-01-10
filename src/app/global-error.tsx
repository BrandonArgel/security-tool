'use client'

import { startTransition } from 'react'

interface GlobalErrorProps {
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  const handleReset = () => {
    startTransition(() => {
      reset()
    })
  }

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-black">CRITICAL_ERROR</h1>
          <button
            onClick={handleReset}
            className="text-primary font-mono underline transition-colors hover:text-foreground"
          >
            REBOOT_SYSTEM
          </button>
        </div>
      </body>
    </html>
  )
}
