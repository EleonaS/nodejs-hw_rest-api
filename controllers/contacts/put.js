const createError = require("http-errors");
const  { Contact } = require('../../models');

const update = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
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