var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users');

/* GET users listing. */
router.get('/', UserController.list);

router.post('/', UserController.create);

module.exports = router;
