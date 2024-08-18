import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import { POSTGRES_URI } from '../constants/api.js'

const sequelize = new Sequelize(POSTGRES_URI)

export type PostModelAttributes = InferAttributes<PostModel>
export type PostModelCreationAttributes = InferCreationAttributes<PostModel>
export interface PostModel
  extends Model<PostModelAttributes, PostModelCreationAttributes> {
  id: CreationOptional<number>
  userId: ForeignKey<number>
  title: string
  description?: string
  blocks: Array<{
    type: 'paragraph' | 'quote'
    order: number
    content: string
  }>
}

export const Post = sequelize.define<PostModel>('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  blocks: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
  },
})
