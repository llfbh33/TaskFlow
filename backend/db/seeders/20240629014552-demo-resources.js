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
    keyWords: 'Algorithms,Coding Languages'
  },
  {
    userId: 1,
    name: 'Lecture Slideshow on setting up a well rounded Software Engineering resume',
    url: 'https://docs.google.com/presentation/d/1XEcwBku7a-dYjBISDEZAM5WAAgG20hQvBV3paKaB3Qw/edit#slide=id.g275600e68a9_0_8',
    keyWords: 'Career Strategy,Soft Skills'
  },
  {
    userId: 1,
    name: 'TheMuse - Hundreds of verbs for a resume and other resources',
    url: 'https://www.themuse.com/advice/185-powerful-verbs-that-will-make-your-resume-awesome',
    keyWords: 'Career Strategy,Soft Skills'
  },
  {
    userId: 1,
    name: 'O-Auth google cloud console setup walkthrough',
    url: 'https://github.com/bkieselEducational/OAuth-Google-Cloud-Console-Setup',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 3,
    name: 'Google Analytics Tutorial for React projects',
    url: 'https://javascript.plainenglish.io/how-to-setup-and-add-google-analytics-to-your-react-app-fd361f47ac7b',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 3,
    name: 'Google Analytics Tutorial',
    url: 'https://developers.google.com/analytics/devguides/collection/ga4',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 4,
    name: 'Google Analytics React documentation',
    url: 'https://github.com/react-ga/react-ga',
    keyWords: 'Frameworks'
  },
  {
    userId: 4,
    name: 'Google Analytics documentation',
    url: 'https://firebase.google.com/docs/analytics/get-started?platform=web',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 1,
    name: 'Docs on helmet - for securing Express apps by setting HTTP response headers',
    url: 'https://www.npmjs.com/package/helmet',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 3,
    name: 'About Github READMEs and repository settings',
    url: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
    keyWords: 'Version Control,Career Strategy'
  },
  {
    userId: 1,
    name: 'Documentation on cross-site scripting on MDN',
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting',
    keyWords: 'System Design,Debugging'
  },
  //
  {
    userId: 2,
    name: 'Difference Between RESTful APIs and Streaming APIs',
    url: 'https://dsstream.com/streaming-api-vs-rest-api-which-one-is-better-for-your-application/#:~:text=Streaming%20APIs%20are%20totally%20the,up%2Dto%2Ddate%20information',
    keyWords: 'System Design'
  },
  {
    userId: 2,
    name: 'Docs on creating express error handling middleware',
    url: 'https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling',
    keyWords: 'Frameworks,Debugging'
  },
  {
    userId: 4,
    name: 'Sequelize Documentation',
    url: 'https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 3,
    name: 'Stylesheet of many font awesome icons',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.1/css/all.css',
    keyWords: 'Frameworks'
  },
  {
    userId: 1,
    name: 'Flask Login documentation',
    url: 'https://flask-login.readthedocs.io/en/latest/',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 4,
    name: 'Thunk Logic, Documentation',
    url: 'https://redux.js.org/usage/writing-logic-thunks',
    keyWords: 'Frameworks,System Design,Debugging'
  },
  {
    userId: 2,
    name: 'SQLAlchemy Documentaion',
    url: 'https://docs.sqlalchemy.org/en/13/core/metadata.html#sqlalchemy.schema.Column',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 2,
    name: 'Amazing Portfolio Examples',
    url: 'https://byagentai.com/blog/software-engineer-portfolio-examples',
    keyWords: 'Career Strategy'
  },
  {
    userId: 3,
    name: 'Resume Advice',
    url: 'https://huntr.co/blog/resume-dos-and-donts',
    keyWords: 'Career Strategy'
  },
  {
    userId: 4,
    name: 'Web UX Design for High Converting Websites',
    url: 'https://frontendmasters.com/courses/ux-design-principles/',
    keyWords: 'System Design'
  },
  {
    userId: 2,
    name: 'JavaScript Info - Modern JavaScript Tutorial',
    url: 'https://javascript.info/',
    keyWords: 'Coding Languages,Debugging'
  },
  {
    userId: 3,
    name: 'React Official Documentation',
    url: 'https://react.dev/',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 4,
    name: 'Git Branching Interactive Tutorial',
    url: 'https://learngitbranching.js.org/',
    keyWords: 'Version Control,Debugging'
  },
  {
    userId: 1,
    name: 'Big O Cheat Sheet',
    url: 'https://www.bigocheatsheet.com/',
    keyWords: 'Algorithms,Coding Languages'
  },
  {
    userId: 2,
    name: 'Frontend Interview Handbook',
    url: 'https://frontendinterviewhandbook.com/',
    keyWords: 'Career Strategy,Algorithms'
  },
  {
    userId: 3,
    name: 'Node.js Official Documentation',
    url: 'https://nodejs.org/en/docs',
    keyWords: 'Frameworks,System Design'
  },
  {
    userId: 4,
    name: 'CSS Tricks Complete Flexbox Guide',
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    keyWords: 'Frameworks,Debugging'
  },
  {
    userId: 1,
    name: 'LeetCode Practice Problems',
    url: 'https://leetcode.com/problemset/',
    keyWords: 'Algorithms,Coding Languages'
  },
  {
    userId: 2,
    name: 'Atlassian Git Tutorials',
    url: 'https://www.atlassian.com/git/tutorials',
    keyWords: 'Version Control,Soft Skills'
  },
  {
    userId: 3,
    name: 'Roadmap.sh Backend Developer Roadmap',
    url: 'https://roadmap.sh/backend',
    keyWords: 'Career Strategy,System Design'
  },
  {
    userId: 4,
    name: 'TypeScript Documentation',
    url: 'https://www.typescriptlang.org/docs/',
    keyWords: 'Coding Languages,Frameworks'
  },
  {
    userId: 1,
    name: 'Docker Getting Started Guide',
    url: 'https://docs.docker.com/get-started/',
    keyWords: 'System Design,Frameworks'
  },
  {
    userId: 2,
    name: 'freeCodeCamp JavaScript Algorithms and Data Structures',
    url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    keyWords: 'Algorithms,Coding Languages'
  },
  {
    userId: 3,
    name: 'How to Debug JavaScript in Chrome DevTools',
    url: 'https://developer.chrome.com/docs/devtools/javascript/',
    keyWords: 'Debugging,Coding Languages'
  },
  {
    userId: 4,
    name: 'Behavioral Interview Questions Guide',
    url: 'https://www.themuse.com/advice/behavioral-interview-questions-answers-examples',
    keyWords: 'Soft Skills,Career Strategy'
  },
  {
    userId: 1,
    name: 'REST API Design Best Practices',
    url: 'https://swagger.io/resources/articles/best-practices-in-api-design/',
    keyWords: 'System Design,Frameworks'
  },
  {
    userId: 2,
    name: 'MDN Guide on Async JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
    keyWords: 'Coding Languages,Debugging'
  },
  {
    userId: 3,
    name: 'GitHub Actions Documentation',
    url: 'https://docs.github.com/en/actions',
    keyWords: 'Version Control,System Design'
  },
  {
    userId: 4,
    name: 'How to Write Better Commit Messages',
    url: 'https://cbea.ms/git-commit/',
    keyWords: 'Version Control,Soft Skills'
  },
  {
    userId: 1,
    name: 'System Design Primer',
    url: 'https://github.com/donnemartin/system-design-primer',
    keyWords: 'System Design,Career Strategy'
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Resources';
    options.validate = true;

    await Resource.bulkCreate(seedResources, options);
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Resources';
    return queryInterface.bulkDelete(options, seedResources, {});
  }
};
