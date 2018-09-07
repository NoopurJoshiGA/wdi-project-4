const Image = require('../models/image');

function commentsCreate(req, res, next) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.comments.push(req.body);
      return image.save();
    })
    .then(image => {
      return image.populate('uploadedBy comments.commentedBy', 'username profilePic').execPopulate();
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
      image.comments.id(req.params.commentId).remove();
      return image.save();
    })
    .then(image => {
      return image.populate('uploadedBy comments.commentedBy', 'username profilePic').execPopulate();
    })
    .then( image => res.json(image))
    .catch(next);
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete,
  update: commentsUpdate
};
