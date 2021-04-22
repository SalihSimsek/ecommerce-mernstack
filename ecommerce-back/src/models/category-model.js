const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
    }]
})

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel