import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
export class Car extends Model { }
Car.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  listItem: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isTempSlot: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  owner: {
    type: Sequelize.TEXT
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
  dateRange: {
    type: Sequelize.RANGE(Sequelize.DATE)
  },
  title: {
    type: Sequelize.TEXT
  },
  note: {
    type: Sequelize.TEXT
  }
}, {
  sequelize,
  modelName: 'carWorkSchedule'
})

export class CarUnit extends Model { }
CarUnit.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  startDate: {
    type: Sequelize.DATE,
    unique: 'carUnit'
  },
  truckId: {
    type: Sequelize.UUID,
    unique: 'carUnit'
  },
  trailerId: {
    type: Sequelize.UUID
  },
  driverId1: {
    type: Sequelize.UUID,
    allowNull: false
  },
  driverId2: {
    type: Sequelize.UUID
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  note: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'carUnit'
})

CarWorkSchedule.belongsTo(Car, { as: 'car', constraints: false })

Car.sync()
CarWorkSchedule.sync()
CarUnit.sync()
