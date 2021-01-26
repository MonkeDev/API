const router = require('express').Router();

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


module.exports = {
    end: '/',
    router,
};