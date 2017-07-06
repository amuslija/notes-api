var express = require('express');
var router = express.Router();
var AuthenticationController = require('../controllers/authentication');

router.post('/', AuthenticationController.authenticateLogin);

module.exports = router;
