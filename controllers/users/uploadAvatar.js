const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { BadRequest } = require("http-errors");
const { User } = require("../../models");

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;

  if (req.fileValidationError)
    throw new BadRequest(req.fileValidationError);
  if (!req.file)
    throw new BadRequest("Avatar file is required");

  const { path: tempUpload, filename } = req.file;
  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;

    const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);
        
    const avatarURL = path.join("avatars", newFileName);
    //console.log(avatarURL);

    await User.findByIdAndUpdate(_id, { avatarURL });

    /*
image.cover( w, h[, alignBits || mode, mode] );  */
    await Jimp.read(resultUpload)
      .then((image) => {
        return image.cover(250, 250).write(resultUpload);
      })
      .catch((err) => console.error(err));

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Avatar update",
      avatarURL,
    });
  } catch (err) {
    await fs.unlink(tempUpload);
  };
};
  
module.exports = uploadAvatar;