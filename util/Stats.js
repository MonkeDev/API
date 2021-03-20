const { request, response } = require('express');
const stats = require('../Database/Schema').stats;

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {*} mext 
 */
module.exports = async (req, res, next) => {
    next();

    if(!process.info) process.info = { total: 0 };
    process.info.total++;
    
    await stats.updateOne({id: 'me'}, { $inc: { allTime: 1 } });
};