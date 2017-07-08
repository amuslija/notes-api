var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('express-jwt');
var fs = require('fs');

var errorHandler = require('./middlewares/error-handler');

var config = require('./config.js')
var index = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');
var signup = require('./routes/signup');
var authentication = require('./routes/authentication');

var app = express();

var secret = fs.readFileSync(config.secretPath);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// requires configuration
app.use(cors());
app.options('*', cors());

app.use('/authenticate', authentication);
app.use('/signup', signup);

app.use(jwt({ secret: secret }).unless({ path: ['/authenticate'] }));
app.use('/', index);

app.use('/notes', notes);

// error handler
app.use(errorHandler);
module.exports = app;
