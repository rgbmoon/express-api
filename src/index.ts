import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import { router } from './router'
import { Sequelize } from 'sequelize'

export const serverStart = () => {
  // ORM setup
  const sequelize = new Sequelize(process.env.POSTGRES_URL!, {
    logging: console.log,
  })

  // App setup
  const app = express()

  app.use(cors()) //TODO: configure
  app.use(express.json())
  app.use(express.static('public'))
  app.use('/api', router)

  // TODO: tmp
  app.get('/', (_req, res) => {
    res.send('Hello World!')
  })

  app.listen(process.env.APP_PORT, async () => {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  })
}
