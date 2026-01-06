'use client'

import dynamic from 'next/dynamic'

const ValidatortorCard = dynamic(() => import('@/features/password-validator/ValidatorCard'), {
  ssr: false
})

export default function PasswordValidatorPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ValidatortorCard />
    </div>
  )
}
