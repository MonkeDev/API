const prefix = process.env.botPrefix;
const users = process.s;
const helpMessage = 
`
\`${prefix}help\` - See how you use me.
\`${prefix}register\` - Register and get your API key.
\`${prefix}info\` -  Get your API key.
\`${prefix}stats\` - See your request stats.
\`${prefix}update\`- Updates your cache.
\`${prefix}top\` - See the top API users.
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
        const USER = msg.mentions[0] || msg.channel.guild.members.get(args[0]) || msg.author;
        const userData = await users.getID(USER.id);
        if(!userData) return msg.channel.createMessage(`You are not registered, \`${prefix}register\``);
        msg.channel.createMessage(`**__Request__**:\n\u3000Total: ${userData.stats.total}\n**__rate limit__**\n\u3000Max: ${userData.ratelimit.max}\n\u3000Used: ${userData.ratelimit.used}`);
    };

    if(cmd == 'update') {
        users.cache.id.delete(msg.author.id);
        msg.channel.createMessage('Your cache has been cleared!');
    };

    if(cmd == 'top') {
        let allUsers = []
        await users.cache.id.forEach(user => {
            allUsers.push(user);
        });

        allUsers = await users.schema.find();
        allUsers = allUsers.sort((a, b) => b.stats.total-a.stats.total);
        allUsers = allUsers.slice(0, 17);
        let desc = '';
        await allUsers.forEach(user => {
            desc += `<@!${user.id}>, ${user.stats.total}\n`
        });

        msg.channel.createMessage({embed: {
            title: 'Top users',
            description: desc,
            color: 0xf7c38e
        }});

    };
}