import { useMemo, useEffect, useRef, useCallback, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  generatePassword,
  getSecurityLevel,
  getSecurityLevelByScore,
  getStrength,
  getTimeToCrack
} from '../utils/password-utils'
import {
  GeneratorOptions,
  DisplaySettings,
  DEFAULT_OPTIONS,
  DEFAULT_SETTINGS,
  MIN_LENGTH,
  OnOptionChange
} from '../types'

export const useGenerator = () => {
  // --- Persistent States ---
  const [history, setHistory] = useLocalStorage<string[]>('pw_history', [])
  const [length, setLength] = useLocalStorage<number>('pw_length', 16)
  const [options, setOptions] = useLocalStorage<GeneratorOptions>('pw_generatorOptions', DEFAULT_OPTIONS)
  const [displaySettings, setDisplaySettings] = useLocalStorage<DisplaySettings>('pw_displaySettings', DEFAULT_SETTINGS)

  const [password, setPassword] = useState<string>('')

  const regenerate = useCallback(() => {
    const newPassword = generatePassword({ length, ...options })
    console.log('test')

    if (password) {
      setHistory((prev) => {
        if (prev[0] === password) return prev
        return [password, ...prev].slice(0, 5)
      })
    }

    setPassword(newPassword)
  }, [length, options, password, setHistory])

  useEffect(() => {
    if (!password) {
      regenerate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Generation Logic ---
  const isFirstRender = useRef(true)
  const lastDisplayedPassword = useRef<string>('')

  // --- Synchronization of History ---
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      lastDisplayedPassword.current = password
      return
    }

    if (password !== lastDisplayedPassword.current) {
      const passwordToStore = lastDisplayedPassword.current
      if (passwordToStore) {
        setHistory((prev) => {
          if (prev[0] === passwordToStore) return prev
          return [passwordToStore, ...prev].slice(0, 5)
        })
      }
      lastDisplayedPassword.current = password
    }
  }, [password, setHistory])

  // --- Handlers ---
  const handleLengthChange = (val: number) => {
    if (isNaN(val)) return
    const absoluteMin = Math.max(MIN_LENGTH, options.minNumbers + options.minSpecial)
    setLength(val < absoluteMin ? absoluteMin : val)
  }

  const handleMinNumbersChange = (val: number) => {
    const totalMins = val + options.minSpecial
    if (totalMins > length) setLength(totalMins)
    setOptions((prev) => ({ ...prev, minNumbers: val }))
  }

  const handleMinSpecialChange = (val: number) => {
    const totalMins = options.minNumbers + val
    if (totalMins > length) setLength(totalMins)
    setOptions((prev) => ({ ...prev, minSpecial: val }))
  }

  const handleOptionChange: OnOptionChange = (key, value) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleDisplay = (key: keyof DisplaySettings) => {
    setDisplaySettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const score = useMemo(() => getStrength(password), [password])
  const crackTime = useMemo(() => getTimeToCrack(password), [password])
  const securityLevel = useMemo(() => getSecurityLevel(crackTime), [crackTime])
  const securityLevelByScore = useMemo(() => getSecurityLevelByScore(score), [score])

  return {
    // Data
    password,
    history,
    length,
    options,
    displaySettings,
    score,
    crackTime,
    securityLevel,
    securityLevelByScore,
    // Handlers
    regenerate,
    handleLengthChange,
    handleMinNumbersChange,
    handleMinSpecialChange,
    handleOptionChange,
    toggleDisplay,
    clearHistory: () => setHistory([])
  }
}
