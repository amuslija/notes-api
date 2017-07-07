var jwt = require('jsonwebtoken');
var config = require('../config.js');
var fs = require('fs');

function authenticator(req, res, next) {

  var authorizationHeader = req.headers['authorization'];
  var schema = authorizationHeader.split(' ')[0];
  var token = authorizationHeader.split(' ')[1];
  var secret = fs.readFileSync(config.secretPath);

  if (schema === 'Bearer' && token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return next(err);
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    res.status(403).json({ error: 'Authentication failed.' });
  }
}

module.exports = authenticator;
