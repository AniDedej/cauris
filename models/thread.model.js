const { mongoose } = require('../db/mongodb');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    userID: { type: String, ref: 'User' },
    images: [{ type: String }],
    description: String,
    price: Number,
    createdAt: Date
});

ThreadSchema.pre('save', function(next) {
    let thread = this;
    thread.createdAt = new Date();
    next();
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = { Thread };