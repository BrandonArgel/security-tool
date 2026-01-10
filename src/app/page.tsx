'use client'

import dynamic from 'next/dynamic'

const GeneratorCard = dynamic(
  () => import('@/features/password-generator/GeneratorCard').then(mod => mod.GeneratorCard),
  {
    ssr: false
  }
)

export default function PasswordGeneratorPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <GeneratorCard />
    </div>
  )
}
