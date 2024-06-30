'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Resource, User } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seedResources = [
  {
    userId: 1,
    name: 'NeetCode -  learn data structures and algorithms',
    url: 'https://neetcode.io/practice',
    keyWords: 'data-structures, algorithms, practice'
  },
  {
    userId: 1,
    name: 'Lecture Slideshow on setting up a well rounded Software Engineering resume',
    url: 'https://docs.google.com/presentation/d/1XEcwBku7a-dYjBISDEZAM5WAAgG20hQvBV3paKaB3Qw/edit#slide=id.g275600e68a9_0_8',
    keyWords: 'resume, applications, job-hunting'
  },
  {
    userId: 1,
    name: 'TheMuse - Hundreds of verbs for a resume and other resources',
    url: 'https://www.themuse.com/advice/185-powerful-verbs-that-will-make-your-resume-awesome',
    keyWords: 'resume, applications, job-hunting'
  },
  {
    userId: 1,
    name: 'O-Auth google cloud console setup walkthrough',
    url: 'https://github.com/bkieselEducational/OAuth-Google-Cloud-Console-Setup',
    keyWords: 'O-Auth, google, browser-connections'
  },
  {
    userId: 1,
    name: 'Google Analytics Tutorial for React projects',
    url: 'https://javascript.plainenglish.io/how-to-setup-and-add-google-analytics-to-your-react-app-fd361f47ac7b',
    keyWords: 'google, analytics, tutorial, react'
  },
  {
    userId: 1,
    name: 'Google Analytics Tutorial',
    url: 'https://developers.google.com/analytics/devguides/collection/ga4',
    keyWords: 'google, analytics, tutorial'
  },
  {
    userId: 1,
    name: 'Google Analytics React documentation',
    url: 'https://github.com/react-ga/react-ga',
    keyWords: 'google, analytics, documentation. react'
  },
  {
    userId: 1,
    name: 'Google Analytics documentation',
    url: 'https://firebase.google.com/docs/analytics/get-started?platform=web',
    keyWords: 'google, analytics, documentation'
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Resources';
    options.validate = true;

    await Resource.bulkCreate(seedResources, options);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Resources';
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]}
    }, {});
  }
};
