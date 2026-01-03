import { useMemo, useEffect, useRef, useCallback, useState } from 'react'
import { useDebounce, useLocalStorage } from '@/hooks'
import {
  getSecurityLevelByTime,
  getSecurityLevelByScore,
  getStrengthScore,
  getTimeToCrack,
  getPasswordFeedback
} from '../utils/metrics'
import { generatePassword } from '../utils/generator'
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
  const [length, setLength] = useState<number>(() => {
    const saved = localStorage.getItem('pw_length')
    return saved ? Number(saved) : 16
  })
  const [password, setPassword] = useState<string>('')

  const [, setSavedLength] = useLocalStorage<number>('pw_length', 16)
  const [history, setHistory] = useLocalStorage<string[]>('pw_history', [])
  const [options, setOptions] = useLocalStorage<GeneratorOptions>('pw_generatorOptions', DEFAULT_OPTIONS)
  const [displaySettings, setDisplaySettings] = useLocalStorage<DisplaySettings>('pw_displaySettings', DEFAULT_SETTINGS)

  const debouncedLength = useDebounce(length, 500)
  const lastPassword = useRef<string>('')

  const regenerate = useCallback(() => {
    const absoluteMin = Math.max(MIN_LENGTH, options.minNumbers + options.minSpecial)
    const validLength = Math.max(length, absoluteMin)
    setPassword(generatePassword({ length: validLength, ...options }))
  }, [length, options])

  useEffect(() => {
    setSavedLength(debouncedLength)

    const absoluteMin = Math.max(MIN_LENGTH, options.minNumbers + options.minSpecial)
    const timer = setTimeout(() => {
      if (debouncedLength >= absoluteMin) {
        setPassword(generatePassword({ length: debouncedLength, ...options }))
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [debouncedLength, options, setSavedLength])

  // --- Synchronization of History ---
  useEffect(() => {
    if (!password) return

    if (password !== lastPassword.current) {
      const passwordToStore = lastPassword.current

      if (passwordToStore) {
        setHistory((prev) => {
          if (prev[0] === passwordToStore) return prev
          return [passwordToStore, ...prev].slice(0, 5)
        })
      }
      lastPassword.current = password
    }
  }, [password, setHistory])

  // --- Handlers ---
  const handleLengthChange = (val: number) => {
    if (!isNaN(val)) setLength(val)
  }

  const handleMinNumbersChange = (val: number) => {
    setOptions((prev) => {
      const newOptions = { ...prev, minNumbers: val }
      const totalMins = val + prev.minSpecial
      if (totalMins > length) setLength(totalMins)
      return newOptions
    })
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

  const score = useMemo(() => getStrengthScore(password), [password])
  const crackTime = useMemo(() => getTimeToCrack(password), [password])
  const suggestions = useMemo(() => getPasswordFeedback(password), [password])
  const securityLevel = useMemo(() => getSecurityLevelByTime(crackTime), [crackTime])
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
    suggestions,
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
