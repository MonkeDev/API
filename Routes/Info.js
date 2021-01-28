const router = require('express').Router();


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
            allEnd.push({endPoint: val[0], max: val[1].max, used: val[1].used})
        };

        return res.status(200).json({
            type: 'shared',
            endPoints: allEnd
        });
    };
});


module.exports = {
    end: '/info/',
    router,
};