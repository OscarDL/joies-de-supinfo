const express = require('express');

const { fromWebsite, loggedIn } = require('../middleware/protected');
const { userData, logout, deleteUser } = require('../controllers/user');


const router = express.Router();

router.route('/logout').get(fromWebsite, logout);
router.route('/data').get(fromWebsite, loggedIn, userData);
router.route('/delete').delete(fromWebsite, loggedIn, deleteUser);


module.exports = router;
