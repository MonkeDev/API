const router = require('express').Router();
const canvas = require('canvas');
const path = require('path');


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
        return res.json({
            error: true,
            message: 'Failed to load image.'
        });
    };
    
    
    const Canvas = canvas.createCanvas(toLayer.width, toLayer.height);
    const ctx = Canvas.getContext('2d');
    ctx.drawImage(toLayer, 0, 0, Canvas.width, Canvas.height);
    ctx.drawImage(gay, 0, 0, Canvas.width, Canvas.height);

    res.set({'Content-Type': 'image/png'});
    res.send(Canvas.toBuffer());
});


module.exports = {
    end: '/canvas/',
    router,
};