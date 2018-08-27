const moment = require('moment')
const { Store, Area } = require('../../models')
const utils = require('./utils')

module.exports = async function getSchedules (storeId, areaId) {
  const store = await Store.findById(storeId, {
    include: [{ model: Area }]
  })
  if (!store || !store.Area) throw new Error('No such valid store exists')

  const area = await Area.findById(areaId)
  if (!area) throw new Error('No such area exists')

  const conveyance = await store.Area.getConveyanceTo(area)
  if (!conveyance) throw new Error(`The store doesn't deliver to ${area.name}`)

  const schedules = []
  const now = moment()

  for (var i = 0; i < 7; i++) {
    let currentTime = moment(now).add(i, 'days')
    if (i !== 0) currentTime = currentTime.startOf('day')
    let nextSchedule = await utils.getScheduleForDay(store, conveyance, currentTime)
    if (nextSchedule) schedules.push(nextSchedule)
  }

  return formatSchedulesSync(schedules)
}

function formatSchedulesSync (schedules) {
  return schedules.map(schedule => {
    return {
      pickupInterval: formatIntervalSync(schedule.pickupWindow),
      dropoffInterval: formatIntervalSync(schedule.dropoffWindow),
      pickupEarliestTime: schedule.pickupWindow.start.valueOf(),
      pickupLatestTime: schedule.pickupWindow.end.valueOf(),
      dropoffEarliestTime: schedule.dropoffWindow.start.valueOf(),
      dropoffLatestTime: schedule.dropoffWindow.end.valueOf()
    }
  })
}

function formatIntervalSync (intervalWindow) {
  return [
    intervalWindow.start.format('MMM Do'),
    `${intervalWindow.start.format('LT')} - ${intervalWindow.end.format('LT')}`
  ].join(' ')
}
