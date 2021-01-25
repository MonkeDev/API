const mongo = require('mongoose');
module.exports = () => {
    mongo.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        useFindAndModify: false
    });

    mongo.connection.once('connected', () => {
        console.log('MongoDB connected!');
    });
};