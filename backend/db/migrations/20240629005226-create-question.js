'use strict';
/** @type {import('sequelize-cli').Migration} */

// define the schema name for the Postgres production database in the options object - include in both up and down functions
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define the shema
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE'
      },
      question: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING(600),
      },
      keyWords: {
        type: Sequelize.STRING(200),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Questions';
    await queryInterface.dropTable(options);
  }
};
