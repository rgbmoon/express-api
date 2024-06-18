import { Request, Response } from 'express'

// TODO: requset body typing

export const login = ({ body }: Request, res: Response) => {
  // TODO: complete auth

  res.json({
    token: 'fake-temporary-token',
    data: body,
  })
}

export const logout = (_req: Request, res: Response) => {
  res.json({
    message: 'logged out',
  })
}
