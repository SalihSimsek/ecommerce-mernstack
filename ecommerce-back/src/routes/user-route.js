const router = require('express').Router()
const { register, login, userInfo, changePassword, changeAccountType, createAddress } = require('../controllers/user-controller')

const { checkEmail } = require('../middlewares/user-store-middleware')
const { checkLoginData, checkUserPassword, checkAccountType } = require('../middlewares/user-middleware')
const Auth = require('../middlewares/auth-middleware')


router.post('/register', checkEmail, register)

router.post('/login', checkLoginData, login)

router.get('/userinfo', Auth, userInfo)

router.put('/changepassword', Auth, checkUserPassword, changePassword)

router.put('/accounttype/:id', Auth, checkAccountType, changeAccountType)

module.exports = router