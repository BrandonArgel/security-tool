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
      <body className="bg-[#0a0f1a] text-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">CRITICAL_ERROR</h1>
          <button onClick={handleReset} className="text-primary underline font-mono hover:text-white transition-colors">
            REBOOT_SYSTEM
          </button>
        </div>
      </body>
    </html>
  )
}
