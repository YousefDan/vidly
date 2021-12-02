const mongoose = require("mongoose");
const joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
    },
    isLiked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(1).max(255).required(),
    genre: joi.object().required(),
    numberInStock: joi.number().min(0).required(),
    dailyRentalRate: joi.number().min(0).required(),
    isLiked: joi.boolean(),
    _id: joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
  Movie,
  validateMovie,
};
