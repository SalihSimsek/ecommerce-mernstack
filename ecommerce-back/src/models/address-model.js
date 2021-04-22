const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    apartmentNo: {
        type: String,
        required: true
    },
    doorNo: {
        type: String,
        required: true
    }
})

const AddressModel = mongoose.model('Address', AddressSchema)

module.exports = AddressModel