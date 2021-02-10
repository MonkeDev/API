const router = require('express').Router();
const canvas = require('canvas');
const path = require('path');
const jimp = require('jimp');
const gifencoder = require('gifencoder'); 


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

    val = Number(val) || parseInt(val);
    if(val != 0 && !val) return res.status(400).json({
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


/**
 * @swagger
 * /canvas/circle:
 *   get:
 *     description: Turn a image into a circle
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
router.get('/circle', async (req, res) => {
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

    img.circle();
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});

/**
 * @swagger
 * /canvas/pixelate:
 *   get:
 *     description: Pixelate a image
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: val
 *         description: The pixelate level
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
router.get('/pixelate', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;
    const val = req.urlParams.val;

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

    img.pixelate(Number(val) || 10);
    res.set({'Content-Type': 'image/png'});
    res.status(200).send(await img.getBufferAsync('image/png'));
});

/**
 * @swagger
 * /canvas/80s:
 *   get:
 *     description: Well idk it just gives off a 80s vibe
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
router.get('/80s', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.json({
        error: true,
        message: 'Missing imgUrl param'
    });


    let userImg;
    try{
        userImg = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };
    

    
    const Canvas = canvas.createCanvas(userImg.width, userImg.height);
    const ctx = Canvas.getContext('2d');
    
    ctx.drawImage(userImg, 0, 0, Canvas.width, Canvas.height);

    const input = ctx.getImageData(0, 0, Canvas.width, Canvas.height);

    const output = ctx.createImageData(Canvas.width, Canvas.height);

    const w = input.width, h = input.height;
    const inputData = input.data;
    const outputData = output.data;

    for (let y = 1; y < h-1; y++) {
        for (let x = 1; x < w-1; x++) {
          for (let c = 0; c < 3; c++) {
            const i = (y*w + x)*4 + c;
            outputData[i] = 127 + -inputData[i - w*4 - 4] -   inputData[i - w*4] - inputData[i - w*4 + 4] +
                                  -inputData[i - 4]       + 8*inputData[i]       - inputData[i + 4] +
                                  -inputData[i + w*4 - 4] -   inputData[i + w*4] - inputData[i + w*4 + 4];
          }
          outputData[(y*w + x)*4 + 3] = 255; // alpha
        }
    }

    ctx.putImageData(output, 0, 0);

    res.set({'Content-Type': 'image/png'});
    res.status(200).send(Canvas.toBuffer());
    
});


/**
 * @swagger
 * /canvas/petpet:
 *   get:
 *     description: Generate a petpet gif!
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image to pet.
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monke.vip/discord)
 *         in: query
 *         type: string
 *       - name: delay
 *         description: The frame delay in MS, Defualt is 40ms
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

const petpetImgs = new Map();
router.get('/petpet', async (req, res) => {

    const imgUrl = req.urlParams.imgUrl;

    if(!imgUrl) return res.json({
        error: true,
        message: 'Missing imgUrl param'
    });

    let frameDelay = req.urlParams.delay || 40;
    if(!Number(frameDelay)) return res.json({
        error: true,
        message: 'Param delay is not a number'
    });


    let userImg;
    try{
        userImg = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load image.'
        });
    };

    let hand1, hand2, hand3, hand4, hand5;
    hand1 = await petpetImgs.get('hand1');
    if(!hand1) {
        hand1 = await canvas.loadImage(path.join(__dirname + '../../Assets', 'hand1.png'));
        petpetImgs.set('hand1', hand1);
    };

    hand2 = await petpetImgs.get('hand2');
    if(!hand2) {
        hand2 = await canvas.loadImage(path.join(__dirname + '../../Assets', 'hand2.png'));
        petpetImgs.set('hand2', hand2);
    };
    
    hand3 = await petpetImgs.get('hand3');
    if(!hand3) {
        hand3 = await canvas.loadImage(path.join(__dirname + '../../Assets', 'hand3.png'));
        petpetImgs.set('hand3', hand3);
    };

    hand4 = await petpetImgs.get('hand4');
    if(!hand4) {
        hand4 = await canvas.loadImage(path.join(__dirname + '../../Assets', 'hand4.png'));
        petpetImgs.set('hand4', hand4);
    };

    hand5 = await petpetImgs.get('hand5');
    if(!hand5) {
        hand5 = await canvas.loadImage(path.join(__dirname + '../../Assets', 'hand5.png'));
        petpetImgs.set('hand5', hand5);
    };

    const GIF = new gifencoder(400, 400);
    GIF.start();
    GIF.setRepeat(0);
    GIF.setDelay(frameDelay);

    const Canvas = canvas.createCanvas(400, 400);
    const ctx = Canvas.getContext("2d");

    ctx.drawImage(userImg, 30, 45, Canvas.width, Canvas.height);
    ctx.drawImage(hand1, 0, 0, Canvas.width, Canvas.height);
    GIF.addFrame(ctx);

    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(userImg, 55, 70, Canvas.width, Canvas.height);
    ctx.drawImage(hand2, 0, 0, Canvas.width, Canvas.height);
    GIF.addFrame(ctx);

    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(userImg, 65, 80, Canvas.width, Canvas.height);
    ctx.drawImage(hand3, 0, 0, Canvas.width, Canvas.height);
    GIF.addFrame(ctx);


    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(userImg, 50, 75, Canvas.width, Canvas.height);
    ctx.drawImage(hand4, 0, 0, Canvas.width, Canvas.height);
    GIF.addFrame(ctx);


    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(userImg, 33, 57, Canvas.width, Canvas.height);
    ctx.drawImage(hand5, 0, 0, Canvas.width, Canvas.height);
    GIF.addFrame(ctx);

    
    GIF.finish();

    res.set({'Content-Type': 'image/gif'});

    res.send(await GIF.out.getData());


});


// brightness

module.exports = {
    end: '/canvas/',
    router,
};