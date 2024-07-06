const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const resourcesRouter = require('./resources.js');
const tasksRouter = require('./tasks.js');
const questionRouter = require('./questions.js')
const journalRouter = require('./journal.js')
const { restoreUser } = require('../../utils/auth.js');  // import restore user function

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/resources', resourcesRouter);
router.use('/tasks', tasksRouter);
router.use('/questions', questionRouter);
router.use('/journals', journalRouter);


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
});

module.exports = router;
