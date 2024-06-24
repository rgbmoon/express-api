import { z } from 'zod'

export const rangeByTypeSchema = (type: 'date' | 'number' | 'string') => {
  const valueTypes = {
    date: z.date,
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
    created: rangeByTypeSchema('date'),
    updated: rangeByTypeSchema('date'),
  })
  .partial()
