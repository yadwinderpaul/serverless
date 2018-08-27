module.exports = (sequelize, DataTypes) => {
  const ConveyanceDuration = sequelize.define('ConveyanceDuration', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    minutes: DataTypes.INTEGER
  }, { schema: 'service' })

  ConveyanceDuration.associate = models => {
    models.ConveyanceDuration.belongsTo(models.Area, {
      foreignKey: 'fromId',
      as: 'FromArea'
    })

    models.ConveyanceDuration.belongsTo(models.Area, {
      foreignKey: 'toId',
      as: 'ToArea'
    })
  }

  return ConveyanceDuration
}
