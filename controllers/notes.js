const Notes = require('../models/nosql/models').Notes;

module.exports = {
  create(req, res, next) {
    var userId = req.user.id;
    var text = req.body.text;
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
      res.status(201).json({ id: notes._id, text: notes.text });
    })
  },

  retrieve(req, res, next) {
    var userId = req.user.id;
    var notesId = req.params.id;

    Notes.find({ userId: userId, _id: notesId }, (err, docs) => {
      if (err || docs.length > 1) {
        return next(new Error());
      }

      return res
        .status(200)
        .json({ id: docs[0]._id, text: docs[0].text });
    });
  },

  retrieveAll(req, res, next) {
    var userId = req.user.id;

    Notes.find({ userId: userId }, (err, docs) => {
      if (err) {
        return next(err);
      }

      return res
        .status(200)
        .json(
          docs.map(doc => ({ id: doc._id, text: doc.text }))
        );
    })
  },

  delete(req, res, next) {
    var userId = req.user.id;
    var notesId = req.params.id;

    if (notesId === undefined) {
      return next(new Error('Notes not found '));
    }

    Notes.remove({ _id: notesId }, err => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ id: notesId });
    });
  }
}
