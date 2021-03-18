const router = require('express').Router();
const path = require('path');

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


router.get('/', (req, res) => {
    res.redirect('/docs');
});
router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname + '../../Assets', 'monke.png'));
});


module.exports = {
    end: '/',
    router,
};