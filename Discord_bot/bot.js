const { Client } = require('eris');

class ExtendedClinet extends Client {
    constructor(token, options) {
        super(token, options);
    }
}

const bot = new ExtendedClinet(process.env.botToken, {});
bot.connect();

bot.on('messageCreate', m => require('./MessageEvent')(bot, m));