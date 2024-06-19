import { User } from '@/models/user'
import { UserDeleteRequestBody, UserRequestBody } from '@/schemas/user'
import { Request, Response } from 'express'

interface UserCreateRequest extends Request {
  body: UserRequestBody
}

interface UserUpdateRequest extends Request {
  body: Partial<UserRequestBody>
}

interface UserDeleteRequest extends Request {
  body: UserDeleteRequestBody
}

export const userCreate = async (req: UserCreateRequest, res: Response) => {
  const {} = req.body

  const user = await User.create()
  console.log(user)

  res.json(user)
}

export const userGet = (_req: Request, res: Response) => {
  res.json({
    message: 'userGet not implemted',
  })
}

export const userUpdate = (_req: UserUpdateRequest, res: Response) => {
  res.json({
    message: 'userUpdate not implemted',
  })
}

export const userDelete = (_req: UserDeleteRequest, res: Response) => {
  res.json({
    message: 'userDelete not implemted',
  })
}
