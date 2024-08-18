import { z } from 'zod'
import { filtersBaseSchema, orderBaseSchema } from './shared.js'

export type UserCreateRequestBody = z.infer<typeof userCreateSchema>
export type UserUpdateRequestBody = z.infer<typeof userUpdateSchema>
export type UserGetRequestBody = z.infer<typeof userGetSchema>

export const userCreateSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  isAdmin: z.boolean(),
  lastName: z.string().min(1).optional(),
  img: z.string().optional(),
})

export const userUpdateSchema = userCreateSchema.partial()

export const userGetSchema = z.object({
  filters: filtersBaseSchema.optional(),
  order: orderBaseSchema.optional(),
})
