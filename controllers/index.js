var express = require('express');
var router = express.Router();

router.use('/api/hunts', require('./hunt'));
router.use('/api/tasks', require('./task'));
router.use('/api/auth', require('./authenticationController'));
router.use('/api/users', require('./usersController'));

router.get('/', function(req, res) {
  res.render("index.html");
});

module.exports = router;