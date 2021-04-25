const mongoose = require('mongoose')
const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    },
    cartItems: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CartItem'
    }],
    status: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        default: 0
    }
})

CartSchema.plugin(require('mongoose-autopopulate'))

const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel