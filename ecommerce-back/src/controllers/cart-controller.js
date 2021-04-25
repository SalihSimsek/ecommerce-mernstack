const CartService = require('../services/cart-service')
const CartItemService = require('../services/cart-item-service')


const getCart = async (req, res) => {
    try {
        const cart = await CartService.find({ 'user': req.user._id, 'status': false })
        res.status(200).send(cart)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const addToCart = async (req, res) => {
    try {
        const cart = await CartService.find({ 'user': req.user._id, 'status': false })
        let id = null;

        if (cart.cartItems.lenght !== 0) {
            cart.cartItems.forEach(item => {
                if (item.product._id.toString() === req.body.productId) {
                    id = item
                }
            })
        }

        if (id !== null) {
            id.quantity += 1
            id.total = id.quantity * id.product.price
            cart.total += id.product.price
            await id.save()
        } else {
            const cartItem = await CartItemService.add({ cart: cart._id, product: req.body.productId, quantity: 1 })
            cartItem.total = cartItem.quantity * cartItem.product.price
            cart.total += cartItem.total
            cart.cartItems.push(cartItem)
            await cartItem.save()
        }
        await cart.save()
        res.status(200).send(cart)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const increaseItem = async (req, res) => {
    //+ and -
    try {
        const cart = await CartService.find({ 'user': req.user._id, 'status': false })
        const item = await CartItemService.find({ _id: req.params.id })
        const count = req.body.count
        console.log
        if (count >= 1) {
            item.quantity += count
            cart.total += count * item.product.price
        } else {
            item.quantity += count
            cart.total += count * item.product.price
        }
        item.total = item.quantity * item.product.price
        await item.save()
        await cart.save()
        res.status(200).send(item)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const item = await CartItemService.find({ _id: req.params.id })
        const cart = await CartService.find({ _id: item.cart })
        cart.cartItems.remove(item)
        cart.total -= item.quantity * item.product.price
        await CartItemService.delete(item)
        await cart.save()
        res.status(200).send(cart)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const resetCart = async (req, res) => {
    try {
        const cart = await CartService.find({ 'user': req.user._id, 'status': false })
        cart.cartItems.forEach(async (item) => {
            await CartItemService.delete(item)
        })
        cart.cartItems = []
        cart.total = 0
        await cart.save()
        res.status(200).send(cart)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const confirmCart = async (req, res) => {
    try {
        const cart = await CartService.find({ 'user': req.user._id, 'status': false })
        cart.status = true
        const updatedCart = await CartService.update({ _id: cart._id }, cart)
        await CartService.add({ user: req.user._id })
        res.status(200).send(updatedCart)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const orderHistory = async (req, res) => {
    try {
        object = { user: req.user._id, status: true }
        const orders = await CartService.findAll(object)
        res.status(200).send(orders)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

module.exports = { getCart, addToCart, increaseItem, removeFromCart, confirmCart, resetCart, orderHistory }