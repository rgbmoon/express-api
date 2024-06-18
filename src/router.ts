import express from 'express'
import { login, logout } from './controllers/session'
import { userCreate, userDelete, userGet, userUpdate } from './controllers/user'

export const router = express.Router()

// Session routes
router.post('/login', login)
router.get('/logout', logout)

// User routes
router.post('/user', userCreate)
router.get('/user', userGet)
router.put('/user', userUpdate)
router.delete('/user', userDelete)
