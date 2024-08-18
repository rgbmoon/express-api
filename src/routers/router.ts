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
import {
  postCreateSchema,
  postGetSchema,
  postUpdateSchema,
} from '../schemas/post.js'
import {
  postCreate,
  postDelete,
  postGet,
  postUpdate,
} from '../controllers/post.js'

export const router = express.Router()

// Session routes
router.post('/login', validate(loginSchema), login)

// User routes
// TODO: authorizeAdmin middleware add to user routes
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

// Post routes
router.post('/posts', [authorize, validate(postCreateSchema)], postCreate)

router.put('/posts/:id', [authorize, validate(postUpdateSchema)], postUpdate)

router.delete('/posts/:id', authorize, postDelete)

router.get('/posts', [authorize, validate(postGetSchema)], postGet)
