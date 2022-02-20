const { Conflict } = require("http-errors");
const {nanoid} = require("nanoid");
// const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const {User} = require("../../models");
const {sendEmail} = require("../../helpers");


const register = async(req, res)=> {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict(`User with ${email} already exist`)
  }
  
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

    const newUser = new User({email,avatarURL, subscription,verificationToken});

    newUser.setPassword(password);  newUser.save();
  
  const mail = {
        to: email,
        subject: "Подтверждение email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    
    await sendEmail(mail);
  
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
          user: {
            email,
            subscription,
            verificationToken
            }
        }
    });
}

module.exports = register;