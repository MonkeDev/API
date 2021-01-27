const router = require('express').Router();



router.post('/heroku_logs', (req, res) => {
    console.log(req.headers);
    res.send('ok')
})



module.exports = {
    end: '/webhook/',
    router,
};