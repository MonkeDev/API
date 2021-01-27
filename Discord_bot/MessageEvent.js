const prefix = process.env.botPrefix;
const users = process.s;
module.exports = async (bot, msg) => {

    if(!msg.content.startsWith(prefix) || msg.author.bot || !msg.channel.guild) return;

    let args = msg.content.split(/ +/)
    const cmd = args[0].toLowerCase().slice(prefix.length);
    args = args.slice(1);

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

}