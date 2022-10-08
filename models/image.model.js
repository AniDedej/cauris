const mongoose = require('../db/mongodb');
const { nanoid } = require('nanoid');

const ImageSchema = new mongoose.Schema({
    _id: String,
    userId: {type: String, ref: 'UserDetails'},
    data: Buffer,
    contentType: String,
    isAvatar: Boolean,
    uploadedAt: Date
});

ImageSchema.pre('save', function(next) {
    let image = this;
    image._id = nanoid(14);
    image.uploadedAt = new Date();
    next();
});

const model = mongoose.model('Image', ImageSchema);

module.exports = model;