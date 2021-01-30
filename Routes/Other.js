const router = require('express').Router();
const { Client } = require('eris');
const bot = new Client();



router.post('/top.gg_vote', (req, res) => {

    console.log(req.body)

    const webhookID = req.urlParams.webhookID;
    if(!webhookID) return res.status(400).json({
        error: true,
        message: 'A webhookID was not provided.'
    });
    const webhookToken = req.urlParams.webhookToken;
    if(!webhookToken) return res.status(400).json({
        error: true,
        message: 'A webhookToken was not provided.'
    });
    
    let message;
    if(req.urlParams.message) {
        message = JSON.parse(req.urlParams.message);
    } else {
        message = { 
            content: req.urlParams.message || `<@!$USER_ID>, Thank you for voting for <@!$BOT_ID>!`
        }
    }
    console.log(message);

    const toReplace = [
        {
            in: '$USER_ID',
            out: req.body.user
        },
        {
            in: '$BOT_ID',
            out: req.body.bot
        },
        {
            in: '$IS_WEEKEND',
            out: req.body.isWeekend
        }
    ];

    try {

        if(message === req.urlParams.message && typeof message == 'object') {
            toReplace.forEach(x => {
                message.content = message.content.split(x.in).join(x.out);
            });
        } else {
            toReplace.forEach(x => {
                message.content = message.content.split(x.in).join(x.out);
            });
        };

        bot.executeWebhook(webhookID, webhookToken, message);
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: true,
            message: `${err}`
        });
    };   
    
    
    

    /* 

    console.log('BODY');
    console.log(req.body);

    console.log('HEADERS');
    console.log(req.headers);

    res.send('ok');
    */
});



module.exports = {
    end: '/other/',
    router,
};