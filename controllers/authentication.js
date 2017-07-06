var jwt = require('jsonwebtoken');
var User = require('../app/models').User;
var encryption = require('../libs/encryption');
var config = require('../config.js');

module.exports = {
  authenticateLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var secret = fs.readFileSync(config.secretPath);

    User.findAll({ where: { email: email } })
      .then(userResults => {
        user = userResults[0];
        encryption.comparePasswordWithHash(password, user.password)
          .then(result => {
            if (!result) {
              next(new Error('Passwords did not match'));
            };
            var token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: 1440 });
            res.json({ email: user.email, token: token });
          })
      })
      .catch(err => next(err));
  }
}