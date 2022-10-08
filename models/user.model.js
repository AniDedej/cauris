const { mongoose } = require('../db/mongodb');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const { nanoid } = require('nanoid');

const UserSchema = new Schema({
    _id: String,
    username: { type: String, unique: true },
    displayName: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: Date,
    firstLogin: Boolean,
    isLoggedIn: Boolean
});

UserSchema.plugin(uniqueValidator, { message: '{VALUE} already in use!' });

UserSchema.pre('save', function(next) {
    let user = this;
    user._id = nanoid(14);
    user.createdAt = new Date();
    user.firstLogin = null;
    user.isLoggedIn = false;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    });
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };