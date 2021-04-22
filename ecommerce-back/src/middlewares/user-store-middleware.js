const Joi = require('joi')
const UserService = require('../services/user-service')
const StoreService = require('../services/store-service')

const checkEmail = async (req, res, next) => {
    const emailExistForUser = await UserService.find({ email: req.body.email })
    if (emailExistForUser) return res.status(400).send({ 'message': 'Email already exist' })

    const emailExistForStore = await StoreService.find({ email: req.body.email })
    if (emailExistForStore) return res.status(400).send({ 'message': 'Email already exist' })

    next()
}

const changePasswordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(8).required(),
        newPassword: Joi.string().min(8).required(),
        c_newPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    })
    return schema.validate(data)
}

module.exports = { checkEmail, changePasswordValidation }