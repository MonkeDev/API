const router = require('express').Router();
const db = new (require('../Database/Manager'))(require('../Database/Schema').facts);

const facts = ['dog', 'cat', 'monkey'];


/**
 * @swagger
 * /facts/cat:
 *  get:
 *    description: Get a random cat fact!
 *    tags: [Facts]
 *    parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Error
 * /facts/dog:
 *  get:
 *    description: Get a random dog fact!
 *    tags: [Facts]
 *    parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Error
 * /facts/monkey:
 *  get:
 *    description: Get a random monkey fact!
 *    tags: [Facts]
 *    parameters:
 *       - name: key
 *         description: Your API key, Join our discord server to get one (https://monkedev.com/r/discord)
 *         in: query
 *         type: string
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Error
*/

facts.forEach(fact => {
    router.get('/' + fact, async (req, res) => {
        const data = await db.get(fact);
        res.status(200).json({
            fact: data.data[Math.floor(Math.random() * data.data.length)]
        });
    });
});

module.exports = {
    end: '/facts/',
    router,
};