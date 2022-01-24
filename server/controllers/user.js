const Post = require('../models/Post');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.userData = async (req, res, next) => {
  try {
    return res.status(200).json({success: true, user: req.user});
  }

  catch (error) {
    return next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('authToken').json({success: true});
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.profile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const allPosts = await Post.find().lean();

    for (let i = 0; i < allPosts.length; i++) {
      const user = await User.findById(allPosts[i].user);
      allPosts[i].username = `${user.firstName} ${user.lastName[0]}`;
    }

    const posts = allPosts.filter(post => String(post.user) === String(user._id));

    return res.status(200).json({success: true, posts});
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.user._id;
    const user = await User.deleteOne({_id});

    if (!user)
      return next(new ErrorResponse('Erreur de suppression du compte.', 404));

    return res.clearCookie('authToken').status(200).json({success: true});
  }

  catch (error) {
    return next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};
