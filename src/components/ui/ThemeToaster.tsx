'use client'

import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

export function ThemeToaster() {
  const { theme = 'system' } = useTheme()

  return <Toaster position="bottom-right" richColors theme={theme as 'light' | 'dark' | 'system'} />
}
