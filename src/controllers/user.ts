import { User } from '@/models/user'
import {
  UserDeleteRequestBody,
  UserCreateRequestBody,
  UserGetRequestBody,
} from '@/schemas/user'
import { Request, Response } from 'express'

interface UserCreateRequest extends Request {
  body: UserCreateRequestBody
}
interface UserUpdateRequest extends Request {
  body: UserUpdateRequest
}
interface UserDeleteRequest extends Request {
  body: UserDeleteRequestBody
}
interface UserGetRequest extends Request {
  body: UserGetRequestBody
}

export const userCreate = async (_req: UserCreateRequest, res: Response) => {
  const user = await User.create()
  console.log(user)

  res.json(user)
}

export const userUpdate = (_req: UserUpdateRequest, res: Response) => {
  res.json({
    message: 'userUpdate not implemented',
  })
}

export const userDelete = (_req: UserDeleteRequest, res: Response) => {
  res.json({
    message: 'userDelete not implemented',
  })
}

export const userGet = (_req: UserGetRequest, res: Response) => {
  res.json({
    message: 'userGet not implemented',
  })
}
