const get = require("./get");
const getById = require("./getById");const add = require("./add");
const remove = require("./delete");
const update = require("./put");
const updateStatusContact = require("./patch");

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
};