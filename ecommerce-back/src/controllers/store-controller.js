const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const StoreService = require('../services/store-service')

const { registerValidation } = require('../middlewares/store-middleware')
const { changePasswordValidation } = require('../middlewares/user-store-middleware')

const register = async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Change store's password to hashed password
    const store = req.body
    store.password = hashedPassword

    //Create store
    try {
        const createdStore = await StoreService.add(store)
        res.status(201).send(createdStore)
    }
    catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const login = async (req, res) => {
    try {
        const store = await StoreService.find({ email: req.body.email })
        const token = jwt.sign({ _id: store._id }, process.env.TOKEN_SECRET)
        res.status(200).send({ 'token': token, 'id': store._id, 'email': store.email,'storeName':store.storeName })
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const storeInfo = async (req, res) => {
    try {
        const store = await StoreService.find({ _id: req.user })
        if (!store) return res.status(404).send({ 'message': 'Store not found' })
        res.status(200).send(store)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const changePassword = async (req, res) => {
    const { error } = changePasswordValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    try {
        const store = await StoreService.find({ _id: req.user })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)

        store.password = hashedPassword
        const updatedStore = await StoreService.update(store._id, store)

        res.status(200).send(updatedStore)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

module.exports = { register, login, storeInfo, changePassword }