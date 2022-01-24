const sanitize = require('mongo-sanitize');

const Post = require('../models/Post');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.posts = async (req, res, next) => {
  try {
    const posts = await Post.find().lean();

    for (let i = 0; i < posts.length; i++) {
      const user = await User.findById(posts[i].user);
      posts[i].username = `${user.firstName} ${user.lastName[0]}`;
    }

    return res.status(200).json({success: true, posts});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération des posts.', 500));
  };
};


exports.post = async (req, res, next) => {
  const { id } = sanitize(req.params);


  try {
    const post = await Post.findById(id).lean();
    const user = await User.findById(post.user);
    post.username = `${user.firstName} ${user.lastName[0]}`;

    return res.status(200).json({success: true, post});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération du post.', 500));
  };
};


exports.random = async (req, res, next) => {
  try {
    const posts = await Post.find().lean();
    const post = posts[Math.floor(Math.random() * posts.length)] ?? {};

    if (post._id) {
      const user = await User.findById(post.user);
      post.username = `${user.firstName} ${user.lastName[0]}`;
    }

    return res.status(200).json({success: true, post});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération du post aléatoire.', 500));
  };
};


exports.submit = async (req, res, next) => {
  const { user, title, link, datetime } = sanitize(req.body);


  try {
    const post = await Post.create({user, title, link, datetime});
    req.user.posts.push(post._id);
    await req.user.save();

    return res.status(200).json({success: true, post});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de soumission du post.', 500));
  };
};


exports.remove = async (req, res, next) => {
  const { id } = sanitize(req.params);


  try {
    const post = Post.findByIdAndRemove(id);

    return res.status(200).json({success: true, post});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de suppression du post.', 500));
  };
};
