var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');

router.post('/', UsersController.create)

module.exports = router;
