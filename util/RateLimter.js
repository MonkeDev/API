
const endPoints = new Map();

module.exports = async (req, res, next) => {

    const s = process.s;

    if(req.originalUrl.startsWith('/docs/') || req.originalUrl == '/') return next();

    const key = req.urlParams.key;
    const endPoint = req.originalUrl.split('?')[0]

    if(key) {
        const keyData = await s.getKey(key);
        if(!keyData) return res.json({error: true, message: 'An invalid key was givin.'});
        keyData.stats.total++;


        if(keyData.ratelimit.used > keyData.ratelimit.max) {
            return res.json({error: true, message: `You have been ratelimited (${keyData.ratelimit.max}/m), If you want this number higher join our discord server and ask! (https://monke.vip/discord)`})
        } else {
            keyData.ratelimit.used++;
            console.log(keyData.ratelimit.used)
            setTimeout(() => {
                keyData.ratelimit.used -= 1;
                console.log(keyData.ratelimit.used)
            }, 30 * 1000);
        }
    } else {

    }


    next()

}