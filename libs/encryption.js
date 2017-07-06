var bcrypt = require('bcrypt');

const saltRounds = process.env.ENCRYPTION_SALT || 10;

module.exports = {
  encryptPassword(password) {
    return new Promise((res, rej) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        res(hash);
        rej(err);
      })
    })
  },

  comparePasswordWithHash(password, hash) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, hash, (err, result) => {
        res(result);
        rej(err);
      })
    })
  }
}
