# App Academy React Vite Template

This repo contains a basic Vite React template configured for use in App Academy
projects.

## How to clone

To clone this repo as `<new-project-name>`, run

```shell
npx tiged appacademy/aa-react18-redux-vite-template#main <new-project-name>
```

in the directory where you want the new project to appear.

## How to install and run

Once the repo is cloned, run `cd <new-project-name> && npm install` to install
dependencies. You will probably also want to run `git init`.

To run the app, type `npm run dev` in the root directory.

## Reminders

Don't forget to update this README, change the `title` in __index.html__, and
change the `"name"` in __package.json__ when making a new project!


Added date formatter:
    - npm i date-fns
    - docs: https://www.npmjs.com/package/date-fns
    - import { format } from 'date-fns';



backend - npm start
frontend - npm run dev

# TaskFlow

## An application with the intention of providing a to-do list for the softwear engineer job seeker to keep on track and focused on improving their skills

### Application features

#### Without Login
    - free access to any who want in, a search of stored reasources towards the goal of landing a career as a softwear engineer
        - examples of resources
            - walkthroughs on how to set up a great linkedIn profile as well as great linkedIn profile examples
            - walkthroughs on how to set up a great Github readme as well as great linkedIn readme examples
            - walkthroughs on how to set up a great portfolio as well as great portfolio examples
            - Examples of common interview questions
            - video tutorials
            - different sites to hone your skills

    - Ability to look up by filtered key words(subjects) or by name
    - Highlights of the newest resources added updated on the front page regularly

#### When Logged in
    - a features tab to walk the user through the functionalities of the site.
    - Free access to all of the same functionalities as a non logged in user
    - A todo page set for the current date as well as a calender holding future and previous information
    - A preset adjustable layout for a person who is avidly job seeking
        - a checkable todo list including - averaging to 5  - 6 hours a day
            - 1 hour of leetcode or other type work a day
            - 1 hour studying algorithms a day
            - 1-2 hours working on projects a day
            - 1 hour activly looking for jobs to apply for and reaserching company
            - checking on LinkedIn for any connections and email - cleaning up spam
            - 1 hour practicing interviewing even if doing so in the mirror
            - fill out section with multiple questions, what you worked on that day, any difficulties, how did you overcome them, what are the resources you used?
    - Ability to add specific things to your day or remove them
    - Ability to search through your past EOD answers, filter by project, involving interviews, or date
    - All resources added will be added to the main hub of resources for all to be able to use
    - if an added task is not completed or removed it will role over to the next day and be highlighted in red


- should I include a calender API
- should I include an API search function?


- come up with a structure for the tables anda framework


### for parsing urls and getting basic information from it to display thumbnails and descriptions
- Using the library 'axios' to fetch the HTML of URL's
- Using 'cherrio' to parse the HTML and extract Open Graph Data
    - npm install axios cherrio


- when logging in, the users name does not produce - it does if you refresh

-[x] I want to show the current date
-[x] I want to show a date one behind and one infront that are clickable
-[x] I want the tasks for those three days to pop up when the date is highlighted
-[ ] I want to have a context for the date so that if you go to another tab then come back you are on the same date you were looking at previously.  This date can clear and be reset to the current date upon logout
-[x] I want to provide the ability to skip right to the current date again incase the user wants to.
-[x] I want to add checkboxes to the tasks - when then are completed they can be checked and will be striked out - it will automatically  updated them in the backend
-[x] I want to set tasks so if they need to be completed today they glow yellow, if they are past due, they glow red
-[ ] I want the calender tab to be red if there are past due tasks, and yellow if there are only currently due tasks, grey if all caught up
-[ ] I want to add a delete modal to the reflections so I do not accidently delete a record
-[ ] I want to set up answered questions as drop downs rather than buttons to see the answer
-[ ] I want to walk through and make a list of what needs to be done with what I have
-[ ] I need to walk through a list of what I need to be able to make a wireframs, a readme, a features list, and users storeies
-[ ] I need to created some or all ofthe previously listed 4 so that I can post this project publicly and use it
-[ ] Fix design
-[ ] as a person logged out you should not be able to add a resource
-[ ] stats page - covers the calendar days psat, no tasks left is 0, 1 task left is yellow, 2 or more incomplete tasks are red
-consider adding a submit button so that the complete tasks dissapear, leaving only the to do tasks on the list - maybe not important,  but an idea
