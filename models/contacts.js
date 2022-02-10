const {Schema, model} = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, {versionKey: false, timestamps: true});

const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

// всегда един.число!!!
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiAddContactSchema,
  joiUpdateFavoriteSchema
};


