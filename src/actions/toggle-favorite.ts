'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const toggleFavorite = async (id: string) => {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    return { error: 'Unauthorized' }
  }

  try {
    const login = await prisma.savedLogin.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!login) {
      return { error: 'Login not found' }
    }

    const updatedLogin = await prisma.savedLogin.update({
      where: { id },
      data: { isFavorite: !login.isFavorite }
    })

    revalidatePath('/vault')
    return { success: true, isFavorite: updatedLogin.isFavorite }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return { error: 'Failed to update favorite status' }
  }
}
