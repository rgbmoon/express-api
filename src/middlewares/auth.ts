import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/api.js'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      headers: { authorization },
    } = req

    const token = authorization?.split(' ')[1]

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Not authorized' })
    }

    try {
      jwt.verify(token, JWT_SECRET!)
      next()
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Invalid token' })
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
