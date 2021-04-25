const router = require('express').Router()

const Auth = require('../middlewares/auth-middleware')

const { addToCart, removeFromCart, removeFromCartOneItem, confirmCart, increaseItem, resetCart, getCart, orderHistory } = require('../controllers/cart-controller')

router.get('/getcart', Auth, getCart)

router.put('/addproduct', Auth, addToCart)

router.put('/increase/:id', Auth, increaseItem)

router.put('/removeitem/:id', Auth, removeFromCart)

router.put('/resetcart', Auth, resetCart)

router.put('/confirmcart', Auth, confirmCart)

router.get('/orderhistory', Auth, orderHistory)

module.exports = router