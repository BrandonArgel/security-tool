'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button, Tooltip } from '@/components/ui'
import { cn } from '@/lib'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="h-9 w-9 rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className={cn('scale-100 rotate-0 transition-all', `${isDark ? 'dark:scale-0 dark:-rotate-90' : ''}`)} />
        <Moon
          className={cn('absolute scale-0 rotate-90 transition-all', `${isDark ? 'dark:scale-100 dark:rotate-0' : ''}`)}
        />
      </Button>
    </Tooltip>
  )
}
