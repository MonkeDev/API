const router = require('express').Router();
const db = new (require('../Database/Manager'))(require('../Database/Schema').imagesAndGifs);


/**
 * @swagger
 * /attachments/monkey:
 *  get:
 *    description: Get a random monkey image/gif!
 *    tags: [Attachments]
 *    parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Error
*/


router.get('/monkey', async (req, res) => {
    const data = await db.get('monkey');
    res.status(200).json({
        url: data.data[Math.floor(Math.random() * data.data.length)]
    });
});

/**
 * @swagger
 * /attachments/bird:
 *  get:
 *    description: Get a random bird image/gif!
 *    tags: [Attachments]
 *    parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Error
*/


router.get('/bird', async (req, res) => {
    const data = await db.get('bird');
    res.status(200).json({
        url: data.data[Math.floor(Math.random() * data.data.length)]
    });
});


module.exports = {
    end: '/attachments/',
    router,
};