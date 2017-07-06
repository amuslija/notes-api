var User = require('../app/models').User;
var encryption = require('../libs/encryption');

module.exports = {
  create(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (email === undefined || password === undefined) {
      next(new Error('Email or password undefined.'));
    } else {
      encryption.encryptPassword(password)
        .then(encryptedPassword => {
          User.create({
              email: email,
              password: encryptedPassword
            })
            .then(user => res.json({ id: user.id, email: user.email }))
            .catch(err => next(err));
        })
        .catch(err => next(err))
    }
  },

  list(req, res) {
    return User
      .all()
      .then(users => res.json(users))
      .catch(err => next(err));
  },

  retrieve(req, res, next) {
    return User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          return next(new Error('User not found.'));
        } else {
          res.json(user);
        }
      })
      .catch(err => next(err));
  },

  update(req, res, next) {
    return User.findById(req.params.userId)
      .then(user => {

        if (!user) {
          return next(new Error('User not found.'));
        } else if (req.body.email === undefined && req.body.password === undefined) {
          return next(new Error('Email and password undefined.'));
        } else {

          var email = req.body.email || user.email;
          var password = req.body.password || user.password;

          encryption.encryptPassword(password)
            .then(encryptPassword => {
              user
                .update({
                  email: email,
                  password: encryptedPassword
                })
                .then(() => res.json(user))
                .catch(err => next(err));
            })
        }
      })
      .catch(err => next(err));
  },
}
