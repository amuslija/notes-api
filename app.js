var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var authenticator = require('./middlewares/authenticator');
var errorHandler = require('./middlewares/error-handler');
var config = require('./config.js')
var index = require('./routes/index');
var users = require('./routes/users');
var authentication = require('./routes/authentication');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/authenticate', authentication);
app.use(authenticator);
//
app.use('/', index);
app.use('/users', users);

// app.get('*', (req, res) => {
//   console.log(req.body);
//   res.json({ message: 'success' })
// });
//
// app.post('*', (req, res) => {
//   console.log(req.body);
//   res.json({ message: 'success' })
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(errorHandler);

module.exports = app;
