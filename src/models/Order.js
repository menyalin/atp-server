import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
import { Address } from './Address'
import { Car } from './Car'

export class Order extends Model { }
Order.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  number: { type: Sequelize.INTEGER, autoIncrement: true },
  carType: {
    type: Sequelize.ENUM('20tn', '10tn'),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING(40),
    defaultValue: '10'
  },
  note: {
    type: Sequelize.TEXT
  },
  dateRange: {
    type: Sequelize.RANGE(Sequelize.DATE)
  },
  plannedShippingDate: {
    type: Sequelize.DATE
  },
  plannedDeliveryDate: {
    type: Sequelize.DATE
  },
  loadingStart: {
    type: Sequelize.DATE
  },
  loadingEnd: {
    type: Sequelize.DATE
  },
  unLoadingStart: {
    type: Sequelize.DATE
  },
  unLoadingEnd: {
    type: Sequelize.DATE
  },
  isDriverNotified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isClientNotified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  lengthCell: {
    type: Sequelize.INTEGER
  },
  attention: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  templateId: {
    type: Sequelize.TEXT
  },
  driverId1: {
    type: Sequelize.TEXT
  },
  driverId2: {
    type: Sequelize.TEXT
  },
  trailerId: {
    type: Sequelize.TEXT
  },
  plannedCarType: {
    type: Sequelize.ENUM('20tn', '10tn')
  },
  weight: {
    type: Sequelize.FLOAT
  },
  pltCount: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'order'
})
export class OrderTemplate extends Model { }
OrderTemplate.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  templateName: {
    type: Sequelize.STRING(50)
  },
  carType: {
    type: Sequelize.ENUM('20tn', '10tn'),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING(40)
  },
  note: {
    type: Sequelize.TEXT
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  showInMenu: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  shipperId: {
    type: Sequelize.STRING(60)
  },
  consigneeId: {
    type: Sequelize.STRING(60)
  },
  lengthCell: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  plannedCarType: {
    type: Sequelize.ENUM('20tn', '10tn')
  },
  weight: {
    type: Sequelize.FLOAT
  },
  pltCount: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  }
}, {
  sequelize,
  modelName: 'orderTemplate'
})

Order.belongsTo(Address, { as: 'shipper', constraints: false })
Order.belongsTo(Address, { as: 'consignee', constraints: false })
Order.belongsTo(Car, { as: 'car', constraints: false })
Order.sync()
OrderTemplate.sync()
