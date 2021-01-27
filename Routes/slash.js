const router = require('express').Router();

/*
router.get('/', (req, res) => {
    res.json({
        facts: {
            dog: '/facts/dog',
            cat: '/facts/cat'
        },
        canvas: {
            gay: '/canvas/gay?imgUrl=<your img url>'
        }
    });
});
*/

router.get('/ip', (req, res) => {
    res.json({ip: req.ip, ips: req.ips});
})
router.get('/', (req, res) => {
    res.redirect('/docs')
})


module.exports = {
    end: '/',
    router,
};