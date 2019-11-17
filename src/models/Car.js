import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
export class Car extends Model { }
Car.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  reg: {
    type: Sequelize.TEXT
  },
  pts: {
    type: Sequelize.TEXT
  },
  isOwned: {
    type: Sequelize.BOOLEAN
  },
  type: {
    type: Sequelize.TEXT
  },
  note: {
    type: Sequelize.TEXT
  },
  maxPltCount: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'car'
})

Car.sync()
