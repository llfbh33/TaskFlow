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
    const userId = req.user.dataValues.id;
    const { projects, today, challenges, overcome, accomplish, goals } = req.body;
    const date = new Date();

    const newJournal = await Journal.create({
        userId,
        date,
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
