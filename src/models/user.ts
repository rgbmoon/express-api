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

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>
  firstName: string
  email: string
  isAdmin: boolean
  lastName?: string
  // TODO store password safely
  // password: string
  img?: string
}

export const User = sequelize.define<UserModel>('User', {
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
    unique: true,
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
