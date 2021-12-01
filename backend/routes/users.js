const express = require("express");
const router = express.Router();
const _ = require("lodash");
const expressAsyncHandler = require("express-async-handler");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");


/*
 *  @desc    POST Register a new user
 *  @route   /api/users
 *  @access  Public
 */
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("user already registered");
    }

    user = new User(_.pick(req.body, ["username", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateToken();

    res
      .header("x-auth-token", token)
      .status(201)
      .send(_.pick(user, ["_id", "username", "email"]));
  })
);

module.exports = router;
