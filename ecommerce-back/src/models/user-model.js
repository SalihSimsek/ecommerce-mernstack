const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastSeen: {
        type: Date
    },
    accountType: {
        type: String,
        enum: ['user', 'mod', 'admin'],
        default: 'user'
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment'
    }],
    address: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Address'
    }]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel