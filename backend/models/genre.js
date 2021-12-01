const mongoose = require("mongoose");
const joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Action",
      "Comedy",
      "Thriller",
      "Drama",
      "Romance",
      "Fantasy",
      "Mystery",
    ],
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(4).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  genreSchema,
  Genre,
  validateGenre,
};
