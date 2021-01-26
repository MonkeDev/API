const mongo = require('mongoose');

const imagesAndGifs = mongo.model('imagesAndGifs', new mongo.Schema({
    for: { type: String },
    data: { type: Array, default: [] }
}));

const facts = mongo.model('facts', new mongo.Schema({
    for: { type: String },
    data: { type: Array, default: [] }
}));

const users = mongo.model('users', new mongo.Schema({
    id: { type: String },
    key: { type: String, required: false },
    ratelimit: {
        max: { type: Number, default: 200 },
        used: { type: Number, default: 0 }
    },
    stats: {
        total: { type: Number, default: 0 }
    }
}));


module.exports = {
    imagesAndGifs,
    facts,
    users
}