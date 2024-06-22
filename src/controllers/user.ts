import { Request, Response } from 'express'
import { User } from '../models/user.js'
import {
  UserCreateRequestBody,
  UserGetRequestBody,
  userUpdateRequestBody,
} from '../schemas/user.js'
import { StatusCodes } from 'http-status-codes'

interface UserCreateRequest extends Request {
  body: UserCreateRequestBody
}
interface UserUpdateRequest extends Request {
  params: { id: string }
  body: userUpdateRequestBody
}
interface UserDeleteRequest extends Request {
  params: { id: string }
}
interface UserGetRequest extends Request {
  params: { id: string }
  body: UserGetRequestBody
}

export const userCreate = async (req: UserCreateRequest, res: Response) => {
  const { firstName, email, isAdmin, lastName } = req.body

  // TODO: temporary, change to migration
  await User.sync({ force: false })

  const [user, isCreated] = await User.findOrCreate({
    where: { email },
    defaults: { firstName, email, isAdmin, lastName },
  })

  if (!isCreated) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Email ${email} занят другим пользователем` })
  }

  // TODO: handle incoming password

  res.json(user)
}

export const userUpdate = async (req: UserUpdateRequest, res: Response) => {
  const {
    params: { id },
    body,
  } = req

  const user = await User.findByPk(id)

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Пользователь не найден` })
  }

  const overlapUser = await User.findOne({
    where: { email: body.email },
  })

  if (overlapUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Email ${body.email} занят другим пользователем` })
  }

  await user.update(body)
  await user.save()

  res.json(user)
}

export const userDelete = async (req: UserDeleteRequest, res: Response) => {
  const {
    params: { id },
  } = req

  const user = await User.findByPk(id)

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Пользователь не найден` })
  }

  await user.destroy()

  res.json({
    message: 'success',
  })
}

export const userGet = async (req: UserGetRequest, res: Response) => {
  const {
    params: { id },
  } = req

  // TODO: change to default filters/sort
  if (id) {
    const user = await User.findByPk(id)

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Пользователь не найден` })
    }

    return res.json(user)
  }

  const users = await User.findAll()

  res.json(users)
}
