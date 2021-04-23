const router = require('express').Router()

const { getAllProducts, getProduct, createProduct, updateProduct, updateProductPhotos, deleteProduct, getProductsFromCategory } = require('../controllers/product-controller')

const Auth = require('../middlewares/auth-middleware')
const imageUploader = require('../middlewares/image-uploader')

router.get('/', getAllProducts)

router.get('/:categoryId', getProductsFromCategory)

router.get('/:id', getProduct)

router.post('/create', Auth, imageUploader.upload.array('photos', 5), createProduct)

router.put('/:id', Auth, updateProduct)

router.put('/:id/photoupdate', Auth, imageUploader.upload.array('photos', 5), updateProductPhotos)

router.delete('/:id', Auth, deleteProduct)

module.exports = router