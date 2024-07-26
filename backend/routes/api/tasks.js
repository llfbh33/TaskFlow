const { Op } = require('sequelize');

const { authenticateProjectManager, userOwnsElement } = require('../../utils/auth');
const { Task } = require('../../db/models');

const router = require('express').Router();



// =======>>>  Get all Tasks for Current User  <<<=========
router.get('/', async (req, res, _next) => {
    const userId = req.user.dataValues.id;

    const listOfTasks = await Task.findAll({
        where: {
            userId: userId
        },
    });

    res.json({ Tasks: listOfTasks });
});


// =======>>> Get a Single Task by Id <<<=======
router.get('/:taskId', userOwnsElement, async (req, res, next) => {
    const { taskId } = req.params;

    const foundTask = await Task.findOne({
        where: {
            id: taskId
        },
    });

    if (!foundTask) {
        const err = new Error("The task you are looking for does not exist");
        err.status = 404;
        return next(err);
    };

    res.json(foundTask)
});


// ==========>>> Create a New Task <<<======
// add validations
router.post('/new', async (req, res, next) => {
    const { userId, task, isComplete, date } = req.body;

    const newTask = await Task.create({
        userId,
        task,
        isComplete,
        date
    });

    res.json(newTask);

});


// ========>>>  Update a task by Id  <<<========
// Will also need to add validations to this to be sure that the task exists before checking if the user id matches
router.put('/complete/:taskId', userOwnsElement, async (req, res, next) => {
    const { taskId } = req.params;

    const foundTask = await Task.findByPk(taskId);

    foundTask.set({
        isComplete: true,
        updatedAt: new Date().now
    });

    await foundTask.validate();
    await foundTask.save();

    res.json(foundTask);
});



// ========>>>  Update a task by Id  <<<========
// Will also need to add validations to this to be sure that the task exists before checking if the user id matches
router.put('/:taskId', userOwnsElement, async (req, res, next) => {
    const { taskId } = req.params;

    const foundTask = await Task.findByPk(taskId);
    const { task, isComplete, date } = req.body;

    foundTask.set({
        task: task || foundTask.task,
        isComplete: isComplete || foundTask.isComplete,
        date: date || foundTask.date,
        updatedAt: new Date().now
    });

    await foundTask.validate();
    await foundTask.save();

    res.json(foundTask);
});


// ==========>>> Delete a Task <<<<++++++++
router.delete('/:taskId/delete', async (req, res, next) => {
    const { taskId } = req.params;
    console.log('========>', taskId)
    const foundTask = await Task.findByPk(parseInt(taskId));

    await foundTask.destroy();

    res.json({ "message": "Task successfully deleted"})
});



module.exports = router;



// Need to change userOwnsElement to user owns task
    // this validation will also check that the task exists so we don't need to in the route
// update each necessary route to include userOwnsTask
// Create validations on creating and updating a task
// Add validation functions to create and validate task routes
