const Image = require('../models/image');

function imagesIndex(req, res, next) {
  Image
    .find()
    .then(images => res.json(images))
    .catch(next);
}

function imagesShow(req, res, next) {
  Image
    .findById(req.params.id)
    .then(image => res.json(image))
    .catch(next);
}

function imagesUpdate(req, res, next) {
  Image
    .findById(req.params.id)
    .then(image => image.set(req.body))
    .then(image => image.save())
    .then(image => res.json(image))
    .catch(next);
}

function imagesCreate(req, res, next) {
  Image
    .create(req.body)
    .then(image => res.json(image))
    .catch(next);
}

function imagesDelete(req, res, next) {
  Image
    .findById(req.params.id)
    .then(image => image.remove())
    .then(() => res.sendStatus(204)) // no content
    .catch(next);
}

module.exports = {
  index: imagesIndex,
  show: imagesShow,
  update: imagesUpdate,
  create: imagesCreate,
  delete: imagesDelete
};
