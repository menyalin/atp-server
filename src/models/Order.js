import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
import { User } from './User'
import { Address } from './Address'

export class Order extends Model { }
Order.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  carType: {
    type: Sequelize.ENUM('20tn', '10tn'),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
  },
  confirmDate: {
    type: Sequelize.DATEONLY
  }

}, {
  sequelize,
  modelName: 'order'
})

Order.belongsTo(User, { as: "manager", constraints: false })
Order.belongsTo(Address, { as: "shipper", constraints: false })
Order.belongsTo(Address, { as: "consignee", constraints: false })
Order.sync({ force: true })


