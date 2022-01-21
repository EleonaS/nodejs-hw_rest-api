const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
  email: Joi.string().min(6).required(),
  phone: Joi.string().min(1).max(10).required()
});

module.exports = contactSchema;