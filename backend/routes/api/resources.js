const { Op } = require('sequelize');

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
    const { keyWord } = req.params;
    const keywordArray = keyWord.split(',');

    try {
    // create an array of objects to hold each keyword to sort by
        const conditions = keywordArray.map(keyword => ({ [Op.like]: `%${keyword.trim()}%` }));

        const listOfResources = await Resource.findAll({
            where: {
                keyWords: {
                    [Op.and]: conditions
                }
            },
            attributes: ["id", "userId", "name", "url", "keyWords"],
            include: [{
                model: User,
                attributes: ["name", "username"]
            }]
        });

        if (listOfResources.length === 0) {
            const err = new Error("There are not yet any resources associated with the given keyword/words");
            err.status = 404;
            return next(err);
        };

        res.json({ Resources: listOfResources });
    } catch (error) {
        next(error);
    }
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


// ======>>> Add a Resource <<< =======
router.post('/:new', async (req, res, next) => {
    const {userId, name, url, keyWords} = req.body;

    const newResource = await Resource.create({
        userId,
        name,
        url,
        keyWords
    });

    res.json(newResource);
});


// ======>>> Edit a Resource <<< =======
router.put('/:resourceId', async (req, res, next) => {
    const { resourceId } = req.params;
    const foundResource = await Resource.findByPk(resourceId);
    const {name, url, keyWords} = req.body;

    foundResource.set({
        name: name || foundResource.name,
        url: url || foundResource.url,
        keyWords: keyWords || foundResource.keyWords,
    });

    await foundResource.validate();
    await foundResource.save();

    res.json(foundResource);
});


// ==========>>> Delete a Resource <<<<++++++++
router.delete('/:resourceId', authenticateProjectManager, async (req, res, next) => {
    const { resourceId } = req.params;

    const resource = await Resource.findOne({
        where: {
            id: resourceId
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
