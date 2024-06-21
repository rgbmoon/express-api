import { z } from 'zod'

export type UserCreateRequestBody = z.infer<typeof userCreateSchema>
export type userUpdateRequestBody = z.infer<typeof userUpdateSchema>
export type UserGetRequestBody = z.infer<typeof userGetSchema>

export const userCreateSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  isAdmin: z.boolean(),
  lastName: z.string().min(1).optional(),
  // TODO: make file upload middleware
  // img: z.string().optional(),
})

export const userUpdateSchema = userCreateSchema.partial()

// TODO: make search and pagination params in shared schema and implement here
// Plus make filters and sort
export const userGetSchema = z.object({
  id: z.string().optional(),
})
