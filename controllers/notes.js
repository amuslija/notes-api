const Notes = require('../models/nosql/models').Notes;

module.exports = {
  create(req, res, next) {
    var userId = req.body.userId;
    var text = req.body.text;
    console.log(Notes);
    if (userId === undefined || text === undefined) {
      return next(new Error('Notes body not defined.'));
    }
    var notes = new Notes({
      userId: userId,
      text: text
    });

    notes.save(err => {
      if (err) {
        return next(err);
      }
      res.status(201).json(notes);
    })
  },

  retrieve(req, res, next) {
    var userId = req.decoded.id;

    Notes.find({ userId: userId }, (err, docs) => {
      if (err) {
        return next(err);
      }

      res.json(docs);
    })
  }
}
