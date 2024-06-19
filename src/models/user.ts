import { DataTypes, ModelDefined, Optional, Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL!)

type UserAttributes = {
  id: string
  firstName: string
  lastName?: string
  img?: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      img: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'users',
    }
  )
