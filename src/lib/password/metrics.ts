export type SecurityLevel = 'N/A' | 'low' | 'mid' | 'high' | 'safe'

/**
 * Evaluates if the password contains sequences of 3 or more consecutive characters
 */
const checkHasSequence = (password: string): boolean => {
  for (let i = 0; i < password.length - 2; i++) {
    const c1 = password.charCodeAt(i)
    const c2 = password.charCodeAt(i + 1)
    const c3 = password.charCodeAt(i + 2)

    const isAlphaNum = (code: number) =>
      (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)

    if (isAlphaNum(c1) && isAlphaNum(c2) && isAlphaNum(c3)) {
      if ((c2 === c1 + 1 && c3 === c2 + 1) || (c2 === c1 - 1 && c3 === c2 - 1)) {
        return true
      }
    }
  }
  return false
}

/**
 * Calculates a strength score for the given password, based on entropy and common patterns
 */
export const getStrengthScore = (password: string): number => {
  if (!password) return 0
  const length = password.length

  if (length < 8) return 1

  // Entropy Calculation
  let poolSize = 0
  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^A-Za-z0-9]/.test(password)) poolSize += 33

  const entropy = length * Math.log2(poolSize || 1)

  let score = 1
  if (entropy > 100) score = 5
  else if (entropy > 80) score = 4
  else if (entropy > 60) score = 3
  else if (entropy > 40) score = 2

  //Adjustments for Diversity and Patterns
  const types = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length

  // Bonus for using multiple character types
  if (types === 4 && length >= 12) score = Math.max(score, 4)

  // Penalties
  if (/(.)\1/.test(password)) score -= 1 // Consecutive repeated characters
  if (checkHasSequence(password)) score -= 1 // Sequences
  if (types <= 1) score = Math.min(score, 2) // Single character type

  return Math.max(1, Math.min(score, 5))
}

/**
 * Estimates the time required to crack the password using brute force
 */
export const getTimeToCrack = (password: string): string => {
  if (!password) return 'N/A'

  let charsetSize = 0
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 33

  const combinations = Math.pow(charsetSize, password.length)
  const attemptsPerSecond = 1_000_000_000_000 // 1 Trillion/sec (Modern GPU cluster)
  const seconds = combinations / attemptsPerSecond

  if (seconds < 1) return 'Instantly'
  if (seconds < 60) return `${Math.floor(seconds)} seconds`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`
  if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`
  if (seconds < 3153600000) return `${Math.floor(seconds / 31536000)} years`

  const centuries = Math.floor(seconds / 3153600000)
  return centuries < 1000 ? `${centuries} centuries` : 'Eons (Practically unbreakable)'
}

/**
 * Maps score or time to categorical levels (UI)
 */
export const getSecurityLevelByScore = (score: number): SecurityLevel => {
  if (score === 0) return 'N/A'
  if (score <= 2) return 'low'
  if (score === 3) return 'mid'
  if (score === 4) return 'high'
  return 'safe'
}

export const getSecurityLevelByTime = (time: string): SecurityLevel => {
  const t = time.toLowerCase()
  if (!time || t === 'n/a') return 'N/A'
  if (t.includes('sec') || t.includes('instan') || t.includes('min')) return 'low'
  if (t.includes('hour') || t.includes('day')) return 'mid'
  if (t.includes('year') && !t.includes('centur')) return 'high'
  return 'safe'
}

/**
 * Generates improvement suggestions for the user
 */
export const getPasswordFeedback = (password: string) => {
  if (!password) return []

  const requirements = [
    { id: 'length', label: 'Increase length (min. 16 characters)', met: password.length >= 16 },
    { id: 'upper', label: 'Include an uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'lower', label: 'Include a lowercase letter', met: /[a-z]/.test(password) },
    { id: 'number', label: 'Add a number', met: /[0-9]/.test(password) },
    { id: 'special', label: 'Use a special character', met: /[^A-Za-z0-9]/.test(password) },
    { id: 'repeated', label: 'Avoid consecutive characters', met: !/(.)\1/.test(password) },
    { id: 'sequence', label: 'Avoid character sequences (e.g. abc, 123)', met: !checkHasSequence(password) }
  ]

  return requirements.filter((req) => !req.met).map((req) => ({ id: req.id, message: req.label }))
}
