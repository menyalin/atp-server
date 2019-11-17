import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'

export class User extends Model { }
User.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
})

User.sync()
