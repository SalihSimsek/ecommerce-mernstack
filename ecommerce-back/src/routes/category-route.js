const router = require('express').Router()

const Auth = require('../middlewares/auth-middleware')
const { checkAccountType } = require('../middlewares/user-middleware')
const { categoryValidation, categoryExist } = require('../middlewares/category-middleware')

const CategoryService = require('../services/category-service')

router.get('/categories', async (req, res) => {
    try {
        const categories = await CategoryService.findAll()
        res.status(200).send(categories)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.get('/:categoryname', async (req, res) => {
    try {
        const category = await CategoryService.find(req.params.categoryname)
        if (!category) return res.status(400).send({ 'message': 'Not found' })
        res.status(200).send(category)
    }
    catch {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.post('/create', Auth, checkAccountType, categoryExist, async (req, res) => {

    const { error } = categoryValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    try {
        const category = await CategoryService.add(req.body)
        res.status(200).send(category)
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.delete('/:id',Auth,checkAccountType, async(req,res) => {
    try{
        await CategoryService.delete(req.params.id)
        res.status(200).send({'message':'Category succesfully deleted'})
    }catch(e){
        res.status(400).send({'message':'Server error'})
    }
})

module.exports = router