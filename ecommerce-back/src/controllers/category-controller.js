const CategoryService = require('../services/category-service')

const { categoryValidation } = require('../middlewares/category-middleware')

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.findAll()
        res.status(200).send(categories)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await CategoryService.find({ _id: req.params.categoryname })
        if (!category) return res.status(404).send({ 'message': 'Category not found' })
        res.status(200).send(category)
    }
    catch {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const createCategory = async (req, res) => {
    const { error } = categoryValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    try {
        const category = await CategoryService.add(req.body)
        res.status(201).send(category)
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const deleteCategory = async (req, res) => {
    try {
        await CategoryService.delete(req.params.id)
        res.status(200).send({ 'message': 'Category succesfully deleted' })
    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}
module.exports = { getAllCategories, getCategory, createCategory, deleteCategory }