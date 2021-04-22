const router = require('express').Router()

//Controllers
const { getAllCategories, getCategory, createCategory, deleteCategory } = require('../controllers/category-controller')

const Auth = require('../middlewares/auth-middleware')
const { checkAccountType } = require('../middlewares/user-middleware')
const { categoryExist } = require('../middlewares/category-middleware')


router.get('/categories', getAllCategories)

router.get('/:categoryname', getCategory)

router.post('/create', Auth, checkAccountType, categoryExist, createCategory)

router.delete('/:id', Auth, checkAccountType, deleteCategory)

module.exports = router