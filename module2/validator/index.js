const Joi = require('@hapi/joi');

const userSchema = Joi
    .object()
    .keys({
        login: Joi.string().alphanum().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        age: Joi.number().integer().min(4).max(130).required()
    })

function errorResponse (schemaError) {
    const errors = schemaError.map((error) => {
        let { path, message } = error
        return { path, message }
    });
    return {
        status: 'failed',
        errors,
    }
}

function validateSchema (schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error) {
            res.status(400).json(errorResponse(error.details))
        } else {
            next()
        }
    }
}

module.exports = {
    userSchema,
    validateSchema
}