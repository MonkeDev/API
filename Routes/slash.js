const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello, World')
})

module.exports = {
    end: '/',
    router,
}