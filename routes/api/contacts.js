const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const {authenticate,validation, ctrlWrapper } = require("../../middlewares");
const {joiAddContactSchema,
  joiUpdateFavoriteSchema} = require('../../models/contacts');

const router = express.Router();

router.get('/', authenticate,  ctrlWrapper(ctrl.get));

router.get('/:id',ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validation(joiAddContactSchema), ctrlWrapper(ctrl.add));

router.put('/:id', validation(joiAddContactSchema), ctrlWrapper(ctrl.update));

router.patch('/:id/favorite', validation(joiUpdateFavoriteSchema) , ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:id', ctrlWrapper(ctrl.remove));

module.exports = router;

