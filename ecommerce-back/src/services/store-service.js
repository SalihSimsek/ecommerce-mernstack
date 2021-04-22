const BaseService = require('./base-service')
const StoreModel = require('../models/store-model')

class StoreService extends BaseService {
    model = StoreModel
}

module.exports = new StoreService()