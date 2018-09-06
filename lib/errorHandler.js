
function errorHandler(err, req, res, next) {
  console.log('An error occurred...', err);
  if(err.name === 'ValidationError') {
    const response = {};
    for(const key in err.errors) {
      // 'key' is email, username etc...
      const errorObj = err.errors[key];
      console.log('Error found...', key, errorObj.message);
      response[key] = errorObj.message;
    }
    return res.status(422).json({ errors: response, message: 'Unprocessable entity' });
  }
  res.status(500).json({ message: 'A server error occurred. Please try again later...'});
}

module.exports = errorHandler;
