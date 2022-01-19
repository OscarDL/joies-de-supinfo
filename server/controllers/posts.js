const sanitize = require('mongo-sanitize');

const Post = require('../models/Post');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.posts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    for (let i = 0; i < posts.length; i++) {
      const user = await User.findById(posts[i].user);
      posts[i].user = `${user.firstName} ${user.lastName[0]}`;
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
    const post = await Post.findOne({id});

    const user = await User.findById(post.user);
    post.user = `${user.firstName} ${user.lastName[0]}`;

    return res.status(200).json({success: true, post});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération du post.', 500));
  };
};


exports.random = async (req, res, next) => {
  try {
    const posts = await Post.find();
    const randomPost = posts[Math.floor(Math.random() * posts.length)] ?? {};

    if (randomPost.id) {
      const user = await User.findById(randomPost.user);
      randomPost.user = `${user.firstName} ${user.lastName[0]}`;
    }

    return res.status(200).json({success: true, post: randomPost});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération du post aléatoire.', 500));
  };
};


exports.submit = async (req, res, next) => {
  const { id, user, title, link, datetime } = sanitize(req.body);


  try {
    const post = Post.create({id: id, user, title, link, datetime});

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
