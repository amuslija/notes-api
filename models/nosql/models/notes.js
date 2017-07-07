var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = new Schema({
  text: String,
  userId: Number
});

var Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
