const express = require('express');

const { fromWebsite } = require('../middleware/protected');
const { login, register, forgotpw, resetpw } = require('../controllers/auth');


const router = express.Router();

router.route('/login').post(fromWebsite, login);
router.route('/forgot').post(fromWebsite, forgotpw);
router.route('/register').post(fromWebsite, register);
router.route('/reset/:resetCode').put(fromWebsite, resetpw);


module.exports = router;
