const createError = require("http-errors");
const contacts = require('../../models/contacts');

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await contacts.updateContact(id, name, email, phone);
  if (!result) {
    throw createError(404, `Contact with id=${id} not found!`);
  };
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${id} updated`,
    data: {
      result
    }
  })
};

module.exports = update;