const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, { schema: 'service' })

  Area.associate = models => {
    models.Area.hasMany(models.Store, {
      foreignKey: 'areaId'
    })

    models.Area.hasMany(models.ConveyanceDuration, {
      foreignKey: 'fromId'
    })
  }

  Area.prototype.getConveyanceTo = async function (area) {
    const durations = await this.getConveyanceDurations({
      where: { toId: area.id }
    })
    const duration = durations && durations[0]
    if (!duration) {
      return null
    } else {
      return moment.duration(duration.minutes, 'minutes')
    }
  }

  return Area
}
