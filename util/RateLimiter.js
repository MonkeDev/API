
const endPoints = new Map();

module.exports = async (req, res, next) => {

    const s = process.s;

    if(req.originalUrl.startsWith('/docs') || req.originalUrl == '/' || req.originalUrl == '/favicon.ico') return next();

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
            setTimeout(() => {
                keyData.ratelimit.used -= 1;
            }, 60 * 1000);
        };

        req.keyData = keyData;

    } else {
        let endData = await endPoints.get(endPoint);
        if(!endData) {
            endPoints.set(endPoint, { max: 500, used: 0 });
            endData = await endPoints.get(endPoint);
        };
        
        if(endData.used > endData.max) {
            return res.json({error: true, message: `This endPoint is at its max of ${endData.max} request per minute, You can use a API key to bypass this. Join our discord server (https://monke.vip/discord) to get your key for FREE.`});
        } else {
            endData.used++;
            setTimeout(() => {
                endData.used -= 1;
            }, 60 * 1000);
        };

        req.endPoints = endPoints;

    };

    


    next();

}