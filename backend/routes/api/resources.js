const { Op, sequelize } = require('sequelize');

const { authenticateProjectManager } = require('../../utils/auth');

const { Resource, User } = require('../../db/models');

const router = require('express').Router();


// =======>>>  Get all Resources  <<<=========
router.get('/', async (_req, res, _next) => {

    const listOfResources = await Resource.findAll({
        attributes: ["id", "userId", "name", "url", "keyWords"],
        include: [{
            model: User,
            attributes: ["name", "username"]
        }]
    });

    res.json({ Resources: listOfResources })
});


// ========>>> Get all Resources with a specific keyword  <<<========
router.get('/key/:keyWord', async (req, res, next) => {
    const { keyword } = req.params;
    console.log(keyword)
    const listOfResources = await Resource.findAll({
        where: {
            keyWord: {
                [Op.like]: `%${keyword}%`
            }
        },
        attributes: ["id", "userId", "name", "url", "keyWords"],
        include: [{
            model: User,
            attributes: ["name", "username"]
        }]
    });

    if (!listOfResources) {
        const err = new Error("There are not yet any resources associated with the given keyword");
        err.status = 404;
        return next(err);
    };

    res.json({ Resources: listOfResources })

});


// =======>>> Get a Single Resource by Id <<<=======
router.get('/:resourceId', async (req, res, next) => {
    const { resourceId } = req.params;

    const resource = await Resource.findOne({
        where: {
            id: resourceId
        },
        attributes: ["id", "userId", "name", "url", "keyWords"],
        include: [{
            model: User,
            attributes: ["name", "username"]
        }]
    });

    if (!resource) {
        const err = new Error("The resource you are looking for does not exist");
        err.status = 404;
        return next(err);
    };

    res.json(resource)
});




// ==========>>> Delete a Resource <<<<++++++++
router.delete('/:resourceId', authenticateProjectManager, async (req, res, next) => {
    const { resourceId } = req.params;

    const resource = await Resource.findOne({
        where: {
            resourceId: resourceId
        },
    });

    if (!resource) {
        const err = new Error("The resource you are looking for does not exist");
        err.status = 404;
        return next(err);
    };

    await resource.destroy();

    res.json({ "message": "Resource successfully deleted"})

})


module.exports = router;
