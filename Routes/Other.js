const router = require('express').Router();




router.post('/top.gg_vote', (req, res) => {
    console.log('BODY');
    console.log(req.body);

    console.log('HEADERS');
    console.log(req.headers);
});



module.exports = {
    end: '/other/',
    router,
};