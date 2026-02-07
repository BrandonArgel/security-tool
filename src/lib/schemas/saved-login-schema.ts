import { z } from 'zod'

const domainRegex =
  /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))(:\d+)?(\/.*)?$/

export const savedLoginSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'URL is required' })
    .regex(domainRegex, { message: 'Invalid website format' })
    .describe('The URL of the site'),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  siteName: z.string().optional()
})

export type SavedLoginValues = z.infer<typeof savedLoginSchema>
