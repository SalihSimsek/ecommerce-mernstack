const BaseService = require('./base-service')
const ProductModel = require('../models/product-model')

class ProductService extends BaseService {
    model = ProductModel

    async findAll(searching,limit,skip) {
        return this.model.find({ productName: { $regex: searching, $options: '$i' } })
            .limit(limit).skip(skip)
    }

    async find(object, limit, skip, sort) {
        return this.model.find(object)
            .sort(sort) //newest first
            .skip(skip)
            .limit(limit)
    }

    async getOneProduct(object) {
        return this.model.findOne(object)
    }
}

module.exports = new ProductService()