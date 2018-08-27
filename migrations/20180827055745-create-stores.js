module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stores', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      areaId: Sequelize.UUID,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { schema: 'admin' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stores')
  }
}
