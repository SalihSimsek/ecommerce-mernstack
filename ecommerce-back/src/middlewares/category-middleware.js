const Joi = require('joi')
const CategoryService = require('../services/category-service')

const categoryValidation = (data) => {
    const schema = Joi.object({
        categoryName: Joi.string().min(2).required()
    })
    return schema.validate(data)
}

const categoryExist = async (req, res, next) => {
    try {
        const category = await CategoryService.find({categoryName: req.body.categoryName })
        if (category) return res.status(400).send({ 'message': 'Category already exist' })
    }
    catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
    next()
}

module.exports = { categoryValidation, categoryExist }