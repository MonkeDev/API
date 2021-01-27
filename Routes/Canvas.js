const router = require('express').Router();
const canvas = require('canvas');
const path = require('path');


/**
 * @swagger
 * /canvas/gay:
 *   get:
 *     description: Make a image gay
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
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
 */
router.get('/gay', async (req, res) => {
    const gay = await canvas.loadImage(path.join(__dirname + '../../Assets', 'gay.png'));
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let toLayer;
    try{
        toLayer = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };
    
    
    const Canvas = canvas.createCanvas(toLayer.width, toLayer.height);
    const ctx = Canvas.getContext('2d');
    ctx.drawImage(toLayer, 0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(gay, 0, 0, Canvas.width, Canvas.height);

    res.set({'Content-Type': 'image/png'});
    res.status(200).send(Canvas.toBuffer());
});


module.exports = {
    end: '/canvas/',
    router,
};