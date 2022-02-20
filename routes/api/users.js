const express = require("express");

const {authenticate, validation, upload, ctrlWrapper} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const {verifyEmailschema } = require("../../models/user");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
	"/avatars", authenticate,
	upload.single("avatar"),
	ctrlWrapper(ctrl.uploadAvatar)
);

router.post("/verify", validation(verifyEmailschema), ctrlWrapper(ctrl.reSend));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;