const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // user validation succeeded
      createAndSendToken(user, res, `Welcome back ${user.username}`);
    })
    .catch(next);
}

function register(req, res, next) {
  User
    .create(req.body)
    // add a token here and the user logs in straight after registering
    .then(user => createAndSendToken(user, res, `Created user ${user.email}`))
    .catch(next);
}

function createAndSendToken(user, res, message) {
  const token = jwt.sign({ sub: user._id, username: user.username }, secret, { expiresIn: '2h' }); // user: user.type
  res.json({ message, token });
}

module.exports = {
  login, register
};
