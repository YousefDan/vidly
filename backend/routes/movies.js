const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Movie, validateMovie } = require("../models/movie");
const expressAsyncHandler = require("express-async-handler");

/*
 *  @desc    POST Create a new movie
 *  @route   /api/movies
 *  @access  Public
 */
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let movie = await Movie.findOne({ title: req.body.title });
    if(movie){
        return res.status(400).send("movie already exist!")
    }

    
    movie = new Movie(
      _.pick(req.body, [
        "title",
        "genre",
        "numberInStock",
        "dailyRentalRate",
        "isLiked",
      ])
    );

    const result = await movie.save();
    res
      .status(201)
      .send(
        _.pick(result, [
          "_id",
          "title",
          "genre",
          "numberInStock",
          "dailyRentalRate",
          "isLiked",
        ])
      );
  })
);

/*
 *  @desc    GET Get all movies
 *  @route   /api/movies
 *  @access  Public
 */
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const result = await Movie.find().select("-__v -createdAt -updatedAt");
    res.status(200).send(result);
  })
);

/*
 *  @desc    GET Get a Single movie
 *  @route   /api/movie/:id
 *  @access  Public
 */
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).send(movie);
    } else {
      res.status(404).send("Not Found");
    }
  })
);

/*
 *  @desc    DELETE delete a movie
 *  @route   /api/movie/:id
 *  @access  Public
 */
router.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (movie) {
      res.status(200).send("The Movie Deleted Successfully");
    } else {
      res.status(404).send("Not Found");
    }
  })
);

/*
 *  @desc    PUT Update a movie
 *  @route   /api/movie/:id
 *  @access  Public
 */
router.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          genre: req.body.genre,
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate,
          isLiked: req.body.isLiked,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .send(
        _.pick(movie, [
          "_id",
          "title",
          "genre",
          "numberInStock",
          "dailyRentalRate",
        ])
      );
  })
);

module.exports = router;
