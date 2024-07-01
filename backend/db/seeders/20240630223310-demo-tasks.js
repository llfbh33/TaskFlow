'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Task } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seedTasks = [
  {
    userId: 1,
    task: 'One hour practicing algorithms and analytics',
    date: '2024-07-01'
  },
  {
    userId: 1,
    task: 'One hour studying algorithms and analytics',
    date: '2024-07-01'
  },
  {
    userId: 1,
    task: 'Greenlit meeting at 11am',
    date: '2024-07-01'
  },
  {
    userId: 1,
    task: 'Sift through console and remove all unecessary repositories, save all necessary ones to gitbub',
    date: '2024-07-01'
  },
  {
    userId: 1,
    task: 'spend 15 minutes, find  something to push to github - Keep your garden green',
    date: '2024-07-01'
  },
]


module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Tasks';
    options.validate = true;

    await Task.bulkCreate(seedTasks, options);
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Tasks';
    return queryInterface.bulkDelete(options, seedTasks, {})
  }
};
