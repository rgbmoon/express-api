import { Request, Response } from 'express'
import { LoginRequestBody } from '../schemas/session.js'
import { compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/api.js'

interface LoginRequest extends Request {
  body: LoginRequestBody
}

export const login = async (req: LoginRequest, res: Response) => {
  const {
    body: { email, password },
  } = req

  const user = await User.scope('withPassword').findOne({
    where: { email },
  })

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Пользователь ${email} не найден` })
  }

  const match = await compare(password, user.passwordHash)

  if (!match) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: `Неверный пароль` })
  }

  const token = jwt.sign({ userId: user.userId }, JWT_SECRET!, {
    expiresIn: '6h',
  })

  return res.json({
    userId: user.userId,
    token,
  })
}

export const logout = (_req: Request, res: Response) => {
  return res.json({
    message: 'logged out',
  })
}
