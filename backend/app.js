
const express = require('express');  // import express
require('express-async-errors'); // import ability to use express async errors
const morgan = require('morgan');  // import morgan
const cors = require('cors');  // import cors
const csurf = require('csurf');  // import csurf
const helmet = require('helmet');  //import helmet
const cookieParser = require('cookie-parser');  // import cookie-parser

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
            httpOnly: ture
        }
    })
)
/* The csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response. It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF (Cross-Site Request Forgery) protection for your application. The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET. This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site. */

