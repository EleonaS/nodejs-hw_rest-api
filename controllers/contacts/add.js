const contacts = require('../../models/contacts');

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact(name, email, phone);
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