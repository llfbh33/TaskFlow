'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Journal } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const seedJournals = [
  {
    userId: 1,
    date: '2024-07-03',
    projects: 'portfolio, linkedIn, resume, todo project',
    today: "Today I was working on improving the phrasing in my portfolio as well as adding tool tips to the various icon links.  I also updated linkedin, adding FareShare as another feature project, increasing my skills, and setting bullet points for my previous jobs.  I finished little polishes on my resume.  I am adding a journal table to my todo project, this will be helpful in reminding me what I worked on on each project in the last week or month when going to an interview.",
    challenges: "I was having difficulty adding a tool tip to a <a> tag, I was able to add it fine however then it would mess up the structure of the HTML due to the css structure for my portfolio template. I was also having issues talking myself up in my bio's",
    overcome: "I want to revisit my portfolio, Figure out the css and how it is structured, I feel this will help me better understand how to keep my css files more organized in the future and be able to read other's css files better as well.  I also feel that keeping a journal will help me feel more connected to my work and better able to talk about my challenges and accomplishments.",
    accomplish: "I was able to add tool tips to my linkedin and github icons, as well as figure out how to display the fa icons, with certain class names they would not display.  I have a decent structural idea for my todo website and am excited to continue building it!",
    goals: "I want to get the todo website up and usable for me by monday.  I want to complete all my review items tomrrow by 2.  I want to start on some documentation for this project.  I am really excited to get this thing rolling"
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = "Journals";
    options.validate = true;

    await Journal.bulkCreate(seedJournals, options);
  },

  async down (queryInterface, Sequelize) {

    options.tableName = "Journals";
    return queryInterface.bulkDelete(options, seedJournals, {})
  }
};
