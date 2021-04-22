const Joi = require('joi')

const commentValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().required(),
    })
    return schema.validate(data)
}

module.exports = commentValidation