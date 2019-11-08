const Sequelize = require('sequelize');

export const sequelize = new Sequelize('atpDB', 'atp-user', 'atp-user', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    logging: false
})

sequelize.authenticate()
    .then(console.log('pg_connected'))
    .catch(e => console.log(e.message))