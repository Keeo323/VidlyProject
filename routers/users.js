const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require ('mongoose');
const {User, validate} = require('../models/users');
const express = require('express');
const router = express.Router();

const jsonParser = bodyparser.json();

const urlencodedParser = bodyparser.urlencoded({extended: false});

router.get('/me', auth, async (req, res) => {
 const user = await User.findById(req.user._id).select('-password');
 res.send(user);
});

router.post('/', async (req,res) => {
  const { error } = validate(req.body);
  const name = req.body.name;
  console.log('name below')
  console.log(name)
  if (error) return res.status(400).send(error.details[0].message);

 let user = await User.findOne({ email: req.body.email });
 if (user) return res.status(400).send('User already registered.');

 user = new User(_.pick(req.body, [ 'name', 'email', 'password' ]));
 const salt = await bcrypt.genSalt(10);
 console.log('salt:', salt); // Add this line for debugging

 if (!user.password) {
  return res.status(400).send('Password is required.');
}
 user.password = await bcrypt.hash(user.password, 10);
 console.log('hashed password:', user.password); // Add this line for debugging

 await user.save();
 
 const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
});


  module.exports = router;