import { Request, Response } from 'express'

export const login = (_req: Request, res: Response) => {
  res.json({
    message: 'logged in',
  })
}

export const logout = (_req: Request, res: Response) => {
  res.json({
    message: 'logged out',
  })
}
