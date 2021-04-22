const BaseService = require('./base-service')
const AddressModel = require('../models/address-model')

class AddressService extends BaseService {
    model = AddressModel
}

module.exports = new AddressService()