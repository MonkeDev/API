const prefix = process.env.botPrefix;
const users = process.s;
const helpMessage = 
`
\`${prefix}help\` - See how you use me.
\`${prefix}register\` - Register and get your API key.
\`${prefix}info\` -  Get your API key.
\`${prefix}stats\` - See your request stats.
`
module.exports = async (bot, msg) => {

    if(msg.content == `<@${bot.user.id}>` || msg.content == `<@!${bot.user.id}>`) {
        msg.channel.createMessage(helpMessage);
    };

    if(!msg.content.startsWith(prefix) || msg.author.bot || !msg.channel.guild) return;

    let args = msg.content.split(/ +/)
    const cmd = args[0].toLowerCase().slice(prefix.length);
    args = args.slice(1);

    

    if(cmd == 'help') {
        msg.channel.createMessage(helpMessage);
    };

    if(cmd == 'register') {
        let userData = await users.getID(msg.author.id);
        if(userData) return msg.channel.createMessage('You cant register again :person_facepalming:');
        userData = await users.create(msg.author.id);

        const message = await msg.channel.createMessage('You are now registered, I will DM you your info!');
        bot.getDMChannel(msg.author.id).then(c => {
            c.createMessage(`**___MonkeDev - API___**\nID: \`${userData.id}\`\nKEY: \`${userData.key}\``).catch(() => {
                message.edit('Please enable your DMs so I can dm you your info!')
            });
        });
    };

    if(cmd == 'info') {
        const userData = await users.getID(msg.author.id);
        if(!userData) return msg.channel.createMessage(`You are not registered, \`${prefix}register\``);
        const message = await msg.channel.createMessage('I will DM you your info!');
        bot.getDMChannel(msg.author.id).then(c => {
            c.createMessage(`**___MonkeDev - API___**\nID: \`${userData.id}\`\nKEY: \`${userData.key}\``).catch(() => {
                message.edit('Please enable your DMs so I can dm you your info!')
            });
        });
    };

    if(cmd == 'stats') {
        const userData = await users.getID(msg.author.id);
        if(!userData) return msg.channel.createMessage(`You are not registered, \`${prefix}register\``);
        msg.channel.createMessage(`You have made a request to our API ${userData.stats.total} time(s)`);
    };
}