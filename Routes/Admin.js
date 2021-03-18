const router = require('express').Router();

router.use((req, res, next) => {
    if (!req.headers.auth || req.headers.auth != process.env.apiAdmin) return res.json({ error: true, message: 'no' });
    else next();
});

router.post('/add', async (req, res) => {

    const userID = req.urlParams.userID;
    if (!userID) return req.json({ error: true, message: 'no userID' });

    const amount = parseInt(req.urlParams.amount) || parseInt(req.urlParams.amout); // oops
    if (!amount) return res.json({ error: true, message: 'no amount' });

    const users = process.s;
    const userData = await users.getID(userID);
    if (!userData) return res.json({ error: true, message: 'This user is not registered.' });

    userData.ratelimit.max += amount;

    await users.update(userData).catch(() => null);

    res.json(userData);
});



router.post('/register', async (req, res) => {

    const userID = req.urlParams.userID;
    if (!userID) return req.json({ error: true, message: 'no userID' });

    const users = process.s;

    let userData = await users.getID(userID);
    if (userData) return res.json({
        error: true,
        message: 'You can\'t register again :person_facepalming:'
    });
    userData = await users.create(userID);

    return res.json(userData);
});

router.get('/user/info', async (req, res) => {


    const userID = req.urlParams.userID;

    if (!userID) return req.json({ error: true, message: 'no userID' });

    const users = process.s;

    const userData = await users.getID(userID);

    return res.json(userData);
});

router.get('/users', async (req, res) => {
    const allUsers = [];
    await process.s.cache.id.forEach(user => {
        allUsers.push(user);
    });

    res.json(allUsers);
});

const attachments = require('../Database/Schema').imagesAndGifs;

router.post('/add/attachment', async (req, res) => {
    const FOR = req.urlParams.FOR;
    const url = req.urlParams.url;
    console.log(FOR);

    if (!FOR || !url) return res.status(400).json({ error: true, message: 'FOR and url param.' });

    const FORdata = await attachments.findOne({ for: FOR }).lean();
    console.log(FORdata);
    // new attachments({for: 'bird'}).save();
    if (!FORdata) return res.status(400).json({ error: true, message: 'no data for FOR' });

    attachments.updateOne({ _id: FORdata._id }, { $push: { 'data': url } })
        .then(() => {
            return res.status(200).json({ message: `${url} added to ${FOR} data.` });
        });
});

module.exports = {
    end: '/admin/',
    router,
};