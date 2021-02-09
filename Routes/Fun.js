const router = require('express').Router();
const db = new (require('../Database/Manager'))(require('../Database/Schema').fun);

/**
 * @swagger
 * /fun/shuffle:
 *   get:
 *     description: Randomizes a string
 *     tags: [Fun]
 *     parameters:
 *       - name: content
 *         description: The content that you want to shuffle
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/shuffle', async (req, res) => {
    const content = req.urlParams.content;

    if(!content || typeof content !== 'string') return res.status(400).json({
        error: true,
        message: 'Missing/Invalid content parameter'
    });
    
    const arr = content.split("");

    for(let i = arr.length - 1; i > 0; i = i - 1) {
        let num = Math.floor(Math.random() * (i + 1)),
        char = arr[i];
        arr[i] = arr[num];
        arr[num] = char;
    }

    res.status(200).json({
        result: arr.join('')
    });
});
/**
 * @swagger
 * /fun/reverse:
 *   get:
 *     description: Reverses a string
 *     tags: [Fun]
 *     parameters:
 *       - name: content
 *         description: The content that you want to reverse
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/reverse', async (req, res) => {

    // https://discord.com/channels/767569427935133736/779441456464003122/808357425341661205
    
    const content = req.urlParams.content;

    if(!content || typeof content !== 'string') return res.status(400).json({
        error: true,
        message: 'Missing/Invalid content parameter'
    });
    
    res.status(200).json({
        result: content.split('').reverse().join('')
    });
    
});


/**
 * @swagger
 * /fun/8ball:
 *   get:
 *     description: Gives a random 8ball responce
 *     tags: [Fun]
 *     parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/8ball', async (req, res) => {
    const data = await db.get('8ball');
    res.status(200).json({
        answer: data.data[Math.floor(Math.random() * data.data.length)]
    });
});

module.exports = {
    end: '/fun/',
    router,
};