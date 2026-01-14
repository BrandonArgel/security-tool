'use client'

import { useState } from 'react'

export const useActivityMode = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial)

  return [isOpen ? 'visible' : 'hidden', () => setIsOpen(!isOpen), isOpen] as const
}
