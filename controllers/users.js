var User = require('../app/models').User;

module.exports = {
  create(req, res, next) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    if (email === undefined || password === undefined) {
      next(new Error('Email or password undefined.'));
    }

    User.create({
        email: email,
        password: password
      })
      .then(user => res.json({ id: user.id, email: user.email }))
      .catch(err => next(err));
  },

  list(req, res) {
    return User
      .all()
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err));
  },

  update(req, res, next) {
    return User.findById(req.params.userId)
      .then(user => {
        var email = req.body.email;
        var password = req.body.password;

        if (!user) {
          next(new Error('User not found.'));
        } else if (email === undefined || password === undefined) {
          next(new Error('Email or password undefined.'));
        }

        return user
          .update({
            email: email,
            password: password
          })
          .then(() => res.json(user))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  },
}
