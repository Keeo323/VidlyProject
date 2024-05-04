const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const express = require('express');
const mongoose = require ('mongoose');
  
const userShchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin: Boolean,
});

 userShchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
 }

  const User = mongoose.model('User', userShchema);

  function ValidateUser(user) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    }); 
    console.log(user)
    return schema.validate(user);
  }

exports.User = User;
exports.validate = ValidateUser;