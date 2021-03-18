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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });


    let toLayer;
    try {
        toLayer = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    const gay = await canvas.loadImage(path.join(__dirname + '../../Assets', 'gay.png'));

    const Canvas = canvas.createCanvas(toLayer.width, toLayer.height);
    const ctx = Canvas.getContext('2d');
    ctx.drawImage(toLayer, 0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(gay, 0, 0, Canvas.width, Canvas.height);

    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.greyscale();
    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.invert();
    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.sepia();
    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let x = req.urlParams.x;
    let y = req.urlParams.y;

    if (!x && !y) return res.json({
        error: true,
        message: 'Missing both the x and y parameters, please provide at least one'
    });

    if (y) {
        y = Number(y);
        if (!y) return res.status(400).json({
            error: true,
            message: 'Parameter y is not a number type'
        });
        if (y > 2000) return res.status(400).json({
            error: true,
            message: 'Parameter y cannot be larger than 2000'
        });
    }
    if (x) {
        x = Number(x);
        if (!x) return res.status(400).json({
            error: true,
            message: 'Parameter x is not a number type'
        });
        if (x > 2000) return res.status(400).json({
            error: true,
            message: 'Parameter x can not be larger than 2000'
        });
    }

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.resize(x || jimp.AUTO, y || jimp.AUTO);
    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });
    if (!val) return res.status(400).json({
        error: true,
        message: 'Missing the val parameter'
    });

    val = Number(val) || parseInt(val);
    if (val != 0 && !val) return res.status(400).json({
        error: true,
        message: 'the val parameter is not a number type'
    });

    if (val > 1 || val < -1) {
        return res.status(400).json({
            error: true,
            message: 'the val parameter must have a value between -1 to +1.'
        });
    }

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.contrast(val);
    res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(await img.getBufferAsync('image/png'));

});

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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.dither565();
    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.circle();
    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.pixelate(Number(val) || 10);
    res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(await img.getBufferAsync('image/png'));
});

/**
 * @swagger
 * /canvas/80s:
 *   get:
 *     description: This endpoints gives your image an 80s vibe
 *     tags: [Canvas]
 *     parameters:
 *       - name: imgUrl
 *         description: The url of the image.
 *         in: query
 *         required: true
 *         type: string
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
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

    if (!imgUrl) return res.json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });


    let userImg;
    try {
        userImg = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    const Canvas = canvas.createCanvas(userImg.width, userImg.height);
    const ctx = Canvas.getContext('2d');

    ctx.drawImage(userImg, 0, 0, Canvas.width, Canvas.height);

    const input = ctx.getImageData(0, 0, Canvas.width, Canvas.height);
    const output = ctx.createImageData(Canvas.width, Canvas.height);

    const w = input.width, h = input.height;
    const inputData = input.data;
    const outputData = output.data;

    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            for (let c = 0; c < 3; c++) {
                const i = (y * w + x) * 4 + c;
                outputData[i] = 127 + -inputData[i - w * 4 - 4] - inputData[i - w * 4] - inputData[i - w * 4 + 4] +
                    -inputData[i - 4] + 8 * inputData[i] - inputData[i + 4] +
                    -inputData[i + w * 4 - 4] - inputData[i + w * 4] - inputData[i + w * 4 + 4];
            }
            outputData[(y * w + x) * 4 + 3] = 255; // alpha
        }
    }

    ctx.putImageData(output, 0, 0);

    res.set({ 'Content-Type': 'image/png' });
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *       - name: delay
 *         description: The frame delay in MS, Defualt is 40ms
 *         in: query
 *         type: string
 *       - name: size
 *         description: The size of the gif, Default is 300
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

const handCache = [];
router.get('/petpet', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;

    if (!imgUrl) return res.json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });

    let frameDelay = req.urlParams.delay || 40;
    if (!Number(frameDelay)) return res.json({
        error: true,
        message: 'The delay parameter is not a number type'
    });

    let size = req.urlParams.size || 300;
    if (!Number(size)) return res.json({
        error: true,
        message: 'The size parameter is not a number type'
    });
    else size = Number(size);

    if (size > 2000) return res.json({
        error: true,
        message: 'The size parameter cannot be greater than 2000'
    });

    console.log(size);


    let userImg;
    try {
        userImg = await canvas.loadImage(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    const GIF = new gifencoder(size, size);
    GIF.start();
    GIF.setRepeat(0);
    GIF.setDelay(frameDelay);

    const Canvas = canvas.createCanvas(size, size);
    const ctx = Canvas.getContext('2d');

    for (let i = 0; i < 5; i++) {

        const j = i < 5 / 2 ? i : 5 - i,
            width = 0.8 + j * 0.02,
            height = 0.8 - j * 0.05,
            offsetX = (1 - width) * 0.5 + 0.1,
            offsetY = (1 - height) - 0.08;

        if (!handCache[i]) handCache.push(await canvas.loadImage(path.join(__dirname + '../../Assets', `hand${i + 1}.png`)));

        ctx.drawImage(userImg, size * offsetX, size * offsetY, size * width, size * height);
        ctx.drawImage(handCache[i], 0, 0, size, size);
        GIF.addFrame(ctx);

        ctx.clearRect(0, 0, size, size);
    }
    GIF.finish();

    res.set({ 'Content-Type': 'image/gif' }).send(await GIF.out.getData());
});
// brightness


/**
 * @swagger
 * /canvas/brightness:
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
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *       - name: val
 *         description: How bright you want your image from -1 to +1
 *         in: query
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/brightness', async (req, res) => {
    const imgUrl = req.urlParams.imgUrl;
    let val = req.urlParams.val;

    if (!imgUrl) return res.status(400).json({
        error: true,
        message: 'Missing the imgUrl parameter'
    });
    if (!val) return res.status(400).json({
        error: true,
        message: 'Missing the val parameter'
    });

    if (!Number(val)) return res.status(400).json({
        error: true,
        message: 'The val parameter is not a number type'
    });
    else val = Number(val);

    if (val > 1 || val < -1) return res.status(400).json({
        error: true,
        message: 'The val parameter must be between -1 to +1'
    });

    let img;
    try {
        img = await jimp.read(imgUrl);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Failed to load this image'
        });
    }

    img.brightness(val);
    res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(await img.getBufferAsync('image/png'));
});

// Captchgen is undefined(╯°□°）╯︵ ┻━┻

/*router.get('/captcha', async (req, res) => {
    const captch = await captchGen();

    res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(captch);
});*/

router.get('/confused', async (req, res) => {
    res.send({
        nothing: undefined,
        message: 'You seriously checked out this endpoint'
    });
});

module.exports = {
    end: '/canvas/',
    router,
};