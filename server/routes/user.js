const express = require('express');

const { fromWebsite, loggedIn } = require('../middleware/protected');
const { userData, logout, profile, deleteUser } = require('../controllers/user');


const router = express.Router();

router.route('/logout').get(fromWebsite, logout);
router.route('/profile/:id').get(fromWebsite, profile);
router.route('/data').get(fromWebsite, loggedIn, userData);
router.route('/delete').delete(fromWebsite, loggedIn, deleteUser);


module.exports = router;
