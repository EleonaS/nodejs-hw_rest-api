const createError = require("http-errors");
const contacts = require('../../models/contacts');

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`)
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result
    }
  })
};

module.exports = remove;