const router = require('express').Router();
const { Client } = require('eris');
const bot = new Client();



router.post('/top.gg_vote', (req, res) => {

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
    let message;

    try {
        
        if(req.urlParams.message) {
            toReplace.forEach(x => {
                req.urlParams.message = req.urlParams.message.split(x.in).join(x.out);
            });
            message = JSON.parse(req.urlParams.message);
        } else {
            message = { 
                content: req.urlParams.message || `<@!${req.body.user}>, Thank you for voting for <@!${req.body.bot}>!`
            }
        }

    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to parse message content.'
        });
    };

    try {
        bot.executeWebhook(webhookID, webhookToken, message);
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: true,
            message: `${err}`
        });
    };   
    
    res.status(200).json({message: 'Sent'});
});



module.exports = {
    end: '/other/',
    router,
};