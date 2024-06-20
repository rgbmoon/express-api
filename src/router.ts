import express from 'express'
import { login, logout } from './controllers/session'

import { validate } from './middlewares/validation'
import { loginSchema } from './schemas/session'
import {
  userCreateSchema,
  userGetSchema,
  userUpdateSchema,
} from './schemas/user'

import { userCreate, userDelete, userGet, userUpdate } from './controllers/user'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)
router.get('/logout', logout)

// User routes
router.post('/users', validate(userCreateSchema), userCreate)
router.put('/users/:id', validate(userUpdateSchema), userUpdate)
router.delete('/users/:id', userDelete)
router.get('/users/:id?', validate(userGetSchema), userGet)
