## Setting up an express backend

#### Set up dependencies
- within the backend folder
    - initialize servers package.json - npm init -y
    - then npm install following dependencies:
        - cookie-parser - parsing cookies from requests
        - cors - CORS
        - csurf - CSRF protection
        - dotenv - load environment variables into Node.js from a .env file
        - express - Express
        - express-async-errors - handling async route handlers
        - helmet - security middleware
        - jsonwebtoken - JWT
        - morgan - logging information about server requests/responses
        - per-env - use environment variables for starting app differently
        - sequelize@6 - Sequelize
        - sequelize-cli@6 - use Sequelize in the command line
        - pg - use Postgres as the production environment database
    - then npm install -D the following packages as dev-dependencies:
        - sqlite3 - SQLite3
        - dotenv-cli - use dotenv in the command line
        - nodemon - hot reload server backend files

#### Configuration
    - set up a config folder and index.js file
    - export a module object
    - keys are the for each environment variable
    - values are the values in the .env file, pulled with process.env to keep the values protected

#### Sequelize Setup
    - create a .sequelizerc file in the backend
    - export a module object
    - Set the path of the database.js file which will be created to be within the config file.
    - resolve models, seeders, and migrations on creation of the database.js file, create these files within a db folder.

    - initialize Sequelize to the db folder, create files for the db - run npx sequelize init

#### Adjust database.js
    - adjust the object values within the newly created database.js files to work with your intended project

#### Set up Schema Generation
    - Create a file called psql-setup-script.js (postgres-sql)
    - import sequelize
    - Create async function to check sequelize schemas for existance of .env schema, if it doesn't exist, create one.

    - run npx dotenv sequelize db:migrate to migrate the database to make sure everything is set up correctly

- sequelize db: commands need to be prefixed with dotenv to load database configuration environment variables from the .env file.

### Express setup

#### app.js
    - create a file called app.js in backend folder, express will be initialized here.


- using bcryptjs to hash passwords - npm install bcryptjs

- docs on model scoping - https://sequelize.org/docs/v6/other-topics/scopes/
