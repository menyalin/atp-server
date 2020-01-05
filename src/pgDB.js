const Sequelize = require('sequelize')

export const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: 'postgres',
  logging: false,
  options: {
    timezone: '+03:00'
  }
})

sequelize.authenticate()
  // eslint-disable-next-line no-console
  .then(console.log('pg_connected'))
  // eslint-disable-next-line no-console
  .catch(e => console.log(e.message))
