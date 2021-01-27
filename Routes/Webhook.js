const router = require('express').Router();



router.post('/heroku_logs', (req, res) => {
    console.log(req);
})



module.exports = {
    end: '/webhook/',
    router,
};