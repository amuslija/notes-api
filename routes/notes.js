var express = require('express');
var router = express.Router();
var NotesController = require('../controllers/notes');

router.post('/', NotesController.create);
router.get('/', NotesController.retrieve);
module.exports = router;
