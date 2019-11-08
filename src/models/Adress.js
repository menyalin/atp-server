import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'
export class Address extends Model { }
Address.init({
    shortName: {
        type: Sequelize.STRING,
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
        type: Sequelize.BOOLEAN,
    },
    isDeliveryPlace: {
        type: Sequelize.BOOLEAN,
    }

}, {
    sequelize,
    modelName: 'address'
})
