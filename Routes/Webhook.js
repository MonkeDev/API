const router = require('express').Router();



router.post('/heroku_logs', (req, res) => {
    console.log(req.headers);
})



module.exports = {
    end: '/webhook/',
    router,
};