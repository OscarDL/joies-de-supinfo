const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  datetime: {
    type: Number,
    required: true
  }
});


const Post = mongoose.model('Post', PostSchema, 'posts');
module.exports = Post;
