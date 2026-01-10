'use client'

import { useEffect, startTransition } from 'react'
import { Button, Card } from '@components/ui'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Send error to Sentry o LogRocket
    console.error('Error caught by boundary:', error)
  }, [error])

  const handleReset = () => {
    startTransition(() => {
      reset()
    })
  }

  return (
    <div className="flex min-h-100 items-center justify-center p-4">
      <Card variant="default" className="mx-auto max-w-md border-red-500/20 text-center shadow-xl">
        <div className="mb-4 text-4xl text-red-500" role="img" aria-label="Warning">
          ⚠️
        </div>
        <h2 className="mb-2 text-xl font-bold text-foreground">Something went wrong</h2>
        <p className="mb-6 text-sm text-text-muted">
          {error.message || 'An unexpected error occurred while processing the data.'}
        </p>
        <Button onClick={handleReset} variant="primary" className="w-full sm:w-auto">
          Try again
        </Button>
      </Card>
    </div>
  )
}
