import { Request, Response } from 'express'

export const getTest = (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World',
  })
}

export const getAnotherTest = (_req: Request, res: Response) => {
  res.json({
    message: 'Another test route',
  })
}
