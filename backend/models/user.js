const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 110,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
/* Generate Token Method */
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(110).required(),
    email: joi.string().trim().min(5).max(255).required().email(),
    password: joi.string().trim().min(8).required(),
    isAdmin: joi.boolean(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateUser,
};
