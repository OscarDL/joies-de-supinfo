const express = require('express');

const { fromWebsite } = require('../middleware/protected');
const { login, forgotpw, register, resetpw, activate } = require('../controllers/auth');


const router = express.Router();

router.route('/login').post(fromWebsite, login);
router.route('/forgot').post(fromWebsite, forgotpw);
router.route('/register').post(fromWebsite, register);
router.route('/reset/:code').put(fromWebsite, resetpw);
router.route('/activate/:code').post(fromWebsite, activate);


module.exports = router;
