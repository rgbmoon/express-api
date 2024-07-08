import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/api.js'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      headers: { authorization },
    } = req

    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Not authorized' })
    }

    try {
      jwt.verify(authorization, JWT_SECRET!)
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Invalid token' })
    }

    next()
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
