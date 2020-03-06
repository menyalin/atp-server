import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
import { Driver } from './Driver.js'

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
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
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
  dateRange: {
    type: Sequelize.RANGE(Sequelize.DATE),
    allowNull: false
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
CarWorkSchedule.belongsTo(Car, { as: 'trailer', constraints: false })
CarWorkSchedule.belongsTo(Driver, { as: 'driver', constraints: false })
CarUnit.belongsTo(Driver, { as: "driver1", constraints: false })
CarUnit.belongsTo(Driver, { as: "driver2", constraints: false })
CarUnit.belongsTo(Car, { as: 'truck', constraints: false })
CarUnit.belongsTo(Car, { as: 'trailer', constraints: false })

Car.sync()
CarWorkSchedule.sync()
CarUnit.sync()
