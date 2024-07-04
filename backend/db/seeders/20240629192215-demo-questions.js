'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Question } = require('../models');
const { Op } = require('sequelize');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seedQuestions = [
  {
    userId: 1,
    question: 'What does API stand for and what is an API used for?',
  },
  {
    userId: 1,
    question: 'How to gauge time and space complexity',
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Questions';
    options.validate = true;

    await Question.bulkCreate(seedQuestions, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Questions';
    return queryInterface.bulkDelete(options, seedQuestions, {});
  }
};
