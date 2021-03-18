const router = require('express').Router();
const { Client } = require('eris');
const bot = new Client();
const canvas = require('canvas');
const path = require('path');


/**
 * @swagger
 * /other/top.gg_vote:
 *   post:
 *     description: Top.gg vote logs with a discord webhook
 *     tags: [Other]
 *     parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *       - name: webhookToken
 *         description: The token of the webhook to execute 
 *         in: query
 *         required: true
 *         type: string
 *       - name: webhookID
 *         description: The ID of the webhook to execute 
 *         in: query
 *         required: true
 *         type: string
 *       - name: message
 *         description: The message object to send to the webhook (https://discord.com/developers/docs/resources/webhook#execute-webhook), $USER_ID will be replaced with the voter's ID, $USER_ID will be replaced with the bot's ID, $IS_WEEKEND if it is the weekend it will be replaced with true if not false.
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
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
                content: req.urlParams.message || `<@!${req.body.user || '000000000000000000'}>, Thank you for voting for <@!${req.body.bot || '000000000000000000'}>!`
            };
        }

    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to parse message content.'
        });
    }

    try {
        bot.executeWebhook(webhookID, webhookToken, message);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: true,
            message: `${err}`
        });
    }
    
    res.status(200).json({message: 'Sent'});
});


let gavCahce;
/**
 * @swagger
 * /other/gav:
 *   get:
 *     description: Gav
 *     tags: [Other]
 *     parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *       - name: imgUrl
 *         description: The url of the image to place on gav.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/gav', async (req, res) => {
    
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.json({
        error: true,
        message: 'Missing imgUrl param'
    });


    let toPlace;
    try{
        toPlace = await canvas.loadImage(imgUrl);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    }

    let gav;
    if(gavCahce) gav = gavCahce;
    else gav = await canvas.loadImage(path.join(__dirname + '../../Assets', 'gav.png'));


    const Canvas = canvas.createCanvas(gav.width, gav.height);
    const ctx = Canvas.getContext('2d');
    ctx.drawImage(gav, 0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(toPlace, 270, 70, 60, 60);


    res.set({'Content-Type': 'image/png'});
    res.status(200).send(Canvas.toBuffer());
});


module.exports = {
    end: '/other/',
    router,
};