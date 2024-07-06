const { Op } = require('sequelize');

const { authenticateProjectManager } = require('../../utils/auth');
const { Journal } = require('../../db/models');


const router = require('express').Router();


// =======>>> Get all Questions for Current User <<<========
router.get('/', async (req, res, _next) => {
    const userId = req.user.dataValues.id;

    const listOfJournals = await Journal.findAll({
        where: {
            userId: userId
        },
    });

    res.json({ Journals: listOfJournals });
});

// ========>>> Create New Journal Entry <<< =========
router.post('/new', async (req, res, next) => {
    const userId = req.uer.dataValues.id;
    const { projects, today, challenges, overcome, accomplish, goals } = req.body;

    const newJournal = await Journal.create({
        userId,
        date: new Date().now,
        projects,
        today,
        challenges,
        overcome,
        accomplish,
        goals
    });

    res.json(newJournal);
})

module.exports = router
