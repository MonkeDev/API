const router = require('express').Router();
const canvas = require('canvas');
const path = require('path');
const jimp = require('jimp');


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
 *       400:
 *         description: Error
 */
router.get('/gay', async (req, res) => {
    
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
    
    const gay = await canvas.loadImage(path.join(__dirname + '../../Assets', 'gay.png'));
    
    const Canvas = canvas.createCanvas(toLayer.width, toLayer.height);
    const ctx = Canvas.getContext('2d');
    ctx.drawImage(toLayer, 0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(gay, 0, 0, Canvas.width, Canvas.height);

    res.set({'Content-Type': 'image/png'});
    res.status(200).send(Canvas.toBuffer());
});


/**
 * @swagger
 * /canvas/greyscale:
 *   get:
 *     description: Greyscale a image
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
 *       400:
 *         description: Error
 */
router.get('/greyscale', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.greyscale();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


module.exports = {
    end: '/canvas/',
    router,
};