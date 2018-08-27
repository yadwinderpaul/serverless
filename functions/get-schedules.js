const moment = require('moment')
const { Store, Area } = require('../models')

module.exports = async function getSchedules (storeId, areaId) {
  const store = await Store.findById(storeId, {
    include: [{ model: Area }]
  })
  const area = await Area.findById(areaId)
  const conveyance = await store.Area.getConveyanceTo(area)

  const schedules = []
  const now = moment()

  for (var i = 0; i < 7; i++) {
    let currentTime = moment(now).add(i, 'days')
    if (i !== 0) currentTime = currentTime.startOf('day')
    let nextSchedule = await getSchedule(store, conveyance, currentTime)
    if (nextSchedule) schedules.push(nextSchedule)
  }

  return formatSchedulesSync(schedules)
}

async function getSchedule (store, conveyance, time) {
  const workingWindow = await store.getWorkingWindow(time)
  const dropoffWindow = await store.getDropoffWindow(time)

  if (!workingWindow || !dropoffWindow) {
    return null
  }

  if (workingWindow.end.isBefore(time)) {
    // store closes before input time
    return null
  } else if (dropoffWindow.end.isBefore(moment(time).add(conveyance))) {
    // dropoff window ends before input time + conveyance
    return null
  } else {
    return {
      pickupWindow: {
        start: time.isBefore(workingWindow.start) ? workingWindow.start : time,
        end: workingWindow.end
      },
      dropoffWindow: {
        start: time.isBefore(dropoffWindow.start) ? time : dropoffWindow.start,
        end: dropoffWindow.end
      }
    }
  }
}

function formatSchedulesSync (schedules) {
  return schedules.map(schedule => {
    const pickupEarliestTime = schedule.pickupWindow.start
    const pickupLatestTime = schedule.pickupWindow.end
    const dropoffEarliestTime = schedule.dropoffWindow.start
    const dropoffLatestTime = schedule.dropoffWindow.end
    const pickupInterval = [
      pickupEarliestTime.format('MMM Do'),
      `${pickupEarliestTime.format('LT')} - ${pickupLatestTime.format('LT')}`
    ].join(' ')
    const dropoffInterval = [
      dropoffEarliestTime.format('MMM Do'),
      `${dropoffEarliestTime.format('LT')} - ${dropoffLatestTime.format('LT')}`
    ].join(' ')

    return {
      pickupInterval,
      pickupEarliestTime: pickupEarliestTime.valueOf(),
      pickupLatestTime: pickupLatestTime.valueOf(),
      dropoffInterval,
      dropoffEarliestTime: dropoffEarliestTime.valueOf(),
      dropoffLatestTime: dropoffLatestTime.valueOf()
    }
  })
}
