const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cover: {
        type: Object,
        required: true
    },
    photos: [{
        type: Object,
        required: true
    }],
    productDescription: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
    },
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store',
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
    }]
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel