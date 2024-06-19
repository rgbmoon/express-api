import express from 'express'
import { login, logout } from './controllers/session'

import { validate } from './middlewares/validation'
import { loginSchema } from './schemas/session'
import {
  userCreateSchema,
  userDeleteSchema,
  userGetSchema,
  userUpdateSchema,
} from './schemas/user'

import { userCreate, userDelete, userGet, userUpdate } from './controllers/user'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)
router.get('/logout', logout)

// User routes
router.post('/user', validate(userCreateSchema), userCreate)
router.get('/user', validate(userGetSchema), userGet)
router.put('/user', validate(userUpdateSchema), userUpdate)
router.delete('/user', validate(userDeleteSchema), userDelete)
