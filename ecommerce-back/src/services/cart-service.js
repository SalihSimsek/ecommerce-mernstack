const BaseService = require('./base-service')
const CartModel = require('../models/cart-model')

class CartService extends BaseService {
    model = CartModel

    async findAll(object){
        return this.model.find(object)
    }

    async find(object) {
        return this.model.findOne(object).populate('cartItems')
    }
}

module.exports = new CartService()