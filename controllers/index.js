var express = require('express');
var router = express.Router();

router.use('/api/hunts', require('./hunt'));

router.get('/', function(req, res) {
  res.render("index.html");
});

module.exports = router;