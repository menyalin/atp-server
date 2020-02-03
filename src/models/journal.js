import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../pgDB'

export class Journal extends Model { }
Journal.init({
  documentType: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  documentId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  operationType: {
    type: Sequelize.TEXT
  },
  document: {
    type: Sequelize.JSONB
  },
  userId: {
    type: Sequelize.UUID
  }
}, {
  sequelize,
  modelName: 'journal',
  tableName: 'log_journal'
})

Journal.sync()