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
    const { user } = req;
    const { projects, today, challenges, overcome, accomplish, goals } = req.body;
    const date = new Date();

    const newJournal = await Journal.create({
        userId: user.id,
        date,
        projects,
        today,
        challenges,
        overcome,
        accomplish,
        goals
    });

    res.json(newJournal);
});


// ==========>>> Update a Journal Entry by Pk <<<==============
router.put('/:journalId', async (req, res, next) => {
    const { journalId } = req.params;
    const { projects, today, challenges, overcome, accomplish, goals } = req.body;

    const foundJournal = await Journal.findByPk(parseInt(journalId));

    if (!foundJournal) {
        const err = new Error('The journal entry you are trying to update does not exist');
        err.status = 404;
        return next(err)
    }

    foundJournal.set({
        today: today ?? foundJournal.today,
        projects: projects ?? foundJournal.projects,
        challenges: challenges ?? foundJournal.challenges,
        overcome: overcome ?? foundJournal.overcome,
        accomplish: accomplish ?? foundJournal.accomplish,
        goals: goals ?? foundJournal.goals,
    });

    await foundJournal.validate();
    await foundJournal.save();

    res.json(foundJournal);
});


// ===========>>> Delete a Journal Entry by Pk <<<=============
router.delete('/:journalId', async (req, res, next) => {
    const { journalId } = req.params;

    const foundJournal = await Journal.findByPk(parseInt(journalId));

    if (!foundJournal) {
        const err = new Error('The journal entry you are trying to delete does not exist');
        err.status = 404;
        return next(err)
    }

    await foundJournal.destroy();

    res.json({ message: "Journal entry successfully deleted" });
})

module.exports = router
