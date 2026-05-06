'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Journal } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const seedJournals = [
  {
    userId: 2,
    date: '2026-04-10',
    projects: 'study tracker, portfolio',
    today: "Today I worked on reorganizing my portfolio projects and reviewing older JavaScript notes. I also spent some time planning features for a study tracker application and researching different dashboard layouts.",
    challenges: "I was struggling with deciding how to structure the navigation for the study tracker project and kept overthinking the layout.",
    overcome: "I stepped back and sketched out a simpler layout structure first before worrying about styling details.",
    accomplish: "I finished reorganizing my project list and created a rough plan for the dashboard sections.",
    goals: "I want to start building reusable layout components tomorrow and continue reviewing JavaScript fundamentals."
  },
  {
    userId: 2,
    date: '2026-04-12',
    projects: 'leetcode, portfolio',
    today: "Today I practiced a few array and string algorithm problems and updated some descriptions on my portfolio projects to sound more clear and professional.",
    challenges: "I had trouble explaining technical work in a concise way without making the descriptions too long.",
    overcome: "I focused more on impact and outcomes instead of listing every small implementation detail.",
    accomplish: "I completed several practice problems and improved the readability of my project summaries.",
    goals: "I want to continue practicing algorithms and clean up some older repositories."
  },
  {
    userId: 2,
    date: '2026-04-17',
    projects: 'task manager app',
    today: "I worked on adding task filtering and basic state management to the task manager project. I also spent time cleaning up component structure.",
    challenges: "The filtering logic became confusing once multiple conditions were added together.",
    overcome: "I separated the logic into smaller helper functions which made the code easier to follow.",
    accomplish: "The filters are now working correctly and the codebase feels more organized.",
    goals: "Tomorrow I want to improve styling consistency across the app."
  },
  {
    userId: 2,
    date: '2026-04-20',
    projects: 'resume, linkedin',
    today: "Today I reviewed my resume and LinkedIn profile to improve wording and make the descriptions more accomplishment focused.",
    challenges: "I kept rewriting the same sections trying to make them sound better.",
    overcome: "I focused on being direct and clear instead of trying to sound overly formal.",
    accomplish: "I updated several resume bullet points and improved my LinkedIn skills section.",
    goals: "I want to apply to a few jobs this week and continue polishing my portfolio."
  },
  {
    userId: 2,
    date: '2026-04-26',
    projects: 'react practice',
    today: "I spent time practicing React hooks and reviewing how useEffect behaves with dependency arrays.",
    challenges: "I was confused about why a component was rerendering more often than expected.",
    overcome: "I used console logs and React DevTools to trace state updates more carefully.",
    accomplish: "I fixed the rerender issue and better understand dependency management now.",
    goals: "I want to continue reviewing React performance concepts."
  },
  {
    userId: 2,
    date: '2026-05-02',
    projects: 'portfolio redesign',
    today: "Today I experimented with different layouts and color gradients for my portfolio landing page.",
    challenges: "I struggled getting the spacing to feel balanced across different screen sizes.",
    overcome: "I simplified the layout and focused on consistency rather than adding more sections.",
    accomplish: "The landing page feels cleaner and easier to navigate now.",
    goals: "I want to improve mobile responsiveness next."
  },
  {
    userId: 2,
    date: '2026-05-06',
    projects: 'algorithms, interview prep',
    today: "I worked on practicing binary search and reviewing common interview questions related to JavaScript scope and closures.",
    challenges: "I understood the concepts but struggled explaining them clearly out loud.",
    overcome: "I practiced walking through examples step by step instead of trying to memorize explanations.",
    accomplish: "I feel more comfortable discussing closures and algorithm patterns now.",
    goals: "I want to continue practicing communication during technical explanations."
  },
  {
    userId: 2,
    date: '2026-05-15',
    projects: 'todo project',
    today: "Today I worked on improving the modal layout and task creation flow in the todo project.",
    challenges: "The modal styling became difficult to manage because too many styles were overlapping.",
    overcome: "I reorganized the CSS structure and removed duplicate styling rules.",
    accomplish: "The modal behavior feels smoother and more consistent now.",
    goals: "I want to add better validation handling next."
  },
  {
    userId: 2,
    date: '2026-05-21',
    projects: 'github cleanup',
    today: "I spent time reviewing old repositories and cleaning up unused branches and unfinished projects.",
    challenges: "It was difficult deciding what projects were still worth keeping public.",
    overcome: "I focused on keeping projects that best represented growth and technical skills.",
    accomplish: "My GitHub profile feels much cleaner and easier to navigate.",
    goals: "I want to improve README files for my strongest projects."
  },
  {
    userId: 2,
    date: '2026-06-02',
    projects: 'system design study',
    today: "Today I watched a few beginner system design videos and took notes on APIs, databases, and scaling basics.",
    challenges: "Some of the terminology felt overwhelming at first.",
    overcome: "I focused on understanding the high level concepts instead of every implementation detail.",
    accomplish: "I have a better understanding of how frontend and backend systems communicate together.",
    goals: "I want to continue building confidence with backend concepts."
  },
  {
    userId: 2,
    date: '2026-06-10',
    projects: 'portfolio, applications',
    today: "I updated project screenshots for my portfolio and submitted a few job applications.",
    challenges: "I spent too much time second guessing small details before applying.",
    overcome: "I reminded myself that progress is more important than perfection.",
    accomplish: "I finished updating screenshots and applied to several positions.",
    goals: "I want to continue building consistency with applications and project work."
  },
  {
    userId: 2,
    date: '2026-06-16',
    projects: 'portfolio, linkedIn, resume, todo project',
    today: "Today I was working on improving the phrasing in my portfolio as well as adding tool tips to the various icon links. I also updated linkedin, adding FareShare as another feature project, increasing my skills, and setting bullet points for my previous jobs. I finished little polishes on my resume. I am adding a journal table to my todo project, this will be helpful in reminding me what I worked on on each project in the last week or month when going to an interview.",
    challenges: "I was having difficulty adding a tool tip to a <a> tag, I was able to add it fine however then it would mess up the structure of the HTML due to the css structure for my portfolio template. I was also having issues talking myself up in my bio's",
    overcome: "I want to revisit my portfolio, Figure out the css and how it is structured, I feel this will help me better understand how to keep my css files more organized in the future and be able to read other's css files better as well. I also feel that keeping a journal will help me feel more connected to my work and better able to talk about my challenges and accomplishments.",
    accomplish: "I was able to add tool tips to my linkedin and github icons, as well as figure out how to display the fa icons, with certain class names they would not display. I have a decent structural idea for my todo website and am excited to continue building it!",
    goals: "I want to get the todo website up and usable for me by monday. I want to complete all my review items tomrrow by 2. I want to start on some documentation for this project. I am really excited to get this thing rolling"
  }
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
