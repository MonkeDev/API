const mongo = require('mongoose');
module.exports = async () => {
    mongo.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        useFindAndModify: false
    });

    return new Promise(res => {
        mongo.connection.once('connected', () => {
            console.log('MongoDB connected!');
            res();
        });
    }); 
};