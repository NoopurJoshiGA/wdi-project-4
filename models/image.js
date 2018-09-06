const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: false }, // set it to true after test
  caption: { type: String, required: false },
  tags: [{ type: String }],
  comments: [
    {
      commentedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
      content: { type: String }
    }
  ],
  likes: { type: Number },
  uploadedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Image', imageSchema);
