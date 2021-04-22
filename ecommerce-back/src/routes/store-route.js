const router = require('express').Router()

const { register, login, storeInfo, changePassword } = require('../controllers/store-controller')

const {  checkStoreName, checkLoginData, checkStorePassword } = require('../middlewares/store-middleware')
const { checkEmail } = require('../middlewares/user-store-middleware')
const Auth = require('../middlewares/auth-middleware')

router.post('/register', checkEmail, checkStoreName, register)

router.post('/login', checkLoginData, login)

router.get('/storeinfo', Auth, storeInfo)

router.put('/changepassword', Auth, checkStorePassword, changePassword)

module.exports = router