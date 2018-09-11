const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: false, unique: true},
  password: { type: String, required: true },
  type: { enum: ['model', 'photographer'], type: String }, // type is either model or photographer
  postcode: { type: String, required: false },
  interests: [{ type: String }],
  description: { type: String },
  reviews: [
    {
      addedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
      content: { type: String }
    }
  ],
  ratings: [
    {
      ratedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
      number: { type: Number }
    }
  ],
  profilePic: { type: String },
  socialMediaLinks: [
    {
      type: { type: String },
      url: { type: String}
    }
  ]
});

// throw a validation error when duplicate emails are created
// plugins can be required directly here
userSchema.plugin(require('mongoose-unique-validator'));

// 8 is the effort number
userSchema.pre('save', function hashPassword(next) {
  // isModified is a mongoose thing, 'this' refers to the model
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // this.password is the has that we've created on
};

module.exports = mongoose.model('User', userSchema);
