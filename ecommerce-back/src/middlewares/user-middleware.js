const Joi = require('joi')
const bcrypt = require('bcryptjs')
const UserService = require('../services/user-service')

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        c_password: Joi.string().valid(Joi.ref('password')).required(),
        accountType: Joi.string()
    })
    return schema.validate(data)
}

const checkLoginData = async (req, res, next) => {
    const user = await UserService.find({ email: req.body.email })
    if (!user) return res.status(400).send({ 'message': 'Email not exist' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({ 'message': 'Wrong password' })

    next()
}

const checkAccountType = async (req, res, next) => {
    const user = await UserService.find({ _id: req.user })
    if (user.accountType === 'user' || user.accountType === 'mod') return res.status(401).send({ 'message': 'Unauthorized' })
    next()
}

const checkUserPassword = async (req, res, next) => {
    try {
        const user = await UserService.find({ _id: req.user })
        if (!user) return res.status(400).send({ 'message': 'User not found' })

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send({ 'message': 'Current password is wrong' })

        next()
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }

}

module.exports = { registerValidation, checkLoginData, checkAccountType, checkUserPassword }