const jwt = require('jsonwebtoken');

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.userData = async (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token) return next();


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user)
      return next(new ErrorResponse('Erreur de récupération des données, veuillez vous reconnecter.', 401));

    return res.status(200).json({success: true, user});
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


exports.deleteUser = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token)
    return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 401));


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.deleteOne({_id: decoded.id});

    if (!user)
      return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 404));

    return res.clearCookie('authToken').status(200).json({success: true});
  }

  catch (error) {
    return next(new ErrorResponse('Could not delete your account, please try again.', 401));
  };
};
