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
 *     description: Add a greyscale filter to a image
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

    if(!imgUrl) return res.status(400).json({
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


/**
 * @swagger
 * /canvas/invert:
 *   get:
 *     description: Add a invert filter to a image
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
router.get('/invert', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
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

    img.invert();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


/**
 * @swagger
 * /canvas/sepia:
 *   get:
 *     description: Add a sepia filter to a image
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
router.get('/sepia', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
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

    img.sepia();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});


/**
 * @swagger
 * /canvas/resize:
 *   get:
 *     description: Resize a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: x
 *         description: The new width of the image
 *         in: query
 *         type: string
 *       - name: y
 *         description: The new height of the image
 *         in: query
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
router.get('/resize', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let x = req.urlParams.x;
    let y = req.urlParams.y;

    if(!x && !y) return res.json({
        error: true,
        message: 'Missing both x and y params, Please give atleast one.'
    });

    if(y) {
        y = Number(y);
        if(!y) return res.status(400).json({
            error: true,
            message: 'Param y is not a number.'
        });
        if(y > 2000) return res.status(400).json({
            error: true,
            message: 'Param y can not be larger then 2000'
        });
    };
    if(x) {
        x = Number(x);
        if(!x) return res.status(400).json({
            error: true,
            message: 'Param x is not a number.'
        });
        if(x > 2000) return res.status(400).json({
            error: true,
            message: 'Param x can not be larger then 2000'
        });
    };

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.resize(x || jimp.AUTO, y || jimp.AUTO);
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});

/**
 * @swagger
 * /canvas/contrast:
 *   get:
 *     description: Add a contrast filter to a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: val
 *         description: The contrast by a value -1 to +1
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
router.get('/contrast', async (req, res) => {

    const imgUrl = req.urlParams.imgUrl;
    let val = req.urlParams.val;

    if(!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing imgUrl param.'
    });
    if(!val) return res.status(400).json({
        error: true,
        message: 'Missing val param.'
    });

    val = Number(val);
    if(!val) return res.status(400).json({
        error: true,
        message: 'val param is not a number.'
    });

    if(val > 1 || val < -1) {
        return res.status(400).json({
            error: true,
            message: 'val param most have a value of -1 to +1.'
        });
    };

    let img;
    try{
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    img.contrast(val);
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));

})

/**
 * @swagger
 * /canvas/dither565:
 *   get:
 *     description: Add a dither565 filter to a image
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
router.get('/dither565', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.status(400).json({
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

    img.dither565();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});

module.exports = {
    end: '/canvas/',
    router,
};