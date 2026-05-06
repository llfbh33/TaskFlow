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
    userId: 2,
    task: 'Review saved coding resources and choose one topic to study',
    date: '2026-05-01'
  },
  {
    userId: 2,
    task: 'Complete two beginner algorithm practice problems',
    date: '2026-05-01'
  },
  {
    userId: 2,
    task: 'Update task list for the week',
    date: '2026-05-01'
  },
  {
    userId: 2,
    task: 'Read one article about JavaScript debugging',
    date: '2026-05-02'
  },
  {
    userId: 2,
    task: 'Practice using console logs to trace a small bug',
    date: '2026-05-02'
  },
  {
    userId: 2,
    task: 'Organize saved resources by keyword',
    date: '2026-05-02'
  },
  {
    userId: 2,
    task: 'Spend 30 minutes reviewing React component structure',
    date: '2026-05-03'
  },
  {
    userId: 2,
    task: 'Write notes on props versus state',
    date: '2026-05-03'
  },
  {
    userId: 2,
    task: 'Complete one Git branching exercise',
    date: '2026-05-03'
  },
  {
    userId: 2,
    task: 'Practice one array problem',
    date: '2026-05-04'
  },
  {
    userId: 2,
    task: 'Watch a tutorial on async and await',
    date: '2026-05-04'
  },
  {
    userId: 2,
    task: 'Refactor an older component for readability',
    date: '2026-05-04'
  },
  {
    userId: 2,
    task: 'Read documentation on REST APIs',
    date: '2026-05-05'
  },
  {
    userId: 2,
    task: 'Practice using fetch requests in JavaScript',
    date: '2026-05-05'
  },
  {
    userId: 2,
    task: 'Update portfolio project notes',
    date: '2026-05-05'
  },
  {
    userId: 2,
    task: 'Solve two string manipulation problems',
    date: '2026-05-06'
  },
  {
    userId: 2,
    task: 'Review CSS flexbox layouts',
    date: '2026-05-06'
  },
  {
    userId: 2,
    task: 'Spend 20 minutes cleaning old repositories',
    date: '2026-05-06'
  },

  // WEEK 2
  {
    userId: 2,
    task: 'Review JavaScript closures and scope',
    date: '2026-05-07'
  },
  {
    userId: 2,
    task: 'Complete one linked list practice problem',
    date: '2026-05-07'
  },
  {
    userId: 2,
    task: 'Read an article about clean code practices',
    date: '2026-05-07'
  },
  {
    userId: 2,
    task: 'Watch a tutorial on Redux state management',
    date: '2026-05-08'
  },
  {
    userId: 2,
    task: 'Update README for a side project',
    date: '2026-05-08'
  },
  {
    userId: 2,
    task: 'Review browser developer tools',
    date: '2026-05-08'
  },
  {
    userId: 2,
    task: 'Practice one recursion problem',
    date: '2026-05-09'
  },
  {
    userId: 2,
    task: 'Study event bubbling and propagation',
    date: '2026-05-09'
  },
  {
    userId: 2,
    task: 'Push latest practice code to GitHub',
    date: '2026-05-09'
  },
  {
    userId: 2,
    task: 'Spend one hour working on portfolio styling',
    date: '2026-05-10'
  },
  {
    userId: 2,
    task: 'Read documentation on Sequelize validations',
    date: '2026-05-10'
  },
  {
    userId: 2,
    task: 'Practice using map and filter methods',
    date: '2026-05-10'
  },

  // WEEK 3
  {
    userId: 2,
    task: 'Watch a beginner system design video',
    date: '2026-05-11'
  },
  {
    userId: 2,
    task: 'Complete one binary search problem',
    date: '2026-05-11'
  },
  {
    userId: 2,
    task: 'Review API error handling patterns',
    date: '2026-05-11'
  },
  {
    userId: 2,
    task: 'Read about accessibility best practices',
    date: '2026-05-12'
  },
  {
    userId: 2,
    task: 'Practice using React useEffect hooks',
    date: '2026-05-12'
  },
  {
    userId: 2,
    task: 'Organize project screenshots and assets',
    date: '2026-05-12'
  },
  {
    userId: 2,
    task: 'Solve two easy LeetCode problems',
    date: '2026-05-13'
  },
  {
    userId: 2,
    task: 'Review SQL joins and relationships',
    date: '2026-05-13'
  },
  {
    userId: 2,
    task: 'Read article on writing better commit messages',
    date: '2026-05-13'
  },
  {
    userId: 2,
    task: 'Practice debugging a broken component',
    date: '2026-05-14'
  },
  {
    userId: 2,
    task: 'Watch tutorial on authentication flows',
    date: '2026-05-14'
  },
  {
    userId: 2,
    task: 'Update portfolio about section',
    date: '2026-05-14'
  },

  // WEEK 4
  {
    userId: 2,
    task: 'Review JavaScript promises and async flows',
    date: '2026-05-15'
  },
  {
    userId: 2,
    task: 'Practice one stack or queue problem',
    date: '2026-05-15'
  },
  {
    userId: 2,
    task: 'Read about responsive web design',
    date: '2026-05-15'
  },
  {
    userId: 2,
    task: 'Spend 30 minutes improving CSS animations',
    date: '2026-05-16'
  },
  {
    userId: 2,
    task: 'Review Git merge conflict workflow',
    date: '2026-05-16'
  },
  {
    userId: 2,
    task: 'Write notes on debugging strategies',
    date: '2026-05-16'
  },
  {
    userId: 2,
    task: 'Complete one tree traversal problem',
    date: '2026-05-17'
  },
  {
    userId: 2,
    task: 'Watch tutorial on Express middleware',
    date: '2026-05-17'
  },
  {
    userId: 2,
    task: 'Refactor old utility functions',
    date: '2026-05-17'
  },
  {
    userId: 2,
    task: 'Read article about interview communication skills',
    date: '2026-05-18'
  },
  {
    userId: 2,
    task: 'Practice using destructuring and spread operators',
    date: '2026-05-18'
  },
  {
    userId: 2,
    task: 'Clean unused branches from GitHub repositories',
    date: '2026-05-18'
  },

  // FINAL DAYS
  {
    userId: 2,
    task: 'Review previous algorithm notes',
    date: '2026-05-19'
  },
  {
    userId: 2,
    task: 'Practice one dynamic programming problem',
    date: '2026-05-19'
  },
  {
    userId: 2,
    task: 'Watch a frontend performance optimization video',
    date: '2026-05-19'
  },
  {
    userId: 2,
    task: 'Update LinkedIn project descriptions',
    date: '2026-05-20'
  },
  {
    userId: 2,
    task: 'Practice React conditional rendering patterns',
    date: '2026-05-20'
  },
  {
    userId: 2,
    task: 'Read about API security basics',
    date: '2026-05-20'
  },
  {
    userId: 2,
    task: 'Solve two sorting algorithm problems',
    date: '2026-05-21'
  },
  {
    userId: 2,
    task: 'Review semantic HTML structure',
    date: '2026-05-21'
  },
  {
    userId: 2,
    task: 'Push updated practice solutions to GitHub',
    date: '2026-05-21'
  },
  {
    userId: 2,
    task: 'Read one article on developer productivity',
    date: '2026-05-22'
  },
  {
    userId: 2,
    task: 'Practice array and object destructuring',
    date: '2026-05-22'
  },
  {
    userId: 2,
    task: 'Spend 20 minutes organizing bookmarks and resources',
    date: '2026-05-22'
  }
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
