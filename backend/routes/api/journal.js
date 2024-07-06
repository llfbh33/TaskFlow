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

module.exports = router
