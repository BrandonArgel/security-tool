export const CHARACTER_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  number: '0123456789',
  special: '!@#$%^&*',
  ambiguous: 'lI1O0oS5B82Z'
} as const

export interface PasswordConfig {
  length: number
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
