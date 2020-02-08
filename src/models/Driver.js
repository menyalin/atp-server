import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
export class Driver extends Model { }
Driver.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  shortName: {
    type: Sequelize.STRING
  },
  fullName: {
    type: Sequelize.STRING
  },
  phone1: {
    type: Sequelize.STRING
  },
  phone2: {
    type: Sequelize.STRING
  },
  passport: {
    type: Sequelize.STRING
  },
  driversLicense: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'driver'
})

Driver.sync()