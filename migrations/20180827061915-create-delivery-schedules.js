module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DeliverySchedules', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      storeId: Sequelize.UUID,
      dayOfWeek: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      startWindowHours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      startWindowMinutes: {
        type: Sequelize.INTEGER,
        default: 0,
        allowNull: false
      },
      stopWindowHours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stopWindowMinutes: {
        type: Sequelize.INTEGER,
        default: 0,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        default: 59.0
      },
      priceCurrency: {
        type: Sequelize.STRING,
        default: 'SEK'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { schema: 'service' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DeliverySchedules')
  }
}
