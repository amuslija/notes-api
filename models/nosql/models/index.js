var mongoose = require('mongoose');
var config = require('../config/config.js');
var dotenv = require('dotenv').config();

var Notes = require('./notes');

mongoose.connect(process.env[config.env]);

module.exports = {
  Notes: Notes
}
