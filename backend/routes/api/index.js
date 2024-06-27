const router = require('express').Router();


// test route
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

/*
Input current csrf token into value of cookie location

fetch('/api/test', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));

d3wIOS44-IX1c8BaMdlq9_DxY2hyJU-dazJg
*/


module.exports = router;
