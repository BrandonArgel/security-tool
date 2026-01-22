'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button, Tooltip } from '@/components/ui'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Tooltip content={`${theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="relative h-9 w-9 rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

        <span className="sr-only">Toggle theme</span>
      </Button>
    </Tooltip>
  )
}
