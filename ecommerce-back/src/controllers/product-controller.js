const ProductService = require('../services/product-service')
const StoreService = require('../services/store-service')

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.findAll()
        res.status(200).send(products)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await ProductService.find({ _id: req.params.id })
        if (!product) return res.status(404).send({ 'message': 'Product not found' })
        res.status(200).send(product)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

const createProduct = async (req, res) => {
    const files = req.files
    if (!files) return res.status(400).send({ 'message': 'Loading error' })

    req.body.cover = req.files.splice(0, 1)[0]
    req.body.photos = req.files
    req.body.store = req.user._id


    try {
        const createdProduct = await ProductService.add(req.body)
        const store = await StoreService.find({ _id: req.user })
        store.products.push(createdProduct)
        await store.save()


        res.status(200).send(createdProduct)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

const updateProduct = async (req, res) => {
    const storeId = req.user._id
    try {
        const product = await ProductService.find({ _id: req.params.id })

        const storeIdFromProduct = product.store.toString()

        if (storeIdFromProduct !== storeId)
            return res.status(401).send({ 'message': 'You have no permission' })

        product.productName = req.body.productName
        product.count = req.body.count
        product.description = req.body.description
        product.price = req.body.price

        const updatedProduct = await ProductService.update(req.params.id, product)
        res.status(200).send(updatedProduct)

    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

const updateProductPhotos = async (req, res) => {
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
}

const deleteProduct = async(req,res) => {
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
}

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, updateProductPhotos, deleteProduct }