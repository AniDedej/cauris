const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createNewUser, loginUser } = require('../controllers/user');

router.post('/new', [
    check('username', 'Username is required')
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password should be at least 8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 4 })
], createNewUser);

router.post('/login', loginUser);

module.exports = router;