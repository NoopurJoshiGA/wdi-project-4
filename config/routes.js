const express = require('express');
const Router = express.Router();

// import controllers
const usersController = require('../controllers/usersController');
const imagesController = require('../controllers/imagesController');
const reviewsController = require('../controllers/reviewsController');
// const commentsController = require('../controllers/commentsController');

Router.route('/')
  .get(function(req, res) {
    res.send('Welcome to Express');
  });

// Users
Router.route('/users')
  .get(usersController.index)
  .post(usersController.create);

Router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

// Reviews
Router.route('/users/:userId/reviews')
  // .get(reviewsController.index)
  .post(reviewsController.create);

Router.route('/users/:userId/reviews/:reviewId')
  .put(reviewsController.update)
  .delete(reviewsController.delete);

// Images
Router.route('/images')
  .get(imagesController.index)
  .post(imagesController.create);

Router.route('/images/:id')
  .get(imagesController.show)
  .put(imagesController.update)
  .delete(imagesController.delete);

module.exports = Router;
