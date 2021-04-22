const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate:{
            maxDepth: 1
        }
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

CommentSchema.plugin(require('mongoose-autopopulate'))

const CommentModel = mongoose.model('Comment',CommentSchema)

module.exports = CommentModel