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

router.get('/headers', (req, res) => {
    res.json(req.headers);
})
router.get('/', (req, res) => {
    res.redirect('/docs')
})


module.exports = {
    end: '/',
    router,
};