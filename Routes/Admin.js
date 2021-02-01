const router = require('express').Router();

router.post('/add', async (req, res) => {

    if(!req.headers.auth || req.headers.auth != process.env.apiAdmin) return res.json({error: true, message: 'no'})

    const userID = req.urlParams.userID;
    const amout = parseInt(req.urlParams.amout);
    
    const users = process.s;
    const userData = await users.getID(userID);
    if(!userData) return res.json({error: true, message: 'This user is not registered.'});

    userData.ratelimit.max += amout;

    await users.update(userData).catch(() => {null});

    res.json(userData)
});


module.exports = {
    end: '/admin/',
    router,
};