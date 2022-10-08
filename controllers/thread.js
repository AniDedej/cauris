const { Thread } = require('../models/thread.model');
module.exports.createThread = async (req, res, next) => {
    try {
        const newThread = new Thread({
            userID: req.decoded.userId,
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

module.exports.getThreads = async (req, res, next) => {

}