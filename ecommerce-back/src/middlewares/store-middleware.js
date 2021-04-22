const Joi = require('joi')
const bcrypt = require('bcryptjs')

const StoreService = require('../services/store-service')

const registerValidation = (data) => {
    const schema = Joi.object({
        storeName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(10).required(),
        phone: Joi.string().min(10).required(),
        password: Joi.string().min(8).required(),
        c_password: Joi.string().valid(Joi.ref('password')).required(),
    })
    return schema.validate(data)
}

const checkStoreName = async (req, res, next) => {
    const storeNameExist = await StoreService.find({ storeName: req.body.storeName })
    if (storeNameExist) return res.status(400).send({ 'message': 'Name already exist' })
    next()
}

const checkLoginData = async (req, res, next) => {
    const store = await StoreService.find({email:req.body.email})
    if (!store) return res.status(400).send({ 'message': 'Email not exist' })

    const validPassword = await bcrypt.compare(req.body.password, store.password)
    if (!validPassword) return res.status(400).send({ 'message': 'Wrong password' })

    next()
}

const checkStorePassword = async (req, res, next) => {
    try {
        const store = await StoreService.find({ _id: req.user })
        if (!store) return res.status(400).send({ 'message': 'Store not found' })

        const validPassword = await bcrypt.compare(req.body.password, store.password)
        if (!validPassword) return res.status(400).send({ 'message': 'Current password is wrong' })

        next()
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }

}

module.exports = { registerValidation, checkStoreName, checkLoginData,checkStorePassword }