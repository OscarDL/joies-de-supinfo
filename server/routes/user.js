const express = require('express');

const { userData, logout, deleteUser } = require('../controllers/user');


const router = express.Router();

router.route('/data').get(userData);
router.route('/logout').get(logout);
router.route('/delete').delete(deleteUser);


module.exports = router;
