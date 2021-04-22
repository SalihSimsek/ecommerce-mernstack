const BaseService = require('./base-service')
const CategoryModel = require('../models/category-model')

class CategoryService extends BaseService {
    model = CategoryModel
}

module.exports = new CategoryService()