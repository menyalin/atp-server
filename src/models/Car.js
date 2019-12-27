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
export class CarWorkSchedule extends Model { }

CarWorkSchedule.init({
  type: {
    type: Sequelize.ENUM('service', 'holiday')
  },
  startDate: {
    type: Sequelize.DATEONLY
  },
  startTime: {
    type: Sequelize.STRING(5)
  },
  endDate: {
    type: Sequelize.DATEONLY
  },
  endTime: {
    type: Sequelize.STRING(5)
  },
  note: {
    type: Sequelize.TEXT
  }
}, {
  sequelize,
  modelName: 'carWorkSchedule'
})

CarWorkSchedule.belongsTo(Car, { as: 'car', constraints: false })

Car.sync()
CarWorkSchedule.sync()
