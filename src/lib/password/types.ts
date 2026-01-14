export const DEFAULT_LENGTH = 16
export const MIN_LENGTH = 5
export const MAX_LENGTH = 128

export const DEFAULT_OPTIONS: GeneratorOptions = {
  upper: true,
  lower: true,
  number: true,
  special: true,
  avoidAmbiguous: false,
  avoidRepeated: true,
  avoidSequences: true,
  minNumbers: 1,
  minSpecial: 1
}

export const DEFAULT_SETTINGS = {
  strength: true,
  crackTime: true
}

export type SettingType = 'strength' | 'crackTime'

export type DisplaySettings = {
  strength: boolean
  crackTime: boolean
}

export interface GeneratorOptions {
  upper: boolean
  lower: boolean
  number: boolean
  special: boolean
  avoidAmbiguous: boolean
  avoidRepeated: boolean
  avoidSequences: boolean
  minNumbers: number
  minSpecial: number
}

export const OPTION_KEYS = {
  UPPER: 'upper',
  LOWER: 'lower',
  NUMBER: 'number',
  SPECIAL: 'special',
  AMBIGUOUS: 'avoidAmbiguous',
  REPEATED: 'avoidRepeated',
  SEQUENCES: 'avoidSequences',
  MIN_NUMBERS: 'minNumbers',
  MIN_SPECIAL: 'minSpecial'
} as const

export interface PasswordSuggestion {
  id: string
  message: string
}

export type OnOptionChange = (_key: keyof GeneratorOptions, _value: boolean | number) => void
