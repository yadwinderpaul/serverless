module.exports = (sequelize, DataTypes) => {
  const WorkingHour = sequelize.define('WorkingHour', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    dayOfWeek: DataTypes.INTEGER,
    startWindowHours: DataTypes.INTEGER,
    startWindowMinutes: DataTypes.INTEGER,
    stopWindowHours: DataTypes.INTEGER,
    stopWindowMinutes: DataTypes.INTEGER
  }, { schema: 'admin' })

  WorkingHour.associate = models => {
    models.WorkingHour.belongsTo(models.Store, {
      foreignKey: 'storeId'
    })
  }

  return WorkingHour
}
