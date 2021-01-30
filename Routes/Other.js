const router = require('express').Router();




router.post('/top.gg_vote', (req, res) => {
    console.log('BODY \n' + req.body);

    console.log('HEADERS \n' + req.headers);
});



module.exports = {
    end: '/other/',
    router,
};