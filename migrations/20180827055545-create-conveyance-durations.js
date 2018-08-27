module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ConveyanceDurations', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      fromId: Sequelize.UUID,
      toId: Sequelize.UUID,
      minutes: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { schema: 'service' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ConveyanceDurations')
  }
}
