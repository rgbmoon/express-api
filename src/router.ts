import express from 'express'
import { login, logout } from './controllers/session'
import { userCreate, userDelete, userGet, userUpdate } from './controllers/user'
import { validate } from './middlewares/validation'
import { loginSchema } from './schemas/session'
import { userDeleteSchema, userSchema } from './schemas/user'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)
router.get('/logout', logout)

// User routes
router.post('/user', validate(userSchema), userCreate)
router.get('/user', userGet)
router.put('/user', validate(userSchema), userUpdate)
router.delete('/user', validate(userDeleteSchema), userDelete)
