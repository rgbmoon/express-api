import { z } from 'zod'

export const userSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(3),
  isAdmin: z.boolean(),
})

export const userDeleteSchema = z.object({
  id: z.string().min(1),
})
