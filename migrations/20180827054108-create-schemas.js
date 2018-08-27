module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createSchema('service'),
      queryInterface.createSchema('admin')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropSchema('service'),
      queryInterface.dropSchema('admin')
    ])
  }
}
