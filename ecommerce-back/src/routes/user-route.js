const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserService = require('../services/user-service')

const { registerValidation, checkLoginData, checkUserPassword, checkAccountType } = require('../middlewares/user-middleware')
const { checkEmail, changePasswordValidation } = require('../middlewares/user-store-middleware')
const Auth = require('../middlewares/auth-middleware')

router.post('/register', checkEmail, async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Change user's password to hashed password
    const user = req.body
    user.password = hashedPassword

    //Create user
    try {
        const createdUser = await UserService.add(user)
        res.status(200).send(createdUser)
    }
    catch (e) {
        return res.status(400).send({ 'message': 'Unexpected thing happened. Try again.' })
    }

})

router.post('/login', checkLoginData, async (req, res) => {
    const user = await UserService.find({ email: req.body.email })
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(200).send({ 'token': token, 'id': user._id, 'email': user.email })
})

router.get('/userinfo', Auth, async (req, res) => {
    const user = await UserService.find({ _id: req.user })
    if (!user) return res.status(400).send({ 'message': 'User not found' })
    res.status(200).send(user)
})

router.put('/changepassword', Auth, checkUserPassword, async (req, res) => {

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
        res.status(400).send({ 'message': 'Server error' })
    }
})


router.put('/accounttype/:id', Auth, checkAccountType, async (req, res) => {
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
})

router.put('/createaddress', Auth, async (req, res) => {
    try {
        const user = await UserService.find({ _id: req.user })
        if (!user) return res.status(400).send({ 'message': 'User not found' })

        user.address.push(req.body.address)
        await user.save()
        res.status(200).send(user)
    }
    catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

module.exports = router