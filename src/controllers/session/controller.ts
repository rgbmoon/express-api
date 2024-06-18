import { Request, Response } from 'express'

// TODO: requset body typing

export const login = (_req: Request, res: Response) => {
  // TODO: complete auth

  res.json({
    token: 'fake-temporary-token',
  })
}

export const logout = (_req: Request, res: Response) => {
  res.json({
    message: 'logged out',
  })
}
