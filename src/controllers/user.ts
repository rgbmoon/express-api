import { Request, Response } from 'express'
import { User } from '../models/user.js'
import {
  UserCreateRequestBody,
  UserGetRequestBody,
  userUpdateRequestBody,
} from '../schemas/user.js'
import { StatusCodes } from 'http-status-codes'
import { BaseQueryParams } from '../types/shared.js'

interface UserCreateRequest extends Request {
  body: UserCreateRequestBody
}
interface UserUpdateRequest extends Request {
  body: userUpdateRequestBody
  params: { id: string }
}
interface UserDeleteRequest extends Request {
  params: { id: string }
}
interface UserGetRequest extends Request {
  body: UserGetRequestBody
  params: { id: string }
  query: BaseQueryParams
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
    query: { limit, offset },
  } = req

  if (id) {
    const user = await User.findByPk(id)

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Пользователь не найден` })
    }

    return res.json(user)
  }

  // TODO: bind order typing to model
  // const orderConditions: Order = Object.keys(order ?? {}).map((key) => {
  //   return [key, order![key as keyof typeof order]]
  // })

  // TODO: body mapper helper for search & filters

  // TODO: make filters typing
  // const filtersConditions = Object.keys(filters ?? {}).reduce((acc, key) => {
  //   console.log(filters?.[key as keyof typeof filters])
  //   // acc[key] = filters?.[key as keyof typeof filters]
  //   return acc
  // }, {} as WhereOptions)

  // if (search) {
  //   filtersConditions[typeof Op.or] = [
  //     { firstName: { [Op.iLike]: `%${search}%` } },
  //     { lastName: { [Op.iLike]: `%${search}%` } },
  //     { email: { [Op.iLike]: `%${search}%` } },
  //   ]
  // }

  const users = await User.findAll({
    // order: orderConditions,
    // where: filtersConditions,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  })

  res.json(users)
}
