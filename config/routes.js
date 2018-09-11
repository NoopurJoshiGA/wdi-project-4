const express = require('express');
const Router = express.Router();
const secureRoute = require('../lib/secureRoute');

// import controllers
const usersController = require('../controllers/usersController');
const imagesController = require('../controllers/imagesController');
const reviewsController = require('../controllers/reviewsController');
const commentsController = require('../controllers/commentsController');
const authController = require('../controllers/authController');

Router.route('/')
  .get(function(req, res) {
    res.send('Welcome to Express');
  });

// Login
Router.route('/login')
  .post(authController.login);

// Register
Router.route('/register')
  .post(authController.register);

// Users
Router.route('/users')
  // .all(secureRoute)
  .get(usersController.index)
  .post(usersController.create);

Router.route('/users/:id')
  // .all(secureRoute)
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

// Reviews
Router.route('/users/:userId/reviews')
  // .all(secureRoute)
  .post(reviewsController.create);

Router.route('/users/:userId/reviews/:reviewId')
  // .all(secureRoute)
  .put(reviewsController.update)
  .delete(reviewsController.delete);

// Images
Router.route('/images')
  // .all(secureRoute)
  .get(imagesController.index)
  .post(imagesController.create);

Router.route('/images/:id')
  // .all(secureRoute)
  .get(imagesController.show)
  .put(imagesController.update)
  .delete(imagesController.delete);

// Comments
Router.route('/images/:imageId/comments')
  // .all(secureRoute)
  .post(commentsController.create);

Router.route('/images/:imageId/comments/:commentId')
  // .all(secureRoute)
  .put(commentsController.update)
  .delete(commentsController.delete);

module.exports = Router;
