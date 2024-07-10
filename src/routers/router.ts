import express from 'express'

import { login } from '../controllers/session.js'
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
import { authorize } from '../middlewares/auth.js'
import { uploadImg } from '../middlewares/upload.js'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)

// TODO: authorizeAdmin middleware add, add userId in admin request schemas

// User routes
router.post(
  '/users',
  [authorize, validate(userCreateSchema), uploadImg],
  userCreate
)

router.put(
  '/users/:id',
  [authorize, validate(userUpdateSchema), uploadImg],
  userUpdate
)

router.delete('/users/:id', authorize, userDelete)

router.get('/users/:id?', [authorize, validate(userGetSchema)], userGet)
