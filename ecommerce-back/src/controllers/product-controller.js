const ProductService = require('../services/product-service')
const StoreService = require('../services/store-service')
const CategoryService = require('../services/category-service')

const getAllProducts = async (req, res) => {
    try {
        if (!req.query.search) req.query.search = ''
        const products = await ProductService.findAll(req.query.search)
        res.status(200).send(products)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const getProductsFromCategory = async (req, res) => {
    try {
        //How many items see on page
        const limit = parseInt(req.query.limit)
        //How many items will be jumped to forward or back
        const skip = parseInt(req.query.skip)

        const minPrice = parseInt(req.query.minprice) || 0
        const maxPrice = parseInt(req.query.maxprice) || 999999

        const sort = {}

        if (req.query.sortBy) {
            const str = req.query.sortBy.split(':')
            sort[str[0]] = str[1] === 'desc' ? -1 : 1
        }

        object = { category: req.params.categoryId, price: { $gte: minPrice, $lte: maxPrice } }

        const products = await ProductService.find(object, limit, skip, sort)

        if (!products) return res.status(404).send({ 'message': 'Category not found' })

        res.status(200).send(products)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await ProductService.getOneProduct({ _id: req.params.id })
        if (!product) return res.status(404).send({ 'message': 'Product not found' })
        res.status(200).send(product)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const createProduct = async (req, res) => {
    const files = req.files
    if (!files) return res.status(400).send({ 'message': 'Loading error' })

    req.body.cover = req.files.splice(0, 1)[0]
    req.body.photos = req.files
    req.body.store = req.user._id


    try {
        const category = await CategoryService.find({ _id: req.body.category })
        req.body.category = category._id
        const createdProduct = await ProductService.add(req.body)
        const store = await StoreService.find({ _id: req.user })
        store.products.push(createdProduct)
        await store.save()

        res.status(201).send(createdProduct)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
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
        res.status(500).send({ 'message': 'Server error' })
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
        res.status(500).send({ 'message': 'Server error' })
    }
}

const deleteProduct = async (req, res) => {
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
        res.status(500).send({ 'message': 'Server error' })
    }
}

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, updateProductPhotos, deleteProduct, getProductsFromCategory }