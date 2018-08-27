const moment = require('moment')

module.exports = {
  async getScheduleForDay (store, conveyance, time) {
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
}
