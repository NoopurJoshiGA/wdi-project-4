const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/boke';
const secret = process.env.SECRET || 'boke';

module.exports = {
  dbURI, secret
};
