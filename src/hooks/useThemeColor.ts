'use client'

import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { StorageKeys } from '@/lib'

export type ThemeColor = 'blue' | 'green' | 'violet' | 'orange' | 'rose' | 'yellow'

export function useThemeColor() {
  const [color, setColor] = useLocalStorage<ThemeColor>(StorageKeys.THEME_COLOR, 'blue')

  useEffect(() => {
    const body = document.body

    const themes: ThemeColor[] = ['blue', 'green', 'violet', 'orange', 'rose', 'yellow']
    themes.forEach(t => body.classList.remove(`theme-${t}`))

    body.classList.add(`theme-${color}`)
  }, [color])

  return { color, setColor }
}
