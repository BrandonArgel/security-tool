'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { decrypt } from '@/lib/encryption'

export async function revealPassword(loginId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'Not authorized' }
  }

  const login = await prisma.savedLogin.findUnique({
    where: {
      id: loginId,
      userId: session.user.id
    }
  })

  if (!login) {
    return { error: 'Credential not found' }
  }

  try {
    const decryptedPassword = decrypt(login.password)
    return { password: decryptedPassword }
  } catch (error) {
    return { error: `Error decrypting password: ${error instanceof Error ? error.message : String(error)}` }
  }
}
