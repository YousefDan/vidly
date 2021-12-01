const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");

/*
 *  @desc    POST Authenticate the user and send token
 *  @route   /api/auth
 *  @access  Public
 */
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("invalid email or password");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send("invalid email or password");
    }
    const token = user.generateToken();

    res.status(201).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  })
);
/* Validate Auth */
function validateAuth(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(255).required().email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
module.exports = router;
