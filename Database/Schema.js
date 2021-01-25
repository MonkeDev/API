const mongo = require('mongoose');

const imagesAndGifs = mongo.model('imagesAndGifs', new mongo.Schema({
    for: { type: String },
    data: { type: Array, default: [] }
}));

const facts = mongo.model('facts', new mongo.Schema({
    for: { type: String },
    data: { type: Array, default: [] }
}));


module.exports = {
    imagesAndGifs,
    facts
}