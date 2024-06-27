const express = require('express') // import express
const router = express.Router(); // initialize express router


// test router
router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
  });

module.exports = router;
