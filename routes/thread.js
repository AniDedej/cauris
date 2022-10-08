const express = require('express');
const { getThreads, createThread } = require('../controllers/thread');
const authorize = require('../middlewares/auth.mw');
const router = express.Router();

router.route('/').get(authorize, getThreads);

router.route('/new').get(authorize, createThread);




module.exports = router;