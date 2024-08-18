import { z } from 'zod'
import { filtersBaseSchema, orderBaseSchema } from './shared.js'

export type PostCreateRequestBody = z.infer<typeof postCreateSchema>
export type PostUpdateRequestBody = z.infer<typeof postUpdateSchema>
export type PostGetRequestBody = z.infer<typeof postGetSchema>

export const postCreateSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string().optional(),
  blocks: z.array(
    z.object({
      type: z.enum(['paragraph', 'quote']),
      order: z.number(),
      content: z.string(),
    })
  ),
})

export const postUpdateSchema = postCreateSchema.partial()

export const postGetSchema = z.object({
  filters: filtersBaseSchema
    .and(
      z.object({
        id: z.number().optional(),
        userId: z.number().optional(),
      })
    )
    .optional(),
  order: orderBaseSchema.optional(),
})
