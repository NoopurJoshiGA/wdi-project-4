const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/boke';
const secret = process.env.SECRET || 'boke';
const port = process.env.PORT || 4000;
console.log('port is', port);

module.exports = {
  dbURI, secret, port
};
