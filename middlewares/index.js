const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const authenticate = require("./auth");
const upload = require("./upload");

module.exports = {
  validation,
  ctrlWrapper,
  authenticate,
  upload
};