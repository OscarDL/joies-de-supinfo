const express = require('express');

const { fromWebsite, loggedIn } = require('../middleware/protected');
const { list, post, random, submit, remove } = require('../controllers/posts');


const router = express.Router();

router.route('/').get(fromWebsite, list);
router.route('/post/:id').get(fromWebsite, post);
router.route('/random').get(fromWebsite, random);
router.route('/submit').post(fromWebsite, loggedIn, submit);
router.route('/remove/:id').delete(fromWebsite, loggedIn, remove);


module.exports = router;
