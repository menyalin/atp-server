import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
export class Address extends Model { }
Address.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  shortName: {
    type: Sequelize.STRING
  },
  partner: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.TEXT
  },
  note: {
    type: Sequelize.TEXT
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  isShippingPlace: {
    type: Sequelize.BOOLEAN
  },
  isDeliveryPlace: {
    type: Sequelize.BOOLEAN
  }

}, {
  sequelize,
  modelName: 'address'
})
