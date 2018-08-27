require('dotenv').config()
const config = {
  url: process.env.DB_CONNECTION_STRING,
  dialect: 'postgres'
}

module.exports = {
  development: config,
  test: config,
  production: config
}
