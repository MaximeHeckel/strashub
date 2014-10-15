var express = require('express');
var router = express.Router();

/* GET places listing. */
router.get('/', function(req, res) {
  res.send('This will send JSON');
});

module.exports = router;
