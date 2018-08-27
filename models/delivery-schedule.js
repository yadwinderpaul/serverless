module.exports = (sequelize, DataTypes) => {
  const DeliverySchedule = sequelize.define('DeliverySchedule', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    dayOfWeek: DataTypes.INTEGER,
    startWindowHours: DataTypes.INTEGER,
    startWindowMinutes: DataTypes.INTEGER,
    stopWindowHours: DataTypes.INTEGER,
    stopWindowMinutes: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    priceCurrency: DataTypes.STRING
  }, { schema: 'service' })

  DeliverySchedule.associate = models => {
    models.DeliverySchedule.belongsTo(models.Store, {
      foreignKey: 'storeId'
    })
  }

  return DeliverySchedule
}
