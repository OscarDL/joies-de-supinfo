const express = require('express');

const { login, register, forgotpw, resetpw } = require('../controllers/auth');


const router = express.Router();

router.route('/login').post(login);
router.route('/forgot').post(forgotpw);
router.route('/register').post(register);
router.route('/reset/:resetCode').put(resetpw);


module.exports = router;
