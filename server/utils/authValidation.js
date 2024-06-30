const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    userSchema,
    loginSchema
};
