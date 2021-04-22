const router = require('express').Router()

const { createAddressForUser, createAddressForStore, deleteAddressFromUser, deleteAddressFromStore } = require('../controllers/address-controller')

const Auth = require('../middlewares/auth-middleware')

router.post('/user', Auth, createAddressForUser)

router.post('/store', Auth, createAddressForStore)

router.delete('/user/:id', Auth, deleteAddressFromUser)

router.delete('/store/:id', Auth, deleteAddressFromStore)

module.exports = router