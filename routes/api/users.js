const express = require("express");

const {authenticate, upload, ctrlWrapper} = require("../../middlewares");
const {users: ctrl} = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
	"/avatars", authenticate,
	upload.single("avatar"),
	ctrlWrapper(ctrl.uploadAvatar)
);

module.exports = router;