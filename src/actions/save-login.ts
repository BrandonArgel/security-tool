'use server' // ¡Importante!

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { savedLoginSchema } from '@/lib'
import { encrypt } from '@/lib/encryption'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createSavedLogin(values: z.infer<typeof savedLoginSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'Not authorized' }
  }

  const validatedFields = savedLoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { url, username, password, siteName } = validatedFields.data

  try {
    const encryptedPassword = encrypt(password)

    await prisma.savedLogin.create({
      data: {
        userId: session.user.id,
        url,
        username,
        siteName,
        password: encryptedPassword
      }
    })

    revalidatePath('/vault')

    return { success: 'Saved successfully' }
  } catch (error) {
    console.error('Error saving login:', error)
    return { error: 'Error saving to the database' }
  }
}
