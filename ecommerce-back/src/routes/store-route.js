const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const StoreService = require('../services/store-service')

const { registerValidation, checkStoreName, checkLoginData, checkStorePassword } = require('../middlewares/store-middleware')
const { checkEmail, changePasswordValidation } = require('../middlewares/user-store-middleware')
const Auth = require('../middlewares/auth-middleware')

router.post('/register', checkEmail, checkStoreName, async (req, res) => {
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
        res.status(200).send(createdStore)
    }
    catch (e) {
        return res.status(400).send({ 'message': 'Unexpected thing happened. Try again.' })
    }

})

router.post('/login', checkLoginData, async (req, res) => {
    const store = await StoreService.find({ email: req.body.email })
    const token = jwt.sign({ _id: store._id }, process.env.TOKEN_SECRET)
    res.status(200).send({ 'token': token, 'id': store._id, 'email': store.email })
})

router.get('/storeinfo', Auth, async (req, res) => {
    const store = await StoreService.find({ _id: req.user })
    if (!store) return res.status(400).send({ 'message': 'Store not found' })
    res.status(200).send(store)
})

router.put('/changepassword', Auth, checkStorePassword, async (req, res) => {

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
        res.status(400).send({ 'message': 'Server error' })
    }
})

module.exports = router