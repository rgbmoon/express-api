import { Request, Response, NextFunction } from 'express'
import {
  UnknownKeysParam,
  ZodError,
  ZodIssue,
  ZodObject,
  ZodRawShape,
} from 'zod'

import { StatusCodes } from 'http-status-codes'

export const validate = (schema: ZodObject<ZodRawShape, UnknownKeysParam>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid input data', details: errorMessages })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' })
      }
    }
  }
}
