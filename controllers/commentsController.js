const Image = require('../models/image');

function commentsIndex(req, res, next) {
  Image
    .findById(req.params.imageId)
    .populate('commentedBy')
    .populate('')
    .then(res => res.body)
    .catch(next);
}

function commentsCreate(req, res, next) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.comments.push(req.body);
      return image.save();
    })
    .then(image => res.json(image))
    .catch(next);
}

function commentsUpdate(req, res, next) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.comments.id(req.params.reviewId).set(req.body);
      return image.save();
    })
    .then(image => res.json(image))
    .catch(next);
}

function commentsDelete(req, res, next) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.comments.id(req.params.reviewId).remove();
      return image.save();
    })
    .then( image => res.json(image))
    .catch(next);
}

module.exports = {
  index: commentsIndex,
  create: commentsCreate,
  delete: commentsDelete,
  update: commentsUpdate
};
