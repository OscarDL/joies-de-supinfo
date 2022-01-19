const jwt = require('jsonwebtoken');
require('dotenv').config({path: './server.env'});

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.fromWebsite = async (req, res, next) => {
  const token = req.headers['client-token'];

  if (!token || token !== process.env.API_KEY) {
    return next(new ErrorResponse('Vous ne pouvez pas faire de requêtes API en dehors du site.', 403));
  }

  next();
};


exports.loggedIn = async (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token) return next(new ErrorResponse("Vous n'êtes pas connecté.", 401));


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user)
      return next(new ErrorResponse('Erreur de récupération des données, veuillez vous reconnecter.', 403));

    req.user = user;
  }
  
  catch (error) {
    return next(new ErrorResponse('Une erreur est survenue.', 500));
  };


  next();
};
