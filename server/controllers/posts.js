const Post = require('../models/Post');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.list = async (req, res, next) => {
  try {
    const gifs = await Post.find();

    for (let i = 0; i < gifs.length; i++) {
      const user = await User.findById(gifs[i].user);
      gifs[i].user = `${user.firstName} ${user.lastName[0]}`;
    }

    return res.status(200).json({success: true, list: gifs});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération des posts.', 500));
  };
};


exports.post = async (req, res, next) => {
  const { id } = sanitize(req.params);


  try {
    const post = await Post.findById(id);

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
    const gifs = await Post.find();

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const user = await User.findById(randomGif.user);
    randomGif.user = `${user.firstName} ${user.lastName[0]}`;

    return res.status(200).json({success: true, gif: randomGif});
  }

  catch (error) {
    return next(new ErrorResponse('Erreur de récupération du post aléatoire.', 500));
  };
};


exports.submit = async (req, res, next) => {
  const { id, user, title, link, datetime } = sanitize(req.body);


  try {
    const post = Post.create({_id: id, user, title, link, datetime});

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
