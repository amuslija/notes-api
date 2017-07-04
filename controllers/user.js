var User = require('../models/user');

module.exports = {
  create: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var user = new User({});

    user.save(function (err) {
      if (err) {
        res.status(400);
        res.json({
          message: err.message
        });
      }
      res.json({
        id: user.id,
        email: user.email
      })
    });
  }
}