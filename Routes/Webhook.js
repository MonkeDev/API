const router = require('express').Router();



router.post('/heroku_logs', (req, res) => {
    res.json(req);
})



module.exports = {
    end: '/webhook/',
    router,
};