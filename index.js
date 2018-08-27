const getSchedules = require('./functions/get-schedules')

module.exports.handler = async (event) => {
  const { storeId, areaId } = event.body
  return getSchedules(storeId, areaId)
}
