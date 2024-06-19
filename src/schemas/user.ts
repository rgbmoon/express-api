import { z } from 'zod'

export type UserCreateRequestBody = z.infer<typeof userCreateSchema>
export type userUpdateRequestBody = z.infer<typeof userUpdateSchema>
export type UserDeleteRequestBody = z.infer<typeof userDeleteSchema>
export type UserGetRequestBody = z.infer<typeof userGetSchema>

export const userCreateSchema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4).optional(),
  email: z.string().email().optional(),
  // TODO: make file upload middleware
  // img: z.string().optional(),
  password: z.string().min(4),
  isAdmin: z.boolean(),
})

export const userUpdateSchema = userCreateSchema.partial()

export const userDeleteSchema = z.object({
  id: z.string(),
})

export const userGetSchema = z.object({
  id: z.string().optional(),
})
