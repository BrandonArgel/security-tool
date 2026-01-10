import { useMemo, useEffect, useRef, useCallback, useState, useEffectEvent } from 'react'
import { useDebounce, useLocalStorage } from '@/hooks'
import {
  DEFAULT_OPTIONS,
  DEFAULT_SETTINGS,
  MIN_LENGTH,
  DisplaySettings,
  generatePassword,
  GeneratorOptions,
  getPasswordFeedback,
  getSecurityLevelByScore,
  getSecurityLevelByTime,
  getStrengthScore,
  getTimeToCrack,
  OnOptionChange,
  SettingType
} from '@/lib/password'
import { StorageKeys } from '@/lib/storageKeys'

export const useGenerator = () => {
  // --- Persistent States ---
  const [length, setLength] = useState<number>(() => {
    const saved = localStorage.getItem(StorageKeys.PW_LENGTH)
    return saved ? Number(saved) : 16
  })
  const [password, setPassword] = useState<string>('')

  const [, setSavedLength] = useLocalStorage<number>(StorageKeys.PW_LENGTH, 16)
  const [history, setHistory] = useLocalStorage<string[]>(StorageKeys.PW_HISTORY, [])
  const [options, setOptions] = useLocalStorage<GeneratorOptions>(StorageKeys.PW_GENERATOR_OPTIONS, DEFAULT_OPTIONS)
  const [displaySettings, setDisplaySettings] = useLocalStorage<DisplaySettings>(
    StorageKeys.PW_DISPLAY_SETTINGS,
    DEFAULT_SETTINGS
  )

  const debouncedLength = useDebounce(length, 300)
  const lastPassword = useRef<string>('')

  const handleAutoGenerate = useEffectEvent(() => {
    const absoluteMin = Math.max(MIN_LENGTH, options.minNumbers + options.minSpecial)

    if (debouncedLength >= absoluteMin) {
      setPassword(generatePassword({ length: debouncedLength, ...options }))
    }
  })

  const regenerate = useCallback(() => {
    const absoluteMin = Math.max(MIN_LENGTH, options.minNumbers + options.minSpecial)
    const validLength = Math.max(length, absoluteMin)
    setPassword(generatePassword({ length: validLength, ...options }))
  }, [length, options])

  useEffect(() => {
    setSavedLength(debouncedLength)

    handleAutoGenerate()
  }, [debouncedLength, options, setSavedLength])

  // --- Synchronization of History ---
  useEffect(() => {
    if (!password) return

    if (password !== lastPassword.current) {
      const passwordToStore = lastPassword.current

      if (passwordToStore) {
        setHistory(prev => {
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
    setOptions(prev => {
      const newOptions = { ...prev, minNumbers: val }
      const totalMins = val + prev.minSpecial
      if (totalMins > length) setLength(totalMins)
      return newOptions
    })
  }

  const handleMinSpecialChange = (val: number) => {
    const totalMins = options.minNumbers + val
    if (totalMins > length) setLength(totalMins)
    setOptions(prev => ({ ...prev, minSpecial: val }))
  }

  const handleOptionChange: OnOptionChange = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleDisplay = (key: SettingType) => {
    setDisplaySettings(prev => ({ ...prev, [key]: !prev[key] }))
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
