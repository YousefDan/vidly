const express = require("express");
const router = express.Router();
const _ = require("lodash");
const expressAsyncHandler = require("express-async-handler");
const { Genre, validateGenre } = require("../models/genre");

/*
 *  @desc    POST Create a new Genre
 *  @route   /api/genres
 *  @access  Public
*/
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let genre = await Genre.findOne({ name: req.body.name });
    if (genre) {
      return res.status(400).send("genre is already exist!");
    }

    genre = new Genre(_.pick(req.body, ["name"]));

    const result = await genre.save();
    res.status(201).send(_.pick(result, ["_id", "name"]));
  })
);

/*
 *  @desc    GET Get all genres
 *  @route   /api/genres
 *  @access  Public
 */
router.get(
    "/",
    expressAsyncHandler(async (req, res) => {
      const result = await Genre.find().select("-__v");
      res.status(200).send(result);
    })
  );

module.exports = router;
