import { DataTypes, ModelDefined, Optional, Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL!)

export interface UserAttributes {
  id: number
  firstName: string
  email: string
  isAdmin: boolean
  lastName?: string
  // TODO store password safely
  // password: string
  img?: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
  })
