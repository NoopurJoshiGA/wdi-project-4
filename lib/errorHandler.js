function errorHandler(err, req, res, next) { // this is an express middleware thing, therefore you need req, res and next. The order does matter btw.
  console.log('An error occurred...', err);
  res.status(500).json({ message: 'A server error occurred. Please try again later...'});
}

module.exports = errorHandler;
