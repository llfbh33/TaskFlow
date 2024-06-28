'use strict';
/** @type {import('sequelize-cli').Migration} */

// define the schema name for the Postgres production database in the options object - include in both up and down functions
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define the shema
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['project-manager', 'collaborator', 'user'],
        allowNull: false,
      },
      isEmployed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.dropTable(options);
  }
};
