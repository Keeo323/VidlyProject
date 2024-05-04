const Joi = require('joi');
const {genreSchema} = require('./genres');
const mongoose = require ('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true,
      },
      numberInStock: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max: 255
      }
  }));
  
  function ValidateMovie(movie) {
    const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genre: { 
        _id: Joi.objectId().required(),
        name: Joi.string().min(5).max(50).required()
     },
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
  }

exports.Movie = Movie;
exports.validate = ValidateMovie;