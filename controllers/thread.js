const { Thread } = require('../models/thread.model');
module.exports.createThread = async (req, res, next) => {
    try {
        const newThread = new Thread({
            userID: req.decoded.userId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });

        const savedThread = await newThread.save();
        if (savedThread) {
            res.json(savedThread)
        } else {
            throw new Error(savedThread);
        }
    } catch (error) {
        res.json(error)
    }
}
module.exports.getMyThreads = async (req, res, next) => {
    Thread.find({userID: req.decoded.userId}, (err, threads) => {
        if (err) return next(err);
        res.json(threads);
    })
}

module.exports.getAllThreads = async (req, res, next) => {
    Thread.find({}, (err, threads) => {
        if (err) return next(err);
        res.json(threads);
    })
}