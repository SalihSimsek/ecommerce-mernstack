const BaseService = require('./base-service')
const ProductModel = require('../models/product-model')

class ProductService extends BaseService {
    model = ProductModel

    async findAll(searching) {
        return this.model.find({ productName: { $regex: searching, $options: '$i' } })
    }

    async find(object, limit, skip, sort) {
        return this.model.find(object)
            .sort(sort) //newest first
            .skip(skip)
            .limit(limit)
    }
}

module.exports = new ProductService()