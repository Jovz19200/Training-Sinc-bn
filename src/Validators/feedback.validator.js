const Joi = require('joi');

const feedbackValidationSchema = Joi.object({
    training: Joi.string().required(), // Should be a valid MongoDB ObjectId, you can use regex for stricter check
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().allow('', null)
});

module.exports = feedbackValidationSchema;