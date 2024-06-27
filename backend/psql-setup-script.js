//pull in sequelize from the db/models folders
const { sequelize } = require('./db/models');

// have sequelize look at all schemas - if that data does not include the schema in the .env file, create that schema
sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
        await sequelize.createSchema(process.env.SCHEMA);
    }
})


// So if there is no schema within sequelize that matches our schema, this code will create one
// which is why, if you are having migration issues and delete the schema, a new one will be produced when migrating
