import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
import { User } from './User'
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
    type: Sequelize.STRING(40)
  },
  note: {
    type: Sequelize.TEXT
  },
  startDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  endDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  shippingDate: {
    type: Sequelize.DATE
  },
  shippingTime: {
    type: Sequelize.STRING(10)
  },
  deliveryDate: {
    type: Sequelize.DATE
  },
  deliveryTime: {
    type: Sequelize.STRING(10)
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
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  modelName: 'orderTemplate'
})

Order.belongsTo(User, { as: 'manager', constraints: false })
Order.belongsTo(Address, { as: 'shipper', constraints: false })
Order.belongsTo(Address, { as: 'consignee', constraints: false })
Order.belongsTo(Car, { as: 'car', constraints: false })
Order.sync({ force: true })
OrderTemplate.sync({ force: true })
