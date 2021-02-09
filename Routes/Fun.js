const router = require('express').Router();

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
    const content = req.urlParams.content;

    if(!content || typeof content !== 'string') return res.status(400).json({
        error: true,
        message: 'Missing/Invalid content parameter'
    });
    
    res.status(200).json({
            result: content.split('').reverse().join('')
        });
    });

module.exports = {
    end: '/fun/',
    router,
};