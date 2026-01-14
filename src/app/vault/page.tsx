import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { VaultManager } from '@/features/vault/VaultManager'

export const dynamic = 'force-dynamic'

export default async function VaultPage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/vault')
  }

  const logins = await prisma.savedLogin.findMany({
    where: {
      userId: session.user.id
    },
    select: {
      id: true,
      siteName: true,
      username: true,
      url: true,
      createdAt: true,
      isFavorite: true
    },
    orderBy: {
      siteName: 'asc'
    }
  })

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">My Vault</h1>
        <p className="text-text-muted">Manage your secured credentials.</p>
      </div>

      <VaultManager logins={logins} />
    </div>
  )
}
