const Joi = require('@hapi/joi');

const schemas = {
	register: Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	}),
	login: Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	}),
	newSchool: Joi.object({
		name: Joi.string().required(),
		periods: Joi.number().required()
	})
}

module.exports = schemas;