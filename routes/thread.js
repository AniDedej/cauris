const express = require('express');
const { getAllThreads, createThread, getMyThreads } = require('../controllers/thread');
const authorize = require('../middlewares/auth.mw');
const router = express.Router();

router.route('/').get(authorize, getAllThreads);
router.route('/me').get(authorize, getMyThreads);

router.route('/new').post(authorize, createThread);




module.exports = router;