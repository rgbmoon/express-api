import cors from 'cors'
import express from 'express'
import 'dotenv/config'

import { Sequelize } from 'sequelize'
import { router } from './routers/router.js'
import { POSTGRES_URI } from './constants/api.js'

export const start = () => {
  // ORM setup
  const sequelize = new Sequelize(POSTGRES_URI, {
    logging: console.log,
  })

  // App setup
  const app = express()

  app.use(cors()) //TODO: configure
  app.use(express.json())
  app.use('/tmp', express.static('tmp'))
  app.use('/api', router)

  // TODO: add swagger & open-api codegen

  app.listen(process.env.APP_PORT, async () => {
    try {
      await sequelize.authenticate()
      // TODO: make DB migrations
      // await sequelize.sync({ force: true })
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  })
}
