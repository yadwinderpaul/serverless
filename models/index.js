require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const models = {}

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING)

// import models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && // not a dotfile
    file !== basename && // not this file
    file.slice(-3) === '.js' // not non-js file
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
  })

// associate models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
