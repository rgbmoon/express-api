import { z } from 'zod'

export const rangeByTypeSchema = (type: 'date' | 'number' | 'string') => {
  const valueTypes = {
    date: z.coerce.date,
    number: z.number,
    string: z.string,
  }

  return z
    .object({
      from: valueTypes[type](),
      to: valueTypes[type](),
    })
    .partial()
}

export const filtersBaseSchema = z
  .object({
    createdAt: rangeByTypeSchema('date'),
    updatedAt: rangeByTypeSchema('date'),
  })
  .partial()

export const orderDirectionSchema = z.enum(['ASC', 'DESC'])

export const orderBaseSchema = z
  .object({
    createdAt: orderDirectionSchema,
    updatedAt: orderDirectionSchema,
  })
  .partial()
