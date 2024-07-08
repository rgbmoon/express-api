import { z } from 'zod'

export type LoginRequestBody = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})
