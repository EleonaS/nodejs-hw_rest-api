const  { Contact } = require('../../models');

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact added",
    data: {
      result
    }
  })
};

module.exports = add;