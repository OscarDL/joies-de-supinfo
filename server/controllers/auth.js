const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { sendEmail, capitalize, getDomain } = require('../utils/functions');


exports.register = async (req, res, next) => {
  const { email, password, passcheck } = sanitize(req.body);

  // Do all checks for field entries before checking uniqueness of username & email address
  if (!(email && password && passcheck))
    return next(new ErrorResponse('Remplissez tous les champs.', 400));

  if (password.length < 8)
    return next(new ErrorResponse('Le mot de passe nécessite au minimum 8 caractères.', 400));

  if (password !== passcheck)
    return next(new ErrorResponse('Les mots de passe entrés ne correspondent pas.', 400));

  
  try {
    // Check uniqueness of email address
    const exists = await User.findOne({email});
    if (exists)
      return next(new ErrorResponse('Un compte avec cette adresse email existe déjà.', 409));

    const firstName = capitalize(email.split('.')[0]);
    const lastName = capitalize(email.split('.')[1].split('@')[0]);

    const user = await User.create({email, firstName, lastName, password});

    const code = user.getActivationCode();
    await user.save();

    confirmEmail(user, code, res);
    res.status(200).json({success: true});
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.activate = async (req, res, next) => {
  const activationCode = crypto.createHash('sha256').update(sanitize(req.body.code)).digest('hex');

  try {
    const user = await User.findOne({
      activationCode,
      activationDate: {$gt: Date.now()} // Check if current time is still in the code expiration timeframe
    });

    if (!user) {
      const code = user.getActivationCode();
      await user.save();

      confirmEmail(user, code, res);

      return next(new ErrorResponse("Le code d'activation est éronné ou a expiré. Un nouvel email a été envoyé avec un code d'activation différent.", 400));
    }

    user.activationCode = undefined;
    user.activationDate = undefined;
    await user.save();

    return res.status(201).json({success: true});
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.login = async (req, res, next) => {
  const { email, password } = sanitize(req.body);

  if (!email || !password)
    return next(new ErrorResponse('Veuillez entrer votre adresse email et mot de passe.', 400));


  try {
    const user = await User.findOne({email}).select('+password');

    if (!user)      
      return next(new ErrorResponse('Identifiants invalides.', 404));

    const isMatch = await user.matchPasswords(password);

    if(!isMatch)
      return next(new ErrorResponse('Identifiants invalides.', 404));

    user.password = undefined;
    sendJwt(user, 200, res);
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.forgotpw = async (req, res, next) => {
  const { email } = sanitize(req.body);


  try {
    const user = await User.findOne({email});

    if (!user)
      return next(new ErrorResponse('Adresse email non enregistrée.', 404));

    const resetCode = user.getResetPasswordCode();
    await user.save();

    const content = `
      <h2>${user.firstName},</h2>
      <h3>You requested a password reset.</h3><br/>
      <p>Please copy this reset code back on the website:
        <br/>${resetCode}
      </p><br/>
      <p>If the reset code matches, your account will be secured with your new password.</p>
      <h4>Thank you for using our website and making your account more secure.</h4>
      <p>SupWeather &copy; - 2021</p>
    `;

    try {

      sendEmail({email: user.email, subject: 'SupWeather - Password Reset Request', content});

      res.status(200).json({success: true});

    } catch (error) {

      user.resetPasswordCode = undefined;
      user.resetPasswordDate = undefined;
      await user.save();
     
      return next(new ErrorResponse("Erreur d'envoi de l'email.", 400));
    };
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


exports.resetpw = async (req, res, next) => {
  const { password, passcheck } = sanitize(req.body);
  const resetPasswordCode = crypto.createHash('sha256').update(sanitize(req.params.resetCode)).digest('hex');

  if (!password || !passcheck)
    return next(new ErrorResponse('Remplissez tous les champs.', 400));

  if (password.length < 8)
    return next(new ErrorResponse('Le mot de passe nécessite au minimum 8 caractères.', 400));

  if (password !== passcheck)
    return next(new ErrorResponse('Les mots de passe entrés ne correspondent pas.', 400));


  try {
    const user = await User.findOne({
      resetPasswordCode,
      resetPasswordDate: {$gt: Date.now()} // Check if current time is still in the token expiration timeframe
    });

    if (!user)
      return next(new ErrorResponse('The token to reset your password is wrong or has expired. Please reset your password within 15 minutes of sending the reset request.', 400));

    user.password = password;
    user.resetPasswordCode = undefined;
    user.resetPasswordDate = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: 'Password reset successfully.'
    });
  }

  catch (error) {
    next(new ErrorResponse('Could not reset your password.', 401));
  };
};


const confirmEmail = (user, activationCode) => {
  const content = `
    <h2>${user.firstName},</h2>
    <h3>Pour éviter le spam et contenu de mauvaise qualité, tous les utilisateurs doivent utiliser leur adresse email Supinfo et la confirmer pour poster des Gifs.</h3><br/>
    <p>Veuillez cliquer sur ce lien pour activer votre compte :
      <a href="${getDomain()}/activate/${activationCode}">Activation de compte JDS</a>
    </p><br/><br/>
    <p>${new Date(Date.now()).getFullYear()} - Joies de SUPINFO</p>
  `;

  try {
    sendEmail({email: user.email, subject: 'Active ton compte JDS', content});
  }

  catch (error) {
    next(new ErrorResponse('Une erreur est survenue.', 500));
  };
};


const sendJwt = (user, statusCode, res) => {
  const token = user.getSignedJwt();

  res.cookie('authToken', token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES),
    sameSite: 'Strict',
    httpOnly: true,
    secure: true
  }).status(statusCode).json({success: true, user});
};
