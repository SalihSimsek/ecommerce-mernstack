const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserService = require('../services/user-service')
const CartService = require('../services/cart-service')

const { registerValidation } = require('../middlewares/user-middleware')
const { changePasswordValidation } = require('../middlewares/user-store-middleware')

const register = async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Change user's password to hashed password
    const user = req.body
    user.password = hashedPassword
    user.lastSeen = Date.now()

    //Create user
    try {
        const createdUser = await UserService.add(user)
        await CartService.add({ user: createdUser })
        res.status(201).send(createdUser)
    }
    catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const login = async (req, res) => {
    try {
        const user = await UserService.find({ email: req.body.email })
        user.lastSeen = Date.now()
        await user.save()
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.status(200).send({ 'token': token, 'id': user._id, 'email': user.email })
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const userInfo = async (req, res) => {
    try {
        const user = await UserService.find({ _id: req.user })
        if (!user) return res.status(404).send({ 'message': 'User not found' })
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }

}

const changePassword = async (req, res) => {
    const { error } = changePasswordValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    try {
        const user = await UserService.find({ _id: req.user })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)

        user.password = hashedPassword
        const updatedUser = await UserService.update(user._id, user)

        res.status(200).send(updatedUser)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const changeAccountType = async (req, res) => {
    const type = req.body.accountType

    try {
        const user = await UserService.find({ _id: req.params.id })

        if (!user) return res.status(400).send({ 'message': 'User not found' })

        user.accountType = type
        const updatedUser = await UserService.update(user._id, user)
        res.status(400).send(updatedUser)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

module.exports = { register, login, userInfo, changePassword, changeAccountType }