'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

type CopiedValue = string | null
type CopyFn = (_text: string) => Promise<boolean>
type CopyError = Error | null

export function useCopyToClipboard(timeout: number = 2000): [CopiedValue, CopyFn, CopyError] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const [error, setError] = useState<CopyError>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy: CopyFn = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        setError(new Error('Clipboard API not supported'))
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        setError(null)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setCopiedText(null)
        }, timeout)

        return true
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        } else {
          setError(new Error('Failed to copy to clipboard'))
        }
        setCopiedText(null)
        return false
      }
    },
    [timeout]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [copiedText, copy, error]
}
