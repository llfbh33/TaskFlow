
const express = require('express');  // import express
require('express-async-errors'); // import ability to use express async errors
const morgan = require('morgan');  // import morgan
const cors = require('cors');  // import cors
const csurf = require('csurf');  // import csurf
const helmet = require('helmet');  //import helmet
const cookieParser = require('cookie-parser');  // import cookie-parser
const { ValidationError } = require('sequelize');  // import sequelize validation errors

const { environment } = require('./config');
const isProduction = environment === 'production'; // boolean result - if the environment in the config files is production or not


const app = express();  // initialize the express application to app

app.use(morgan('dev'));  // connect morgan middleware for loggin information about requests and responses, initialize with database?
app.use(cookieParser());  // add cookieParser middleware to app for parsing cookies
app.use(express.json());    // add express.json middleware for parsing JSON bodies of requests with Content-Type of 'application/json'


// Security middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet for better overall security https://www.npmjs.com/package/helmet
// crossOriginResourcePolicy combined with helmet middleware and a cross-origin policy allows images with URL's to render in deployment
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
);

// Add csurf middleware and configure to use cookies - set the token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            // http only, can not be read by JavaScript, added to any server response
            httpOnly: true
        }
    })
)
/* The csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response. It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF (Cross-Site Request Forgery) protection for your application. The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET. This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site. */


// need to run the csrf tokens before ability to access routes.
const routes = require('./routes');  // import routes file
app.use(routes);  // connect all routes to app for use


// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

// Process sequelize errors - catch, format, and send errors back
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
});

// Error Formatter - takes all caught errors and formats them
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
});


module.exports = app;  // export app
