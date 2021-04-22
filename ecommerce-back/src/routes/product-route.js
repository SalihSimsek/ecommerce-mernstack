const router = require('express').Router()

const ProductService = require('../services/product-service')
const StoreService = require('../services/store-service')

const Auth = require('../middlewares/auth-middleware')
const imageUploader = require('../middlewares/image-uploader')
const e = require('express')

router.get('/', async (req, res) => {
    try {
        const products = await ProductService.findAll()
        res.status(200).send(products)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await ProductService.find({ _id: req.params.id })
        if (!product) return res.status(404).send({ 'message': 'Product not found' })
        res.status(200).send(product)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.post('/create', Auth, imageUploader.upload.array('photos', 5), async (req, res) => {
    const files = req.files
    if (!files) return res.status(400).send({ 'message': 'Loading error' })

    req.body.cover = req.files.splice(0, 1)
    req.body.photos = req.files
    req.body.store = req.user

    try {
        const createdProduct = await ProductService.add(req.body)

        const store = await StoreService.find({ _id: req.user })
        store.products.push(createdProduct)
        await store.save()

        res.status(200).send(createdProduct)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.put('/:id', Auth, async (req, res) => {
    const storeId = req.user._id
    try {
        const product = await ProductService.find({ _id: req.params.id })

        const storeIdFromProduct = product.store.toString()

        if (storeIdFromProduct !== storeId)
            return res.status(401).send({ 'message': 'You have no permission' })

        product.productName = req.body.productName
        product.count = req.body.count
        product.productDescription = req.body.productDescription
        product.price = req.body.price

        const updatedProduct = await ProductService.update(req.params.id, product)
        res.status(200).send(updatedProduct)

    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.put('/:id/photoupdate', Auth, imageUploader.upload.array('photos', 5), async (req, res) => {
    const storeId = req.user._id

    const files = req.files
    if (!files) return res.status(400).send({ 'message': 'Loading error' })

    cover = req.files.splice(0, 1)
    photos = req.files

    try {
        const product = await ProductService.find({ _id: req.params.id })
        product.cover = cover
        product.photos = photos

        const updatedProduct = await ProductService.update(req.params.id, product)
        res.status(200).send(updatedProduct)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.delete('/:id', Auth, async (req, res) => {
    const storeId = req.user._id
    try {
        const product = await ProductService.find({ _id: req.params.id })
        const store = await StoreService.find({ _id: req.user })

        const storeIdFromProduct = product.store.toString()

        if (storeIdFromProduct !== storeId)
            return res.status(401).send({ 'message': 'You have no permission' })

        const deletedProduct = await ProductService.delete(req.params.id)
        if (deletedProduct.deletedCount !== 1)
            return res.status(404).send({ 'message': 'Product not found' })

        store.products.remove(req.params.id)
        await store.save()
        res.status(200).send({ 'message': 'Succesfully deleted' })
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }

})

module.exports = router