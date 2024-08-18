import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models/user.js'

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { userId },
    } = req

    // TODO get userId from JWT token instead of userId

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `User not found` })
    }

    if (!user.isAdmin) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: `Forbidden` })
    }

    next()
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
