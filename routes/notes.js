var express = require('express');
var router = express.Router();
var cors = require('cors');

var NotesController = require('../controllers/notes');

router.options('/:id', cors());

router.post('/', NotesController.create);
router.get('/', NotesController.retrieveAll);
router.delete('/:id', NotesController.delete);
router.get('/:id', NotesController.retrieve);
module.exports = router;
