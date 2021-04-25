const BaseService = require('./base-service')
const CartItemModel = require('../models/cart-item-model')

class CartItemService extends BaseService {
    model = CartItemModel
}

module.exports = new CartItemService()