const mongoose = require('mongoose')

const CartItemSchema = mongoose.Schema({
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        autopopulate:{
            maxDepth: 1
        }
    },
    quantity: {
        type: Number
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Cart'
    },
    total:{
        type: Number,
        default: 0
    }
})

CartItemSchema.plugin(require('mongoose-autopopulate'))

const CartItemModel = mongoose.model('CartItem', CartItemSchema)

module.exports = CartItemModel