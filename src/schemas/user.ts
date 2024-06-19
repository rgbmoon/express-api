import { z } from 'zod'

export type UserRequestBody = z.infer<typeof userSchema>

export type UserDeleteRequestBody = z.infer<typeof userDeleteSchema>

export const userSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
  isAdmin: z.boolean(),
})

export const userDeleteSchema = z.object({
  id: z.string().min(1),
})
