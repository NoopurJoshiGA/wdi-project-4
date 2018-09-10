const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    // .populate('reviews.addedBy')
    .then(users => res.json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('reviews.addedBy ratings.ratedBy', 'username profilePic')
    .then(user => res.json(user))
    .catch(next);
}

function usersUpdate(req, res, next) {
  if(typeof(req.body.interests) === 'string') {
    req.body.interests = req.body.interests.split(' ');
  }
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function usersCreate(req, res, next) {
  req.body.interests = req.body.interests.split(' ');
  User
    .create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204)) // no content
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  create: usersCreate,
  delete: usersDelete
};
