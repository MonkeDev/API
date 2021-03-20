const router = require('express').Router();
const stats = require('../Database/Schema').stats;

/**
 * @swagger
 * /info/ratelimit:
 *   get:
 *     description: View your rate limit
 *     tags: [Info]
 *     parameters:
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
router.get('/ratelimit', (req, res) => {
    if(req.keyData) {
        res.status(200).json({
            type: 'key',
            max: req.keyData.ratelimit.max,
            used: req.keyData.ratelimit.used
        });
    } else {
        const allEnd = [];
        for(let val of req.endPoints) {
            allEnd.push({endPoint: val[0], max: val[1].max, used: val[1].used});
        }

        return res.status(200).json({
            type: 'shared',
            endPoints: allEnd
        });
    }
});

/**
 * @swagger
 * /info:
 *   get:
 *     description: Get some info on the API
 *     tags: [Info]
 *     parameters:
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
let allTimeCache;
router.get('/', async (req, res) => {
    if(!allTimeCache) {
        allTimeCache = (await stats.findOne({id: 'me'})).allTime;
        setTimeout(() => {
            allTimeCache = null;
        }, 10 * 1000);
    };
    res.status(200).json({
        req: {
            allTime: allTimeCache,
            thisProcess: process.info.total
        },
        uptime: process.uptime() * 1000
    });
});


module.exports = {
    end: '/info/',
    router,
};