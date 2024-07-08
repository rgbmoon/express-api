import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import { POSTGRES_URI } from '../constants/api.js'

const sequelize = new Sequelize(POSTGRES_URI)

export type UserModelAttributes = InferAttributes<UserModel>
export type UserModelCreationAttributes = InferCreationAttributes<UserModel>
export interface UserModel
  extends Model<UserModelAttributes, UserModelCreationAttributes> {
  userId: CreationOptional<number>
  firstName: string
  email: string
  passwordHash: string
  isAdmin: boolean
  lastName?: string
  img?: string
}

export const User = sequelize.define<UserModel>(
  'User',
  {
    userId: {
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
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
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
  },
  {
    defaultScope: {
      attributes: { exclude: ['passwordHash'] },
    },
    scopes: {
      withPassword: {},
    },
  }
)
