module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WorkingHours', {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { schema: 'admin' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WorkingHours')
  }
}
