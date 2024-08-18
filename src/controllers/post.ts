import { Request, Response } from 'express'
import { Post } from '../models/post.js'
import {
  PostCreateRequestBody,
  PostGetRequestBody,
  PostUpdateRequestBody,
} from '../schemas/post.js'
import { StatusCodes } from 'http-status-codes'
import { BaseQueryParams } from '../types/shared.js'
import { Op, Order, WhereOptions } from 'sequelize'
import { User } from '../models/user.js'

interface PostCreateRequest extends Request {
  body: PostCreateRequestBody
}
interface PostUpdateRequest extends Request {
  body: PostUpdateRequestBody
  params: { id: string }
}
interface PostDeleteRequest extends Request {
  params: { id: string }
}
interface PostGetRequest extends Request {
  body: PostGetRequestBody
  params: { id: string }
  query: BaseQueryParams
}

export const postCreate = async (req: PostCreateRequest, res: Response) => {
  const {
    body: { userId, title, description, blocks },
  } = req

  // TODO: temporary, change to migration
  await Post.sync({ force: false })

  const user = await User.findByPk(userId)

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Пользователь userId:${userId} не найден` })
  }

  const post = await Post.create({ userId, title, description, blocks })

  return res.json(post)
}

export const postUpdate = async (req: PostUpdateRequest, res: Response) => {
  const {
    params: { id },
    body,
  } = req

  const post = await Post.findByPk(id)

  if (!post) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Запись не найдена` })
  }

  const user = await User.findByPk(body.userId)

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Пользователь userId:${id} не найден` })
  }

  await post.update(body)

  return res.json(post)
}

export const postDelete = async (req: PostDeleteRequest, res: Response) => {
  const {
    params: { id },
  } = req

  const post = await Post.findByPk(id)

  if (!post) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Запись не найдена` })
  }

  await post.destroy()

  return res.json({
    message: `post ${post.id} deleted`,
  })
}

export const postGet = async (req: PostGetRequest, res: Response) => {
  const {
    query: { search, limit, offset },
    body: { order, filters },
  } = req

  const orderConditions: Order = Object.keys(order ?? {}).map((key) => {
    return [key, order![key as keyof typeof order]]
  })

  // TODO: type filters through all project
  const filtersConditions: WhereOptions = {}

  if (filters) {
    if (filters.userId) filtersConditions['userId'] = filters.userId
    if (filters.id) filtersConditions['id'] = filters.id
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
    // TODO: test search
    filtersConditions['title'] = { [Op.iLike]: `%${search}%` }
  }

  const posts = await Post.findAll({
    order: orderConditions,
    where: filtersConditions,
    // TODO: test pagination
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  })

  return res.json(posts)
}
