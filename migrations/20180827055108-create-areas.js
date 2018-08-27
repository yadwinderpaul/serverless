module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Areas', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      geometry: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { schema: 'service' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Areas')
  }
}
