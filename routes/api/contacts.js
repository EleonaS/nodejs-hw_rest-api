const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const {validation, ctrlWrapper} = require("../../middlewares");
const {contactSchema} = require("../../schemas");

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.get));

router.get('/:id',ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware,  ctrlWrapper(ctrl.add));

router.put('/:id', validateMiddleware,ctrlWrapper(ctrl.update));

router.delete('/:id', ctrlWrapper(ctrl.remove));

module.exports = router;

//----v1-------
/*const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const contacts  = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
  email: Joi.string().min(6).required(),
  phone: Joi.string().min(1).max(10).required()
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   message:"Server error"
    // })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw createError(404, "Not found")
    };
    res.json(result)
  }
  catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw  createError(400, error.message);
    }
  const { id } = req.params;
  const {name,email,phone}= req.body;
  const result = await contacts.updateContact(id, name, email, phone);
  if (!result) {
    throw  createError(404, "Not found")
  };
    res.json(result)
  }
  catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(404, "Not found")
    };
    res.json({ message: "Contact deleted" });
    //res.status(204).send();
  } catch (error) {
  next(error)
  }
});

module.exports = router;
*/