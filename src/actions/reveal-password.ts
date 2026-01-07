'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { decrypt } from '@/lib/encryption'

export async function revealPassword(loginId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'No autorizado' }
  }

  const login = await prisma.savedLogin.findUnique({
    where: {
      id: loginId,
      userId: session.user.id
    }
  })

  if (!login) {
    return { error: 'Credencial no encontrada' }
  }

  try {
    const decryptedPassword = decrypt(login.password)
    return { password: decryptedPassword }
  } catch (error) {
    return { error: 'Error al desencriptar' }
  }
}
