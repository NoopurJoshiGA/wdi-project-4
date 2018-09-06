const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: false, unique: false}, // this will change to true after test
  email: { type: String, required: false, unique: false},
  password: { type: String, required: false },
  type: { enum: ['model', 'photographer'], type: String }, // type is either model or photographer
  postcode: { type: String, required: false },
  interests: [{ type: String }],
  description: { type: String },
  reviews: [
    {
      reviewAddedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
      content: { type: String }
    }
  ],
  ratings: [
    {
      ratedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
      number: { type: Number }
    }
  ],
  profilePic: { type: String }
});

module.exports = mongoose.model('User', userSchema);
