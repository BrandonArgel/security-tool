import { getPerfectlySecureRandomNumber } from '@/lib/randomNumber'
import { CHARACTER_SETS, PasswordConfig } from './constants'

const getRandomChar = (str: string) => str[getPerfectlySecureRandomNumber(0, str.length - 1)]

const filterAmbiguous = (str: string) =>
  str
    .split('')
    .filter(c => !CHARACTER_SETS.ambiguous.includes(c))
    .join('')

export const generatePassword = (config: PasswordConfig): string => {
  let upper: string = CHARACTER_SETS.upper
  let lower: string = CHARACTER_SETS.lower
  let number: string = CHARACTER_SETS.number
  const special = CHARACTER_SETS.special

  if (config.avoidAmbiguous) {
    upper = filterAmbiguous(upper)
    lower = filterAmbiguous(lower)
    number = filterAmbiguous(number)
  }

  const sets = { upper, lower, number, special }
  const passwordArr: string[] = []
  let pool = ''

  // Pool construction and minimums
  if (config.number) {
    for (let i = 0; i < config.minNumbers; i++) passwordArr.push(getRandomChar(sets.number))
    pool += sets.number
  }
  if (config.special) {
    for (let i = 0; i < config.minSpecial; i++) passwordArr.push(getRandomChar(sets.special))
    pool += sets.special
  }
  if (config.upper) {
    passwordArr.push(getRandomChar(sets.upper))
    pool += sets.upper
  }
  if (config.lower) {
    passwordArr.push(getRandomChar(sets.lower))
    pool += sets.lower
  }

  if (!pool) return ''

  // Filling
  while (passwordArr.length < config.length) {
    passwordArr.push(getRandomChar(pool))
  }

  // Shuffle and Correction
  return shuffleAndFix(passwordArr, config)
}

const shuffleAndFix = (arr: string[], config: PasswordConfig): string => {
  const result = [...arr]

  // Fisher-Yates
  for (let i = result.length - 1; i > 0; i--) {
    const j = getPerfectlySecureRandomNumber(0, i)
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  // Business rule adjustments
  let corrections = 0
  while (corrections < 5) {
    let hasIssues = false
    for (let i = 0; i < result.length; i++) {
      const isSeq = config.avoidSequences && isSequenceAt(result, i)
      const isRep = config.avoidRepeated && i > 0 && result[i] === result[i - 1]

      if (isSeq || isRep) {
        hasIssues = true
        const swapIdx = (i + Math.floor(result.length / 2)) % result.length
        ;[result[i], result[swapIdx]] = [result[swapIdx], result[i]]
      }
    }
    if (!hasIssues) break
    corrections++
  }

  return result.join('')
}

const isSequenceAt = (arr: string[], i: number): boolean => {
  if (i < 2) return false
  const codes = [arr[i - 2], arr[i - 1], arr[i]].map(c => c.charCodeAt(0))
  return (
    (codes[1] === codes[0] + 1 && codes[2] === codes[1] + 1) || (codes[1] === codes[0] - 1 && codes[2] === codes[1] - 1)
  )
}
