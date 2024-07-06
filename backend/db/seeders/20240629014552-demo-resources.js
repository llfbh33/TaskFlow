'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Resource } = require('../models');
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
  {
    userId: 1,
    name: 'Docs on helmet - for securing Express apps by setting HTTP response headers',
    url: 'https://www.npmjs.com/package/helmet',
    keyWords: 'docs, helmet, express, headers'
  },
  {
    userId: 1,
    name: 'About Github READMEs and repository settings',
    url: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
    keyWords: 'github, readme, repository'
  },
  {
    userId: 1,
    name: 'Documentation on cross-site scripting on MDN',
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting',
    keyWords: 'docs, security, learning'
  },
  //
  {
    userId: 1,
    name: 'Difference Between RESTful APIs and Streaming APIs',
    url: 'https://dsstream.com/streaming-api-vs-rest-api-which-one-is-better-for-your-application/#:~:text=Streaming%20APIs%20are%20totally%20the,up%2Dto%2Ddate%20information',
    keyWords: 'APIs, learning, REST'
  },
  {
    userId: 1,
    name: 'Docs on creating express error handling middleware',
    url: 'https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling',
    keyWords: 'express, error-handling, middleware, docs'
  },
  {
    userId: 1,
    name: 'Sequelize Documentation',
    url: 'https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/',
    keyWords: 'docs, sequelize, learning'
  },
  {
    userId: 1,
    name: 'Stylesheet of many font awesome icons',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.1/css/all.css',
    keyWords: 'helpful, icons, styling'
  },
  {
    userId: 1,
    name: 'Flask Login documentation',
    url: 'https://flask-login.readthedocs.io/en/latest/',
    keyWords: 'docs, flask, login'
  },
  {
    userId: 1,
    name: 'Thunk Logic, Documentation',
    url: 'https://redux.js.org/usage/writing-logic-thunks',
    keyWords: 'helpful, learning, thunks, redux'
  },
  {
    userId: 1,
    name: 'SQLAlchemy Documentaion',
    url: 'https://docs.sqlalchemy.org/en/13/core/metadata.html#sqlalchemy.schema.Column',
    keyWords: 'docs, flask, python, sqlalchemy'
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Resources';
    options.validate = true;

    await Resource.bulkCreate(seedResources, options);
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Resources';
    return queryInterface.bulkDelete(options, seedResources, {});
  }
};
