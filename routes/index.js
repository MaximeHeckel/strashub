var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Strashub' });
});

router.get('*', function(req,res){
  res.render('index', {title: 'Strashub'});
});

module.exports = router;
