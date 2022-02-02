const createError = require("http-errors");
const { Contact } = require('../../models');

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
// findByIdAndDelete => findOneAndDelete
// findByIdAndRemove => findAndModify
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