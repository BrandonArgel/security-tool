import { z } from 'zod'

export const savedLoginSchema = z.object({
  url: z.url({ message: 'Invalid URL format' }).describe('The URL of the site'),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  siteName: z.string().optional()
})

export type SavedLoginValues = z.infer<typeof savedLoginSchema>
