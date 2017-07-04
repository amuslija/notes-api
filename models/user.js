var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  email: 'string',
  password: 'string',
});

var User = mongoose.model('User', schema)

module.exports = User;
