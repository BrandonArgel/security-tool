import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function VaultPage() {
  const session = await auth()

  if (!session) {
    redirect('/login?callbackUrl=/vault')
  }

  const users = await prisma.user.findMany()

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Secret Vault</h1>
      <ol className="list-decimal list-inside text-lg">
        {users.map((user) => (
          <li key={user.id} className="mb-2 text-primary">
            {user.name || user.email}
          </li>
        ))}
      </ol>
    </div>
  )
}
