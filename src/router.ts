import express from 'express'
import { login, logout } from './controllers/session/controller'
import {
  userCreate,
  userDelete,
  userGet,
  userUpdate,
} from './controllers/user/controller'
import { validate } from './middleware/validation'
import { loginSchema } from './controllers/session/schema'
import { userDeleteSchema, userSchema } from './controllers/user/schema'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)
router.get('/logout', logout)

// User routes
router.post('/user', validate(userSchema), userCreate)
router.get('/user', userGet)
router.put('/user', validate(userSchema), userUpdate)
router.delete('/user', validate(userDeleteSchema), userDelete)
