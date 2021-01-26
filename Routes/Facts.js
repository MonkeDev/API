const router = require('express').Router();
const db = new (require('../Database/Manager'))(require('../Database/Schema').facts);

const facts = ['dog', 'cat'];


/**
 * @swagger
 * /facts/cat:
 *  get:
 *    description: Get a random cat fact!
 *    tags: [facts, cat]
 *    responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Error
 * /facts/dog:
 *  get:
 *    description: Get a random dog fact!
 *    tags: [facts, dog]
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