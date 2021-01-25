const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        facts: {
            dog: '/facts/dog',
            cat: '/facts/cat'
        }
    })
});

module.exports = {
    end: '/',
    router,
};