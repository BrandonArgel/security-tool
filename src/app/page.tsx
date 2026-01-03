'use client'

import dynamic from 'next/dynamic'

const GeneratorCard = dynamic(() => import('@/features/password-generator/GeneratorCard'), {
  ssr: false
})

export default function PasswordGeneratorPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GeneratorCard />
      </div>
    </main>
  )
}
