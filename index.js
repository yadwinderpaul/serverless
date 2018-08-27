const getSchedules = require('./functions/get-schedules')

module.exports.handler = async (event, context, callback) => {
  const { storeId, areaId } = event.body
  const data = await getSchedules(storeId, areaId)
  callback(null, data)
}
