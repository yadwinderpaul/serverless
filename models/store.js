const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, { schema: 'admin' })

  Store.associate = models => {
    models.Store.belongsTo(models.Area, {
      foreignKey: 'areaId'
    })

    models.Store.hasMany(models.WorkingHour, {
      foreignKey: 'storeId'
    })

    models.Store.hasMany(models.DeliverySchedule, {
      foreignKey: 'storeId'
    })
  }

  Store.prototype.getWorkingWindow = async function (time) {
    const workingHours = await this.getWorkingHours({
      where: { dayOfWeek: time.weekday() }
    })
    const workingHour = workingHours && workingHours[0]
    if (!workingHour) {
      return null
    } else {
      return createWindow(time, workingHour)
    }
  }

  Store.prototype.getDropoffWindow = async function (time) {
    const deliverySchedules = await this.getDeliverySchedules({
      where: { dayOfWeek: time.weekday() }
    })
    const deliverySchedule = deliverySchedules && deliverySchedules[0]
    if (!deliverySchedule) {
      return null
    } else {
      return createWindow(time, deliverySchedule)
    }
  }

  return Store
}

function createWindow (time, windowObject) {
  const {
    startWindowHours,
    startWindowMinutes,
    stopWindowHours,
    stopWindowMinutes
  } = windowObject
  let start = moment.duration(`${startWindowHours}:${startWindowMinutes}:00`)
  let end = moment.duration(`${stopWindowHours}:${stopWindowMinutes}:00`)
  return {
    start: moment(time).startOf('day').add(start),
    end: moment(time).startOf('day').add(end)
  }
}
