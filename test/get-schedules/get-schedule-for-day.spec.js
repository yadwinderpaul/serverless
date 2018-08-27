const { expect } = require('chai')
const sinon = require('sinon')
const moment = require('moment')
const { getScheduleForDay } = require('../../functions/get-schedules/utils')

const TIME = moment()
describe('getScheduleForDay function', () => {
  let store
  let conveyance
  let time

  beforeEach(() => {
    time = TIME
    store = {
      getWorkingWindow: sinon.fake.returns({
        start: moment(time).add(1, 'hours'),
        end: moment(time).add(9, 'hours')
      }),
      getDropoffWindow: sinon.fake.returns({
        start: moment(time).add(9, 'hours'),
        end: moment(time).add(12, 'hours')
      })
    }
    conveyance = moment.duration(6, 'hours')
  })

  describe('workingWindow, dropoffWindow invalid values', () => {
    it('should return null when workingWindow is not present', async () => {
      store.getWorkingWindow = sinon.fake.returns(undefined)
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result).to.be.null
    })

    it('should return null when dropoffWindow is not present', async () => {
      store.getDropoffWindow = sinon.fake.returns(undefined)
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result).to.be.null
    })
  })

  describe('store closed before input time', () => {
    it('should return null when workingWindow.start has passed', async () => {
      store.getWorkingWindow = sinon.fake.returns({
        start: moment(time).subtract(2, 'hours'),
        end: moment(time).subtract(1, 'hours')
      })
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result).to.be.null
    })
  })

  describe('cant deliver after dropoff time ends', () => {
    it('should return null when dropoffWindow.end has passed', async () => {
      store.getDropoffWindow = sinon.fake.returns({
        start: moment(time).subtract(2, 'hours'),
        end: moment(time).subtract(1, 'hours')
      })
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result).to.be.null
    })

    it('should return null when dropoffWindow.end + conveyance is more', async () => {
      store.getDropoffWindow = sinon.fake.returns({
        start: moment(time).subtract(2, 'hours'),
        end: moment(time).add(2, 'hours')
      })
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result).to.be.null
    })
  })

  describe('returns schedule in proper format', () => {
    it('should have pickupWindow & dropoffWindow', async () => {
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result).to.have.own.keys('pickupWindow', 'dropoffWindow')
    })

    it('should have start, end in pickupWindow', async () => {
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result.pickupWindow).to.have.own.keys('start', 'end')
    })

    it('should have start, end in dropoffWindow', async () => {
      const result = await getScheduleForDay(store, conveyance, time)
      expect(result.dropoffWindow).to.have.own.keys('start', 'end')
    })
  })
})
