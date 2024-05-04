const Joi = require('joi');
const express = require('express');
const mongoose = require ('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  });
  
  const Genre = mongoose.model('Genre', genreSchema);

  function ValidateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required()
    }); 
    console.log(genre)
    return schema.validate(genre);
  }

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = ValidateGenre;