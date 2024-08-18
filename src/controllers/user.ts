import { Request, Response } from 'express'
import { User } from '../models/user.js'
import {
  UserCreateRequestBody,
  UserGetRequestBody,
  UserUpdateRequestBody,
} from '../schemas/user.js'
import { StatusCodes } from 'http-status-codes'
import { BaseQueryParams } from '../types/shared.js'
import { Op, Order, WhereOptions } from 'sequelize'
import { hash } from 'bcrypt'

interface UserCreateRequest extends Request {
  body: UserCreateRequestBody
}
interface UserUpdateRequest extends Request {
  body: UserUpdateRequestBody
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
  const {
    body: { firstName, email, password, isAdmin, lastName },
    file,
  } = req

  // TODO: temporary, change to migration
  await User.sync({ force: false })

  const passwordHash = await hash(password, 10)

  const [user, isCreated] = await User.findOrCreate({
    where: { email },
    defaults: {
      firstName,
      email,
      passwordHash,
      isAdmin,
      lastName,
    },
  })

  if (!isCreated) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Email ${email} занят другим пользователем` })
  }

  if (file) {
    await user.update({ img: file.path })
  }

  // we need to reload instance to apply default user scope that excludes passwordHash field
  await user.reload()

  return res.json(user)
}

export const userUpdate = async (req: UserUpdateRequest, res: Response) => {
  const {
    params: { id },
    body,
    file,
  } = req

  const user = await User.findByPk(id)

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Пользователь не найден` })
  }

  const overlapUser = await User.findOne({
    where: { email: body.email ?? '' },
  })

  if (overlapUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Email ${body.email} занят другим пользователем` })
  }

  if (body.password) {
    const passwordHash = await hash(body.password, 10)
    await user.update({ passwordHash })
    // we need to reload instance to apply default user scope that excludes passwordHash field
    await user.reload()
  }

  if (file) {
    await user.update({ img: file.path })
  }

  await user.update(body)

  return res.json(user)
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

  return res.json({
    message: `user ${user.userId} deleted`,
  })
}

export const userGet = async (req: UserGetRequest, res: Response) => {
  const {
    params: { id },
    query: { search, limit, offset },
    body: { order, filters },
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

  const orderConditions: Order = Object.keys(order ?? {}).map((key) => {
    return [key, order![key as keyof typeof order]]
  })

  // TODO: type filters through all project
  const filtersConditions: WhereOptions = {}

  if (filters) {
    if (filters.createdAt) {
      filtersConditions['createdAt'] = {}
      if (filters.createdAt.from)
        filtersConditions['createdAt'][Op.gt] = filters.createdAt.from
      if (filters.createdAt.to)
        filtersConditions['createdAt'][Op.lt] = filters.createdAt.to
    }
    if (filters.updatedAt) {
      filtersConditions['updatedAt'] = {}
      if (filters.updatedAt.from)
        filtersConditions['updatedAt'][Op.gt] = filters.updatedAt.from
      if (filters.updatedAt.to)
        filtersConditions['updatedAt'][Op.lt] = filters.updatedAt.to
    }
  }

  if (search) {
    // TODO: fix Op as keys typing
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    filtersConditions[Op.or] = [
      { firstName: { [Op.iLike]: `%${search}%` } },
      { lastName: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ]
  }

  const users = await User.findAll({
    order: orderConditions,
    where: filtersConditions,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  })

  return res.json(users)
}
