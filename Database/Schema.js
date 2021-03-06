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
    key: { type: String },
    ratelimit: {
        max: { type: Number, default: 300 },
        used: { type: Number, default: 0 }
    },
    stats: {
        total: { type: Number, default: 0 }
    }
}));

const fun = mongo.model('fun', new mongo.Schema({
    for: { type: String },
    data: { type: Array, default: [] }
}));

const stats = mongo.model('stats', new mongo.Schema({
    id: { type: String },

    allTime: { type: Number }

}));

module.exports = {
    imagesAndGifs,
    facts,
    users,
    fun,
    stats
};