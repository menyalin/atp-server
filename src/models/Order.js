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
  confirmDate: {
    type: Sequelize.DATEONLY,
    defaultValue: null
  },
  confirmTime: {
    type: Sequelize.ENUM('01', '02', '03', '04')
  },
  shippingDate: {
    type: Sequelize.DATEONLY
  },
  shippingTime: {
    type: Sequelize.STRING(10)
  },
  deliveryDate: {
    type: Sequelize.DATEONLY
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
  }

}, {
  sequelize,
  modelName: 'order'
})

Order.belongsTo(User, { as: "manager", constraints: false })
Order.belongsTo(Address, { as: "shipper", constraints: false })
Order.belongsTo(Address, { as: "consignee", constraints: false })
Order.belongsTo(Car, { as: "confirmedCar", constraints: false })
Order.sync()


