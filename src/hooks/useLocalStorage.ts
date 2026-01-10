'use client'

import { useCallback, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error leyendo localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((_val: T) => T)) => {
      try {
        setStoredValue(prev => {
          const valueToStore = value instanceof Function ? value(prev) : value

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }

          return valueToStore
        })
      } catch (error) {
        console.error(`Error saving localStorage key "${key}":`, error)
      }
    },
    [key]
  )

  return [storedValue, setValue] as const
}
