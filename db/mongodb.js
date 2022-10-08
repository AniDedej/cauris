const mongoose = require('mongoose');
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// mongoose.Promise = global.Promise;

main().catch(err => console.error('Error connecting to mongo', err.reason));

async function main() {
    await mongoose.connect(mongoURI, {useNewUrlParser: true}).then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    });
}

module.exports = { mongoose, db: mongoose.connection };