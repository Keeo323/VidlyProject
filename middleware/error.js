const winston = require('winston');

module.exports = function(err, req, res, next){
   winston.log('eror', err.message, err);

   res.status(500).send('Something failed.');
  }