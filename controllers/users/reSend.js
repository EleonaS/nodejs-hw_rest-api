const { User } = require("../../models");
const createError = require("http-errors");

const { sendMail } = require("../../helpers");

const reSend = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing required field email",
    });
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw createError(400, "Verification has already been passed")
  }
  const mail = {
    to: email,
    subject: "Verify your email to finish registration",
    html: `<a target="_blank" href="http://localhost:3000/api/users/${user.verificationToken}"> Confirm email </a>`,
  };
  await sendMail(mail);
  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent"
  })
}; 

module.exports = reSend;