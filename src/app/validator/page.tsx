'use client'

import { ValidatorCard } from '@/features/password-validator/ValidatorCard'

export default function PasswordValidatorPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ValidatorCard />
    </div>
  )
}
