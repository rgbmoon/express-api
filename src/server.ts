import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import { router } from '@/router'

import { Sequelize } from 'sequelize'

const app = express()

app.use(cors())
app.get('/', (_req, res) => res.send('Server is running!'))
app.use('/api', router)

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  logging: console.log,
})

app.listen(process.env.APP_PORT, async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
