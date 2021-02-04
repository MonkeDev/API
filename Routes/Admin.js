const router = require('express').Router();

router.use((req, res, next) => {
    if(!req.headers.auth || req.headers.auth != process.env.apiAdmin) return res.json({error: true, message: 'no'})
    else next();
})
router.post('/add', async (req, res) => {

    const userID = req.urlParams.userID;
    if(!userID) return req.json({error: true, message: 'no userID'})

    const amount  = parseInt(req.urlParams.amount) || parseInt(req.urlParams.amout); // oops
    if(!amount) return res.json({error: true, message: 'no amount'});

    const users = process.s;
    const userData = await users.getID(userID);
    if(!userData) return res.json({error: true, message: 'This user is not registered.'});

    userData.ratelimit.max += amount ;

    await users.update(userData).catch(() => {null});

    res.json(userData)
});



router.post('/register', async (req, res) => {

    const userID = req.urlParams.userID;
    if(!userID) return req.json({error: true, message: 'no userID'})

    const users = process.s;

    let userData = await users.getID(userID);
    if(userData) return res.json({
        error: true,
        message: 'You can\'t register again :person_facepalming:'
    });
    userData = await users.create(userID);

    return res.json(userData);
});

router.get('/user/info', async (req, res) => {


    const userID = req.urlParams.userID;

    if(!userID) return req.json({error: true, message: 'no userID'});

    const users = process.s;

    const userData = await users.getID(userID);

    return res.json(userData);
});

router.get('/users', (req, res) => {
    const allUsers = []
    await process.s.cache.id.forEach(user => {
        allUsers.push(user);
    });

    res.json(allUsers);
});

module.exports = {
    end: '/admin/',
    router,
};