// Setting the value of configwithin the export to connect to the configuration of environment variables in the index.js file
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile, // sets storage within development to the .env dbFile through the config index file
    dialect: 'sqlite', // sets sqlite as the relational database management system
    seederStorage: 'sequelize', // sequelize is an Object Relational Mapping library for Node.js - used to avoid raw sql querying
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL', // database is found from the database URL produced from render
    dialect: 'postgres', // sets postgres as the object-relational database management system
    seederStorage: 'sequelize', // sets as Object relational mapping library - used to avoid raw sql querying
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA // sets the schema to that of the schema in the .env file while protecting the information
    }
  }
}
