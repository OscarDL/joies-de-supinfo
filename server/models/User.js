const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+@[s][u][p][i][n][f][o]\.[c][o][m]$/, "invalid"
    ]
  },

  firstName: String,
  lastName: String,

  password: {
    type: String,
    minlength: 8,
    select: false,
    required: true
  },

  gifs: {
    type: Array,
    default: []
  },

  activated: {
    type: Boolean,
    default: false
  },
  activationCode: {
    type: String,
    default: crypto.randomBytes(20).toString('hex')
  },
  activationDate: {
    type: Number,
    default: Date.now()
  },

  resetPasswordCode: String,
  resetPasswordDate: Number
});


// 'this' refers to the user from where that method is called

// Generates a secure salted password before registering: .pre('save')
UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) next();
  
  const salt = await genSalt(12);
  this.password = await hash(this.password, salt);

  next();
});

// Compares entered password and the password saved in the DB (login)
UserSchema.methods.matchPasswords = async function(password) {
  return await compare(password, this.password);
};

// Generates a new web token for registering and logging in
UserSchema.methods.getSignedJwt = function () {
  return jwt.sign(
    {id: this._id},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES}
  );
};

// Generates a new web token for account activation
UserSchema.methods.getActivationCode = function () {
  const code = crypto.randomBytes(10).toString('hex');

  this.activationCode = crypto.createHash('sha256').update(code).digest('hex');
  this.activationDate = Date.now() + 900000; // 15 minutes

  return code;
};

// Generates a new web token for resetting password
UserSchema.methods.getResetPasswordCode = function () {
  const resetCode = crypto.randomBytes(10).toString('hex');

  this.resetPasswordCode = crypto.createHash('sha256').update(resetCode).digest('hex');
  this.resetPasswordDate = Date.now() + 900000; // 15 minutes

  return resetCode;
};


const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
