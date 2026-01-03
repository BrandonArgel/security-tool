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
    <div className="flex items-center justify-center p-4 min-h-100">
      <Card variant="default" className="max-w-md mx-auto text-center border-red-500/20 shadow-xl">
        <div className="text-red-500 mb-4 text-4xl" role="img" aria-label="Warning">
          ⚠️
        </div>
        <h2 className="text-xl font-bold mb-2 text-white">Something went wrong</h2>
        <p className="text-gray-400 text-sm mb-6">
          {error.message || 'An unexpected error occurred while processing the data.'}
        </p>
        <Button onClick={handleReset} variant="primary" className="w-full sm:w-auto">
          Try again
        </Button>
      </Card>
    </div>
  )
}
