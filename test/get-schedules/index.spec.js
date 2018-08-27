const { expect } = require('chai')
const sinon = require('sinon')
const moment = require('moment')
const { Store, Area } = require('../../models')
const getSchedules = require('../../functions/get-schedules')
const utils = require('../../functions/get-schedules/utils')

const STORE_ID = 'store-id'
const AREA_ID = 'area-id'
const STORE_AREA_ID = 'store-area-id'

describe('getScheduleForDay function', () => {
  let store
  let area
  let findStoreById
  let findAreaById
  let storeArea

  beforeEach(() => {
    storeArea = {
      id: STORE_AREA_ID,
      getConveyanceTo: sinon.fake.returns(moment.duration(6, 'hours'))
    }
    store = {
      id: STORE_ID,
      Area: storeArea
    }
    area = {
      id: AREA_ID
    }
    findStoreById = sinon.fake.returns(store)
    findAreaById = sinon.fake.returns(area)
    sinon.replace(Store, 'findById', findStoreById)
    sinon.replace(Area, 'findById', findAreaById)
    sinon.replace(utils, 'getScheduleForDay', sinon.fake())
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('queries database for store, area & conveyance', () => {
    it('should call Store.findById to get store', async () => {
      await getSchedules(STORE_ID, AREA_ID)
      expect(Store.findById.calledOnceWith(STORE_ID)).to.be.true
    })

    it('should call Area.findById to get area', async () => {
      await getSchedules(STORE_ID, AREA_ID)
      expect(Area.findById.calledOnceWith(AREA_ID)).to.be.true
    })

    it('should call store.Area.getConveyanceTo to get conveyance', async () => {
      await getSchedules(STORE_ID, AREA_ID)
      expect(storeArea.getConveyanceTo.calledOnceWith(area)).to.be.true
    })
  })

  describe('call getScheduleForDay for next week schedules', () => {
    it('should call utils.getScheduleForDay 7 times', async () => {
      await getSchedules(STORE_ID, AREA_ID)
      expect(utils.getScheduleForDay.callCount).to.eql(7)
    })
  })
})
