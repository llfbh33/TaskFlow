const { Op } = require('sequelize');

const { authenticateProjectManager } = require('../../utils/auth');
const { Question } = require('../../db/models');


const router = require('express').Router();


// =======>>> Get all Questions for Current User <<<========
router.get('/', async (req, res, _next) => {
    const userId = req.user.dataValues.id;

    const listOfQuestions = await Question.findAll({
        where: {
            userId: userId
        },
    });

    res.json({ Questions: listOfQuestions });
});

// ========>>> Get All Questions Associated with Specified Keywords <<<=========
router.get('/keyWord', async (req, res, next) => {
    const { keyWord } = req.params;
    const keywordArray = keyWord.split(',');

    const conditions = keywordArray.map(keyword => ({ [Op.like]: `%${keyword.trim()}%` }));

    const listOfQuestions = await Question.findAll({
        where: {
            keyWords: {
                [Op.and]: conditions
            }
        }
    });

    if (listOfQuestions.length === 0) {
        const err = new Error("There are not yet any questions associated with the given keyword/words");
        err.status = 404;
        return next(err);
    };

    res.json({ Questions: listOfQuestions });
});



// ========>>> Create a new Question <<<========
router.post('/new', async (req, res, next) => {
    const { userId, question, answer, keyWords } = req.body;

    const newQuestion = await Question.create({
        userId,
        question,
        answer: answer || null,
        keyWords,
    });

    res.json(newQuestion);
});


// =========>>> Update a Question by Id <<<========
router.put('/:questionId', async (req, res, next) => {
    const { questionId } = req.params;
    console.log('===========>>', 'hello')
    const foundQuestion = await Question.findByPk(parseInt(questionId));

    const { question, answer, keyWords } = req.body;
    console.log('===============>>>>', answer)
    foundQuestion.set({
        question: question || foundQuestion.question,
        answer: answer || foundQuestion.answer,
        keyWords: keyWords || foundQuestion.keyWords
    });

    await foundQuestion.validate();
    await foundQuestion.save();

    res.json(foundQuestion);
});

// =======>>> Delete a Quetion <<<=======
router.delete('/:questionId/delete', async (req, res, next) => {
    const { questionId } = req.params;

    const foundQuestion = await Question.findByPk(parseInt(questionId));

    if (!foundQuestion) {
        const err = new Error("The question you are looking for does not exist");
        err.status = 404;
        return next(err);
    }

    await foundQuestion.destroy();

    res.json({ "message": "Question successfully deleted" })
})

module.exports = router;
