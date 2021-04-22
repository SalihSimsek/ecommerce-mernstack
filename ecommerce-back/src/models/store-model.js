const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    storeName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    products: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }],
    address: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Address',
        autopopulate: {
            maxDepth: 1
        }
    },
})

StoreSchema.plugin(require('mongoose-autopopulate'))

const StoreModel = mongoose.model('Store', StoreSchema)

module.exports = StoreModel