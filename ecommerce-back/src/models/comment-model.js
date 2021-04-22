const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }
})

const CommentModel = mongoose.model('Comment',CommentSchema)

module.exports = CommentModel