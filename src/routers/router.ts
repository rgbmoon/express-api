import express from 'express'

import { login, logout } from '../controllers/session.js'
import { validate } from '../middlewares/validation.js'
import { loginSchema } from '../schemas/session.js'
import {
  userCreateSchema,
  userGetSchema,
  userUpdateSchema,
} from '../schemas/user.js'
import {
  userCreate,
  userDelete,
  userGet,
  userUpdate,
} from '../controllers/user.js'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)
router.get('/logout', logout)

// User routes
router.post('/users', validate(userCreateSchema), userCreate)
router.put('/users/:id', validate(userUpdateSchema), userUpdate)
router.delete('/users/:id', userDelete)
router.get('/users/:id?', validate(userGetSchema), userGet)
