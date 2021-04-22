const BaseService = require('./base-service')
const ProductModel = require('../models/product-model')

class ProductService extends BaseService{
    model = ProductModel
}

module.exports = new ProductService()