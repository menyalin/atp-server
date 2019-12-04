import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
import { Car } from './Car'

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

export class UserRole extends Model { }
UserRole.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  role: {
    type: Sequelize.ENUM('dispatcher', 'admin'),
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'userRole'
})
UserRole.belongsTo(User, { as: "user", constraints: false })

export class Schedule extends Model { }
Schedule.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  type: {
    type: Sequelize.ENUM('dispatcher', 'driver'),
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'schedule'
})
Schedule.belongsTo(User, { as: "user", constraints: false })
Schedule.belongsTo(Car, { as: "car", constraints: false })

User.sync()
UserRole.sync()
Schedule.sync()