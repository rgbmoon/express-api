import { Request, Response } from 'express'
import { User } from 'src/models/user.js'
import { UserCreateRequestBody, UserGetRequestBody } from 'src/schemas/user.js'

interface UserCreateRequest extends Request {
  body: UserCreateRequestBody
}
interface UserUpdateRequest extends Request {
  body: UserUpdateRequest
}
interface UserGetRequest extends Request {
  body: UserGetRequestBody
}

// TODO:
// 1 - Finish creation and check user exists
// 2 - Finish other methods
// 3 - Test Finished Api

export const userCreate = async (req: UserCreateRequest, res: Response) => {
  const { firstName, email, isAdmin } = req.body

  // TODO: temporary, change to migration
  await User.sync({ force: false })

  const user = await User.create({ firstName, email, isAdmin })

  res.json(user)
}

export const userUpdate = (_req: UserUpdateRequest, res: Response) => {
  res.json({
    message: 'userUpdate not implemented',
  })
}

export const userDelete = (_req: Request, res: Response) => {
  res.json({
    message: 'userDelete not implemented',
  })
}

export const userGet = async (_req: UserGetRequest, res: Response) => {
  const users = await User.findAll()

  res.json(users)
}
