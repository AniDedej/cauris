const { User } = require("../models/user.model");
const jwt = require('jsonwebtoken');

module.exports.createNewUser = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username.toLowerCase(),
            displayName: req.body.displayName,
            email: req.body.email.toLowerCase(),
            password: req.body.password
        });
        const savedUser = await newUser.save();
        if (savedUser instanceof User) {
            res.status(201).json({
                message: 'User successfully created!',
                result: savedUser
            });
        }
    } catch (err) {
        res.status(409).json({
            message: err
        });
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ $or: [{ email: req.body.userNameOrEmail.toLowerCase() }, { username: req.body.userNameOrEmail.toLowerCase() }] });
        if (foundUser instanceof User) {
            if (foundUser.comparePasswords(req.body.password)) {
                let isLoggedIn = true;
                let firstLogin = false;
                if (foundUser.firstLogin === null) {
                    firstLogin = true;
                } else {
                    if (foundUser.firstLogin) firstLogin = false;
                }
                const savedUser = await User.findByIdAndUpdate(foundUser._id, { isLoggedIn, firstLogin }, {
                    new: true
                });
                if (savedUser instanceof User) {
                    let jwtToken = jwt.sign({
                        email: savedUser.email,
                        userId: savedUser._id
                    }, '123abc1234', { expiresIn: 2.628e+6 });
                    res.status(200).json({
                        token: jwtToken,
                        expiresIn: 2.628e+6,
                        user: {
                            id: savedUser._id,
                            username: savedUser.username,
                            displayName: savedUser.displayName,
                            email: savedUser.email,
                            firstLogin: savedUser.firstLogin,
                            isLoggedIn: savedUser.isLoggedIn
                        }
                    });
                }
            }
        }
    } catch (err) {
        res.status(401).json({
            message: err
        });
    }
}