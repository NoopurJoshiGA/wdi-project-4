const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: false, unique: false}, // this will change to true after test
  email: { type: String, required: false, unique: false},
  password: { type: String, required: false },
  type: { enum: ['model', 'photographer'], type: String }, // type is either model or photographer
  postcode: { type: String, required: false },
  reviews: [
    {
      addedByUser: { type: mongoose.Schema.ObjectId, ref: 'User'},
      content: { type: String }
    }
  ],
  ratings: [
    {
      addedByUser: { type: mongoose.Schema.ObjectId, ref: 'User'},
      ratingNumber: { type: Number }
    }
  ],
  profilePic: { type: String }
});

module.exports = mongoose.model('User', userSchema);
