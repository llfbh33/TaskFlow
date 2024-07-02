const express = require('express') // import express
const router = express.Router(); // initialize express router

const apiRouter = require('./api');  // import api routes


// test route
// router.get('/hello/world', function(req, res) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World!');
//   });

// Add a XSRF-TOKEN cookie - avalible only in development - produces a new CSRF token
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

router.use('/api', apiRouter);

module.exports = router;
