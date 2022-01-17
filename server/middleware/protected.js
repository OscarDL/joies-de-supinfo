require('dotenv').config({path: './server.env'});

const ErrorResponse = require('../utils/errorResponse');


exports.fromDashboard = async (req, res, next) => {
  const token = req.headers['Client-Token'];

  if (!token || token !== process.env.API_KEY) {
    return next(new ErrorResponse('Vous ne pouvez pas faire de requêtes API hors du site en ligne.', 403));
  }

  next();
};
