const router = require('express').Router();
const db = new (require('../Database/Manager'))(require('../Database/Schema').facts);

const facts = ['dog', 'cat'];

facts.forEach(fact => {
    router.get('/' + fact, async (req, res) => {
        const data = await db.get(fact);
        res.json({
            fact: data.data[Math.floor(Math.random() * data.data.length)]
        });
    });
});

module.exports = {
    end: '/facts/',
    router,
};